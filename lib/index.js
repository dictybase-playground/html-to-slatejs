#! /usr/bin/env node
"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs");
var program = require("commander");
var html = require("./serialize").html;
require("jsdom-global")();
global.DOMParser = window.DOMParser;

program.version("1.0.0").description("Convert HTML to Slate.js content");

program.command("convert <inputFile> [outputFile]").alias("c").description("Converts HTML file to Slate.js content and saves to optional outputFile or contentState.js").action(function (inputFile, outputFile) {
  fs.readFile(inputFile, "UTF-8", function (err, content) {
    if (err) {
      console.log(err);
    }

    var contentState = html.deserialize(content);
    var contentStateString = (0, _stringify2.default)(contentState);

    fs.writeFile("" + (outputFile ? outputFile : "output.json"), contentStateString, function (err) {
      if (err) {
        console.log(err);
      }

      console.log("Conversion complete!");
    });
  });
});

program.parse(process.argv);