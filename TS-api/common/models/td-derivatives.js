"use strict";
const request = require("request");
const app = require("../../server/server");
const _ = require("lodash");
module.exports = function (TdDerivatives) {
  TdDerivatives.derivativestype = (type, callback) => {
    const currenturl = `http://nimblerest.lisuns.com:4531/GetLastQuote/?accessKey=988dcf72-de6b-4637-9af7-fddbe9bfa7cd&exchange=NFO&instrumentIdentifier=${type}`;
    console.log(currenturl);
    request(currenturl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        if (_.isEmpty(body)) {
          callback(null, { list: { status: "0", message: "Data not find" } });
        } else {
          callback(null, { list: body });
        }
      } else {
        callback(null, { list: { status: "0", message: "Data not find" } });
      }
    });
  };
};
