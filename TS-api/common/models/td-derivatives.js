"use strict";
const request = require("request");
const FyersAPI = require("fyers-api-v3").fyersModel
const configt = require("../../server/config.json");
const app = require("../../server/server");
const axios = require('axios');
const _ = require("lodash");
const moment = require("moment-timezone");
const requestUrl = require("request-promise-native");
const { CookieJar } = require("tough-cookie");
module.exports = function (TdDerivatives) {
  TdDerivatives.symbolList = (type, callback) => {
    const currenturl = `${configt.stock.ownConnection}/api/allSymbols`
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
  TdDerivatives.optionSymbolStock = (type, callback) => {
    const currenturl = `${configt.stock.ownConnection}/api/equity/options/${type}`
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
  TdDerivatives.historyData = (symbol, time, callback) => {
    const currenturl = `${configt.stock.connector}historical-chart/${time}/${symbol}?apikey=${configt.stock.key}`
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
              symbol: symbol,
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
  TdDerivatives.sectorData = async (symbol, callback) => {
    try {
      const baseUrl = `https://www.nseindia.com`;
      const url = `${baseUrl}/api/equity-stockIndices?index=${symbol}`;

      // Create a cookie jar to manage session cookies
      const cookieJar = request.jar();

      // Step 1: Fetch initial cookies
      await requestUrl({
        url: `${baseUrl}/market-data/live-equity-market`,
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        },
        jar: cookieJar,
      });

      // Step 2: Fetch data with cookies
      const response = await requestUrl({
        url: url,
        method: "GET",
        headers: {
          Referer: `${baseUrl}/market-data/live-equity-market?symbol=${symbol}`,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
        },
        jar: cookieJar,
        gzip: true,
      });

      // Parse and handle response
      const jsonData = JSON.parse(response);
      if (_.isEmpty(jsonData)) {
        callback(null, {
          historyData: { status: "0", message: "Data not found", value: 0 },
        });
      } else {
        callback(null, {
          historyData: {
            status: "1",
            message: "success",
            symbol: symbol,
            Item: jsonData,
          },
        });
      }
    } catch (error) {
      callback(null, {
        historyData: { status: "0", message: `Failed to fetch data: ${error.message}`, value: 0 },
      });
      console.error("Error:", error);
    }
  };
  TdDerivatives.sectorData = async (symbol, callback) => {
    try {
      fyers.setAppId("WYB2V40P9M-100")
      fyers.setRedirectUrl("https://url.xyz")
      fyers.setAccessToken("eyjb....")
      var inp={
        "symbol":["NSE:SBIN-EQ","NSE:TCS-EQ"],
        "ohlcv_flag":1
      }
      fyers.getOptionChain({"symbol":"NSE:SBIN-EQ","strikecount":1,"timestamp": ""}).then((response)=>{
          console.log(response.data)
      }).catch((err)=>{
          console.log(err)
      })
      // Parse and handle response
      const jsonData = JSON.parse(response);
      if (_.isEmpty(jsonData)) {
        callback(null, {
          historyData: { status: "0", message: "Data not found", value: 0 },
        });
      } else {
        callback(null, {
          historyData: {
            status: "1",
            message: "success",
            symbol: symbol,
            Item: jsonData,
          },
        });
      }
    } catch (error) {
      callback(null, {
        historyData: { status: "0", message: `Failed to fetch data: ${error.message}`, value: 0 },
      });
      console.error("Error:", error);
    }
  };
};
