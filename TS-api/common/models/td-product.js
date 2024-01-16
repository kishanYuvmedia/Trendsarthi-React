"use strict";
const app = require("../../server/server");
const _ = require("lodash");
const cron = require("node-cron");
module.exports = function (TdProduct) {
  var scheduleone = "30 9 * * *";
  var getIntradayData = app.datasources.getIntradayData;
  cron.schedule(scheduleone, async () => {
    getIntradayData.getProductList(async (err, response) => {
      if (!_.isEmpty(response)) {
        if (!_.isEmpty(response)) {
          await new Promise((resolve, reject) => {
            TdProduct.then(JSON.toJSON).then((data) => {
              console.log(data);
            });
            // TdProduct.create({ List: response.PRODUCTS }, (err, data) => {
            //   if (err) {
            //     console.error(err);
            //     reject(err);
            //   } else {
            //     console.log("Data updated successfully.");
            //     resolve();
            //   }
            // });
          });
        }
      }
    });
  });
  TdProduct.AddProductList = (callback) => {
    getIntradayData.getProductList(async (err, response) => {
      if (!_.isEmpty(response)) {
        if (!_.isEmpty(response)) {
          await new Promise((resolve, reject) => {
            TdProduct.find()
              .then(JSON.toJSON)
              .then((data) => {
                TdProduct.deleteById(data[0].id).then((result) => {});
              });
            TdProduct.create({ List: response.PRODUCTS }, (err, data) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                callback(null, {
                  result: "Data updated successfully.and old data deleted",
                });
                resolve();
              }
            });
          });
        }
      }
    });
  };
};
