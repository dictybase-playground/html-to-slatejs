#! /usr/bin/env node

"use strict";

var program = require("commander");

var _require = require("../package.json"),
    version = _require.version;

// commands


var convert = require("../commands/convert");
var folderConvert = require("../commands/folder-convert");

program.version(version).description("Convert HTML to Slate.js content");

program.command("convert <inputFile> [outputFile]").alias("c").description("Converts HTML file to Slate.js content and saves to optional outputFile or output.json").action(convert);

program.command("folder-convert <inputFolder> [outputFolder]").alias("f").description("Converts folder of HTML files to Slate.js content and saves to optional outputFolder or output").action(folderConvert);

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}