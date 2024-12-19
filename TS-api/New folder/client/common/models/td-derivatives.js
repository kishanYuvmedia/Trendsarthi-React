"use strict";
const request = require("request");
const configt = require("../../server/config.json");
const app = require("../../server/server");
const _ = require("lodash");
const moment = require("moment-timezone");
module.exports = function (TdDerivatives) {
  TdDerivatives.symbolList = (type, callback) => {
    const currenturl = `${configt.stock.connector}/search?query=.NS&exchange=NSE&apikey=${configt.stock.key}`
    request(currenturl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const jsonData = JSON.parse(body);
        if (_.isEmpty(body)) {
          callback(null, {
            symbolList: { status: "0", message: "Data not find", value: 0 },
          });
        } else {
          callback(null, {
            symbolList: {
              status: "1",
              message: "success",
              Item: jsonData,
            },
          });
        }
      } else {
        callback(null, {
          symbolList: { status: "0", message: "Data not find", value: 0 },
        });
      }
    });
  };
  TdDerivatives.symbolStock = (type,callback) => {
    const currenturl = `https://financialmodelingprep.com/api/v3/symbol/NSE?apikey=${configt.stock.key}`
    request(currenturl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const jsonData = JSON.parse(body);
        if (_.isEmpty(body)) {
          callback(null, {
            symbolStock: { status: "0", message: "Data not find", value: 0 },
          });
        } else {
          callback(null, {
            symbolStock: {
              status: "1",
              message: "success",
              Item: jsonData,
            },
          });
        }
      } else {
        callback(null, {
          symbolStock: { status: "0", message: "Data not find", value: 0 },
        });
      }
    });
  };
  TdDerivatives.historyData = (symbol,time, callback) => {
    const currenturl=`${configt.stock.connector}historical-chart/${time}/${symbol}?apikey=${configt.stock.key}`
    request(currenturl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const jsonData = JSON.parse(body);
        if (_.isEmpty(body)) {
          callback(null, {
            historyData: { status: "0", message: "Data not find", value: 0 },
          });
        } else {
          callback(null, {
            historyData: {
              status: "1",
              message: "success",
              symbol:symbol,
              Item: jsonData,
            },
          });
        }
      } else {
        callback(null, {
          historyData: { status: "0", message: "Data not find", value: 0 },
        });
      }
    });
  };
};
