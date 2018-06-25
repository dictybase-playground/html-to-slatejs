#! /usr/bin/env node

"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs");
var program = require("commander");
var path = require("path");
var html = require("./deserialize").html;

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

program.command("folder-convert <inputFolder> [outputFolder]").alias("f").description("Converts folder of HTML files to Slate.js content and saves to optional outputFolder or output").action(function (inputFolder, outputFolder) {
  fs.readdir(inputFolder, function (err, files) {
    if (err) {
      console.log(err);
      process.exit(1); // stop the script
    }

    files.forEach(function (file) {
      fs.readFile(file, "UTF-8", function (err, content) {
        var fileContent = fs.readFileSync(inputFolder + "/" + file);
        var convertedHtml = html.deserialize(fileContent);
        var HtmlString = (0, _stringify2.default)(convertedHtml);

        var filenameWithoutExtension = path.basename(file, path.extname(file));

        fs.writeFileSync("" + (filenameWithoutExtension + ".json"), HtmlString, function (err) {
          if (err) {
            console.log(err);
          }
        });
      });
      console.log("✅  Conversion complete!");
    });
  });
});

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}