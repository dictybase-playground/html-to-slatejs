"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs");
var html = require("../deserialize").html;

require("jsdom-global")();
global.DOMParser = window.DOMParser;

var convert = function convert(inputFile, outputFile) {
  fs.readFile(inputFile, "UTF-8", function (err, content) {
    if (err) {
      console.error(err);
    }

    var convertedHtml = html.deserialize(content);
    var HtmlString = (0, _stringify2.default)(convertedHtml);

    fs.writeFile("" + (outputFile ? outputFile : "output.json"), HtmlString, function (err) {
      if (err) {
        console.error(err);
      }

      console.log("Conversion complete!");
    });
  });
};

module.exports = convert;