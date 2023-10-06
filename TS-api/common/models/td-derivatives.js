"use strict";
const request = require("request");
const configt = require("../../server/config.json");
const app = require("../../server/server");
const _ = require("lodash");
const moment = require("moment");
const cron = require("node-cron");
const promisify = require("util").promisify;

module.exports = function (TdDerivatives) {
  var getIntradayData = app.dataSources.getIntradayData;
  var getOptionExpiry = app.dataSources.getOptionExpiry;
  var getOptionData = app.dataSources.getOptionData;
  const schedule = "0-59/5 9-14 * * 0-5"; // Replace with your desired cron schedule
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
        getOptionExpiry.getOptionExpiryDates(type, (err, responsedate) => {
          if (_.isEmpty(responsedate)) {
            callback(null, {
              result: { status: "0", message: "Data not find", value: 0 },
            });
          } else {
            const expirydate = responsedate.EXPIRYDATES[0];
            getOptionData.getOptionDataToday(
              type,
              expirydate,
              (err, responseOption) => {
                if (_.isEmpty(responseOption)) {
                  callback(null, {
                    result: {
                      status: "0",
                      message: "Data not find",
                      value: 0,
                    },
                  });
                } else {
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
                      time,
                      strike,
                    };
                    if (!_.isEmpty(datatoday)) {
                      TdDerivatives.create(datatoday, (err, data) => {
                        if (err) console.error(err);
                        else {
                          console.log("Data updated successfully.");
                          callback(null, {
                            result: {
                              status: "1",
                              message: "Data updated successfully.",
                              value: 1,
                            },
                          });
                        }
                      });
                    }
                  }
                }
              }
            );
          }
        });
      }
    });
  };
  cron.schedule(schedule, async () => {
    const listType = ["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY"];
    for (const type of listType) {
      getIntradayData.getcurrentIntraday(type, (err, response) => {
        if (_.isEmpty(response)) {
          console.log("error 1");
        } else {
          const currentdata = response;
          const strickPrice = response.AVERAGETRADEDPRICE;
          getOptionExpiry.getOptionExpiryDates(type, (err, responsedate) => {
            if (_.isEmpty(responsedate)) {
              console.log("error 2");
            } else {
              const expirydate = responsedate.EXPIRYDATES[0];
              getOptionData.getOptionDataToday(
                type,
                expirydate,
                (err, responseOption) => {
                  if (_.isEmpty(responseOption)) {
                    console.log("error 3");
                  } else {
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
                        time,
                        strike,
                      };
                      if (!_.isEmpty(datatoday)) {
                        TdDerivatives.create(datatoday, (err, data) => {
                          if (err) console.error(err);
                          else {
                            console.log("Data updated successfully.");
                          }
                        });
                      }
                    }
                  }
                }
              );
            }
          });
        }
      });
    }
  });
};
