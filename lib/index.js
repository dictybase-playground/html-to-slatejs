#! /usr/bin/env node
"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs");
var program = require("commander");
var html = require("./serialize").html;

var _require = require("../package.json"),
    version = _require.version;

require("jsdom-global")();
global.DOMParser = window.DOMParser;

program.version(version).description("Convert HTML to Slate.js content");

program.command("convert <inputFile> [outputFile]").alias("c").description("Converts HTML file to Slate.js content and saves to optional outputFile or output.json").action(function (inputFile, outputFile) {
  fs.readFile(inputFile, "UTF-8", function (err, content) {
    if (err) {
      console.log(err);
    }

    var convertedHtml = html.deserialize(content);
    var HtmlString = (0, _stringify2.default)(convertedHtml);

    fs.writeFile("" + (outputFile ? outputFile : "output.json"), HtmlString, function (err) {
      if (err) {
        console.log(err);
      }

      console.log("Conversion complete!");
    });
  });
});

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}