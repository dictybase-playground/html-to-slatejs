"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs");
var path = require("path");
var html = require("../deserialize").html;

require("jsdom-global")();
global.DOMParser = window.DOMParser;

var folderConvert = function folderConvert(inputFolder, outputFolder) {
  fs.readdir(inputFolder, function (err, files) {
    if (err) {
      console.error(err);
      process.exit(1); // stop the script
    }

    var checkDirectory = function checkDirectory(directory) {
      try {
        fs.statSync(directory);
      } catch (e) {
        fs.mkdirSync(directory);
      }
    };

    files.forEach(function (file) {
      fs.readFile(file, "UTF-8", function (err, content) {
        var fileContent = fs.readFileSync(inputFolder + "/" + file);
        var convertedHtml = html.deserialize(fileContent);
        var HtmlString = (0, _stringify2.default)(convertedHtml);

        var filenameWithoutExtension = path.basename(file, path.extname(file));

        if (outputFolder) {
          checkDirectory(outputFolder);
        } else {
          checkDirectory("output");
        }

        fs.writeFileSync(outputFolder ? "./" + outputFolder + "/" + filenameWithoutExtension + ".json" : "./output/" + filenameWithoutExtension + ".json", HtmlString, function (err) {
          if (err) {
            console.error(err);
          }
        });
      });
      console.log("✅  Conversion complete!");
    });
  });
};

module.exports = folderConvert;