cron.schedule(scheduletwo, async () => {
    getIntradayData.getProductList((err, response) => {
      if (!_.isEmpty(response)) {
        const listType = response.PRODUCTS;
        for (const type of listType.slice(16)) {
          getIntradayData.getcurrentIntraday(type, (err, response) => {
            if (_.isEmpty(response)) {
              console.log("error 1");
            } else {
              const currentdata = response;
              const strickPrice = response.AVERAGETRADEDPRICE;
              // Wrap the whole operation in a Promise to handle the asynchronous calls
              const processOptionData = async () => {
                try {
                  const responsedate = await new Promise((resolve, reject) => {
                    getOptionExpiry.getOptionExpiryDates(
                      type,
                      (err, responsedate) => {
                        if (_.isEmpty(responsedate)) {
                          reject("Data not found");
                        } else {
                          resolve(responsedate);
                        }
                      }
                    );
                  });
                  const expirydate = responsedate.EXPIRYDATES[0];
                  const responseOption = await new Promise((resolve, reject) => {
                    getOptionData.getOptionDataToday(
                      type,
                      expirydate,
                      (err, responseOption) => {
                        if (_.isEmpty(responseOption)) {
                          reject("Data not found");
                        } else {
                          resolve(responseOption);
                        }
                      }
                    );
                  });
                  const apiResult = responseOption;
                  const putArr = [];
                  const callArr = [];
                  for (const result of apiResult) {
                    const identi = result.INSTRUMENTIDENTIFIER.split("_");
                    const value = parseInt(identi[4]);
                    if (result.SERVERTIME > 0) {
                      if (identi[3] === "CE") {
                        callArr.push({
                          ...result,
                          value,
                          optionType: identi[3],
                          optionDate: identi[2],
                        });
                      } else if (identi[3] === "PE") {
                        putArr.push({
                          ...result,
                          value,
                          optionType: identi[3],
                          optionDate: identi[2],
                        });
                      }
                    }
                  }
                  const currentOptionStrike = strickPrice;
                  const result = findClosestItem(
                    callArr,
                    currentOptionStrike,
                    "value"
                  );
                  const index = result.index;
                  const strike = result.nearestValue;
                  if (index !== -1) {
                    let putTotal = 0;
                    let callTotal = 0;
                    for (let i = index - 5; i < index + 5; i++) {
                      putTotal += putArr[i].OPENINTERESTCHANGE;
                      callTotal += callArr[i].OPENINTERESTCHANGE;
                    }

                    const datatoday = {
                      ...currentdata,
                      putTotal,
                      callTotal,
                      strike,
                      time: moment(currentTime).format('HH:mm'),
                      timeUpdate: moment(currentTime).unix(),
                    };
                    if (!_.isEmpty(datatoday)) {
                      await new Promise((resolve, reject) => {
                        TdDerivatives.create(datatoday, (err, data) => {
                          if (err) {
                            console.error(err);
                            reject(err);
                          } else {
                            console.log("Data updated successfully.");
                            resolve();
                          }
                        });
                      });
                    }
                  }
                } catch (error) {
                  console.error("Error:", error);
                }
              };
              processOptionData();
            }
          });
        }
      }
    })
  });
  cron.schedule(scheduleone, async () => {
    const listType = ["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY"];
    for (const type of listType) {
      getIntradayData.getcurrentIntraday(type, (err, response) => {
        if (_.isEmpty(response)) {
          console.log("error 1");
        } else {
          const currentdata = response;
          const strickPrice = response.AVERAGETRADEDPRICE;
          // Wrap the whole operation in a Promise to handle the asynchronous calls
          const processOptionData = async () => {
            try {
              const responsedate = await new Promise((resolve, reject) => {
                getOptionExpiry.getOptionExpiryDates(
                  type,
                  (err, responsedate) => {
                    if (_.isEmpty(responsedate)) {
                      reject("Data not found");
                    } else {
                      resolve(responsedate);
                    }
                  }
                );
              });

              const expirydate = responsedate.EXPIRYDATES[0];

              const responseOption = await new Promise((resolve, reject) => {
                getOptionData.getOptionDataToday(
                  type,
                  expirydate,
                  (err, responseOption) => {
                    if (_.isEmpty(responseOption)) {
                      reject("Data not found");
                    } else {
                      resolve(responseOption);
                    }
                  }
                );
              });

              const apiResult = responseOption;
              const putArr = [];
              const callArr = [];
              for (const result of apiResult) {

                const identi = result.INSTRUMENTIDENTIFIER.split("_");
                const value = parseInt(identi[4]);
                if (result.SERVERTIME > 0) {
                  if (identi[3] === "CE") {
                    callArr.push({
                      ...result,
                      value,
                      optionType: identi[3],
                      optionDate: identi[2],
                    });
                  } else if (identi[3] === "PE") {
                    putArr.push({
                      ...result,
                      value,
                      optionType: identi[3],
                      optionDate: identi[2],
                    });
                  }
                }
              }
              const currentOptionStrike = strickPrice;
              const result = findClosestItem(
                callArr,
                currentOptionStrike,
                "value"
              );
              const index = result.index;
              const strike = result.nearestValue;
              if (index !== -1) {
                let putTotal = 0;
                let callTotal = 0;
                for (let i = index - 5; i < index + 5; i++) {
                  putTotal += putArr[i].OPENINTERESTCHANGE;
                  callTotal += callArr[i].OPENINTERESTCHANGE;
                }
                const datatoday = {
                  ...currentdata,
                  putTotal,
                  callTotal,
                  strike,
                  time: moment(currentTime).format('HH:mm'),
                  timeUpdate: moment(currentTime).unix(),
                };
                if (!_.isEmpty(datatoday)) {
                  await new Promise((resolve, reject) => {
                    TdDerivatives.create(datatoday, (err, data) => {
                      if (err) {
                        console.error(err);
                        reject(err);
                      } else {
                        console.log("Data updated successfully.");
                        resolve();
                      }
                    });
                  });
                }
              }
            } catch (error) {
              console.error("Error:", error);
            }
          };
          processOptionData();
        }
      });
    }
  });