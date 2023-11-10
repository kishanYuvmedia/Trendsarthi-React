"use strict";
const request = require("request");
const configt = require("../../server/config.json");
const app = require("../../server/server");
const _ = require("lodash");
const cron = require("node-cron");
const moment = require('moment-timezone');
const currentTime = moment().tz('Asia/Kolkata');
module.exports = function (TdDerivatives) {
  var getIntradayData = app.dataSources.getIntradayData;
  var getOptionExpiry = app.dataSources.getOptionExpiry;
  var getOptionData = app.dataSources.getOptionData;
  var scheduletwo = '*/30 4-11 * * 1-5';
  var scheduleone = '*/5 4-11 * * 1-5';
  TdDerivatives.strikeprice = (type, callback) => {
    const currenturl = `${configt.stock.connector}/GetLastQuote/?accessKey=${configt.stock.key}&exchange=NFO&instrumentIdentifier=${type}-I`;
    request(currenturl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const jsonData = JSON.parse(body);
        if (_.isEmpty(body)) {
          callback(null, {
            StrikePrice: { status: "0", message: "Data not find", value: 0 },
          });
        } else {
          callback(null, {
            StrikePrice: {
              status: "1",
              message: "success",
              value: jsonData.AVERAGETRADEDPRICE,
              Item: jsonData,
            },
          });
        }
      } else {
        callback(null, {
          StrikePrice: { status: "0", message: "Data not find", value: 0 },
        });
      }
    });
  };
  TdDerivatives.productexpirydate = (type, callback) => {
    const currenturl = `${configt.stock.connector}/GetExpiryDates/?accessKey=${configt.stock.key}&exchange=NFO&product=${type}`;
    request(currenturl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(currenturl);
        if (_.isEmpty(body)) {
          callback(null, {
            List: { status: "0", message: "Data not find" },
          });
        } else {
          const expApiResult = JSON.parse(body);
          console.log(currenturl);
          let selectedDate = expApiResult.EXPIRYDATES[0];
          callback(null, {
            list: expApiResult.EXPIRYDATES,
            today: selectedDate,
          });
        }
      } else {
        callback(null, {
          List: { status: "0", message: "Data not find" },
        });
      }
    });
  };
  TdDerivatives.optiondata = (type, expairdate, strickPrice, callback) => {
    const currenturl = `${configt.stock.connector}/GetLastQuoteOptionChain/?accessKey=${configt.stock.key}&exchange=NFO&product=${type}&expiry=${expairdate}`;
    request(currenturl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(currenturl);
        if (_.isEmpty(body)) {
          callback(null, {
            List: { status: "0", message: "Data not find" },
          });
        } else {
          const expApiResult = JSON.parse(body);
          const apiResult = expApiResult;
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
          const result = findClosestItem(callArr, currentOptionStrike, "value");
          const index = result.index;
          const nearestValue = result.nearestValue;
          if (index !== -1) {
            const dataList = [];
            for (let i = index - 5; i < index + 5; i++) {
              dataList.push({
                put: putArr[i],
                call: callArr[i],
              });
            }
            callback(null, {
              list: dataList,
              strike: nearestValue,
            });
          }
        }
      } else {
        callback(null, {
          List: { status: "0", message: "Data not find" },
        });
      }
    });
  };
  // Define a function to find the closest item in an array
  function findClosestItem(arr, value, key) {
    let closest = null;
    let index = -1;
    let nearestValue = null;
    arr.forEach((item, i) => {
      if (item[key] > 0) {
        const diff = Math.abs(value - item.value);
        if (closest === null || diff < closest) {
          closest = diff;
          nearestValue = item.value; // Update the nearest value
          index = i;
        }
      }
    });
    return { closest, index, nearestValue };
  }
  TdDerivatives.getdataIntra = (type, callback) => {
    getIntradayData.getcurrentIntraday(type, (err, response) => {
      if (_.isEmpty(response)) {
        callback(null, {
          result: { status: "0", message: "Data not find", value: 0 },
        });
      } else {
        const currentdata = response;
        const strickPrice = response.AVERAGETRADEDPRICE;

        const getOptionExpiryPromise = new Promise((resolve, reject) => {
          getOptionExpiry.getOptionExpiryDates(type, (err, responsedate) => {
            if (_.isEmpty(responsedate)) {
              reject({ status: "0", message: "Data not found", value: 0 });
            } else {
              const expirydate = responsedate.EXPIRYDATES[0];
              resolve(expirydate);
            }
          });
        });

        getOptionExpiryPromise
          .then((expirydate) => {
            return new Promise((resolve, reject) => {
              getOptionData.getOptionDataToday(
                type,
                expirydate,
                (err, responseOption) => {
                  if (_.isEmpty(responseOption)) {
                    reject({
                      status: "0",
                      message: "Data not found",
                      value: 0,
                    });
                  } else {
                    resolve(responseOption);
                  }
                }
              );
            });
          })
          .then((apiResult) => {
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
              const date = new Date();
              const time = date.getHours() + ":" + date.getMinutes();
              for (let i = index - 5; i < index + 5; i++) {
                putTotal += putArr[i].OPENINTERESTCHANGE;
                callTotal += callArr[i].OPENINTERESTCHANGE;
              }
              const datatoday = {
                ...currentdata,
                putTotal,
                callTotal,
                strike,
                ...{ time: moment(currentTime).format('HH:mm'), timeUpdate: moment(currentTime).unix() },
              };

              if (!_.isEmpty(datatoday)) {
                return new Promise((resolve, reject) => {
                  TdDerivatives.create(datatoday, (err, data) => {
                    if (err) {
                      console.error(err);
                      reject(err);
                    } else {
                      console.log("Data updated successfully.");
                      resolve({
                        status: "1",
                        message: "Data updated successfully",
                        value: 1,
                      });
                    }
                  });
                });
              }
            }
          })
          .then((result) => {
            callback(null, { result });
          })
          .catch((error) => {
            console.error(error);
            callback(null, { result: error });
          });
      }
    });
  };
  TdDerivatives.getProductList = (callback) => {
    getIntradayData.getProductList((err, response) => {
      if (_.isEmpty(response)) {
        callback(null, {
          result: { status: "0", message: "Data not find", list: [] },
        });
      } else {
        callback(null, {
          result: { status: "1", message: "Get Product List", list: response.PRODUCTS },
        });
      }
    }
    )
  }
  TdDerivatives.getOptionDataList = (type, expairdate, callback) => {
    const currenturl = `${configt.stock.connector}/GetLastQuoteOptionChain/?accessKey=${configt.stock.key}&exchange=NFO&product=${type}&expiry=${expairdate}`;
    request(currenturl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(currenturl);
        if (_.isEmpty(body)) {
          callback(null, {
            List: { status: "0", message: "Data not find" },
          });
        } else {
          callback(null, {
            List: { status: "0", message: "data get successfully", data: JSON.parse(body) },
          });
        }
      }
    }
    )
  };
  TdDerivatives.getDerivativesData = (type, time, callback) => {
    const startTime = 9 * 60; // Start time in minutes (9:00 AM)
    const endTime = 15 * 60;  // End time in minutes (3:00 PM)
    const increment = time;     // Increment in minutes
    const timesArray = [];
    for (let minutes = startTime; minutes <= endTime; minutes += increment) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timesArray.push(formattedTime);
    }
    //console.log(timesArray);
    const currentDate = new Date() // Create a Date object for the current date
    const startOfToday = new Date(currentDate) // Clone the current date
    startOfToday.setHours(0, 0, 0, 0) // Set the time to 00:00:00.000
    const endOfToday = new Date(currentDate) // Clone the current date
    endOfToday.setHours(23, 59, 59, 999) // Set the time to 23:59:59.999
    let filter = {
      where: {
        INSTRUMENTIDENTIFIER: `${type}-I`,
        and: [
          { createdAt: { gte: startOfToday } },
          { createdAt: { lte: endOfToday } },
        ],
      },
      order: "id desc"
    };
    TdDerivatives.find(filter)
      .then(JSON.toJSON)
      .then(data => {
        if (_.isEmpty(data)) {
          callback(null, { list: [] });
        } else {
          const filedata = [];
          for (let v = 0; v < timesArray.length; v++) {
            for (const list of data) {
              if (list.time === timesArray[v]) {
                filedata.push(list)
              }
            }
          }
          callback(null, { list: filedata });
        }
      });
  };
  cron.schedule(scheduletwo, async () => {
    const gettime = getTimeCurrent();
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
                      time: gettime,
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
    const gettime = getTimeCurrent();
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
                  time: gettime,
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
  function getTimeCurrent() {
    let date_ob = new Date();
    // Add 5 hours and 30 minutes
    date_ob.setHours(date_ob.getHours() + 5);
    date_ob.setMinutes(date_ob.getMinutes() + 30);

    // Get the updated hours and minutes
    const hours = date_ob.getHours().toString().padStart(2, '0');
    const minutes = date_ob.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
  }
  TdDerivatives.indicatorView = (type, time, callback) => {
    const startTime = 9 * 60; // Start time in minutes (9:00 AM)
    const endTime = 15 * 60;  // End time in minutes (3:00 PM)
    const increment = time;     // Increment in minutes
    const timesArray = [];
    for (let minutes = startTime; minutes <= endTime; minutes += increment) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timesArray.push(formattedTime);
    }
    //console.log(timesArray);
    const currentDate = new Date() // Create a Date object for the current date
    const startOfToday = new Date(currentDate) // Clone the current date
    startOfToday.setHours(0, 0, 0, 0) // Set the time to 00:00:00.000
    const endOfToday = new Date(currentDate) // Clone the current date
    endOfToday.setHours(23, 59, 59, 999) // Set the time to 23:59:59.999
    let filter = {
      where: {
        INSTRUMENTIDENTIFIER: `${type}-I`,
        and: [
          { createdAt: { gte: startOfToday } },
          { createdAt: { lte: endOfToday } },
        ],
      },
      order: "id desc"
    };
    TdDerivatives.find(filter)
      .then(JSON.toJSON)
      .then(data => {
        if (_.isEmpty(data)) {
          callback(null, { list: [] });
        } else {
          const filedata = [];
          const prices=[];
          const closingPrices=[];
          for (let v = 0; v < timesArray.length; v++) {
            for (const list of data) {
              if (list.time === timesArray[v]) {
                filedata.push(list)
                prices.push(list.BUYPRICE)
                closingPrices.push(list.SELLPRICE)
              }
            }
          }
          const int1 = calculateRSI(closingPrices);
          const int2=implementReversalStrategy(closingPrices);
          const int3=implementTradingStrategy(closingPrices)
          const list=[];
          list.push({
            time:"5 MIN",
            Ind1:int1,
            Ind2:int2,
            Int3:int3,
          })
          callback(null, { list: list });
        }
      });
  };
  function calculateRSI(closingPrices) {
    // Calculate the average of the upward price changes
    let avgUpwardChange = 0;
    for (let i = 1; i < closingPrices.length; i++) {
      avgUpwardChange += Math.max(0, closingPrices[i] - closingPrices[i - 1]);
    }
    avgUpwardChange /= closingPrices.length;
    // Calculate the average of the downward price changes
    let avgDownwardChange = 0;
    for (let i = 1; i < closingPrices.length; i++) {
      avgDownwardChange += Math.max(0, closingPrices[i - 1] - closingPrices[i]);
    }
    avgDownwardChange /= closingPrices.length;
    // Calculate the RSI
    const rsi = 100 - (100 / (1 + (avgUpwardChange / avgDownwardChange)));
    return rsi != null ? rsi >= 70 ? "UP" : "DN" : "DN";
  }
  const implementReversalStrategy = (prices,lookbackPeriod = 20, threshold = 0.02) => {
    const currentPrice = prices[prices.length - 1];
    const averagePrice = prices.slice(-lookbackPeriod).reduce((sum, price) => sum + price, 0) / lookbackPeriod;
    if (currentPrice < averagePrice * (1 - threshold)) {
      // setSignal('Potential Reversal: Buy Signal');
      return "DN";
    } else if (currentPrice > averagePrice * (1 + threshold)) {
      // setSignal('Potential Reversal: Sell Signal');
      return "UP";
    } else {
      // setSignal(null);
      return "UP";
    }
  };
  const implementTradingStrategy = (prices,position="neutral", multiplier = 2) => {
    const middleBand = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const standardDeviation = Math.sqrt(
      prices.reduce((sum, price) => sum + Math.pow(price - middleBand, 2), 0) / prices.length
    );

    const upperBand = middleBand + multiplier * standardDeviation;
    const lowerBand = middleBand - multiplier * standardDeviation;

    // Get the current price
    const currentPrice = prices[prices.length - 1];

    // Trading strategy logic
    if (currentPrice < lowerBand && position !== 'long') {
      return "DN";
    } else if (currentPrice > upperBand && position !== 'short') {
      return "UP";
    } else {
      return "DN";
    }
  };
};
