#! /usr/bin/env node
"use strict"

const fs = require("fs")
const program = require("commander")
var path = require("path")
const html = require("./deserialize").html
const { version } = require("../package.json")

require("jsdom-global")()
global.DOMParser = window.DOMParser

program.version(version).description("Convert HTML to Slate.js content")

program
  .command("convert <inputFile> [outputFile]")
  .alias("c")
  .description(
    "Converts HTML file to Slate.js content and saves to optional outputFile or output.json",
  )
  .action((inputFile, outputFile) => {
    fs.readFile(inputFile, "UTF-8", (err, content) => {
      if (err) {
        console.log(err)
      }

      let convertedHtml = html.deserialize(content)
      const HtmlString = JSON.stringify(convertedHtml)

      fs.writeFile(
        `${outputFile ? outputFile : "output.json"}`,
        HtmlString,
        err => {
          if (err) {
            console.log(err)
          }

          console.log("Conversion complete!")
        },
      )
    })
  })

program
  .command("folder-convert <inputFolder> [outputFolder]")
  .alias("f")
  .description(
    "Converts folder of HTML files to Slate.js content and saves to optional outputFolder or output",
  )
  .action((inputFolder, outputFolder) => {
    fs.readdir(inputFolder, (err, files) => {
      if (err) {
        console.log(err)
        process.exit(1) // stop the script
      }

      files.forEach(file => {
        fs.readFile(file, "UTF-8", (err, content) => {
          const fileContent = fs.readFileSync(inputFolder + "/" + file)
          let convertedHtml = html.deserialize(fileContent)
          const HtmlString = JSON.stringify(convertedHtml)

          const filenameWithoutExtension = path.basename(
            file,
            path.extname(file),
          )

          fs.writeFileSync(
            `${filenameWithoutExtension + ".json"}`,
            HtmlString,
            err => {
              if (err) {
                console.log(err)
              }
            },
          )
        })
        console.log("✅  Conversion complete!")
      })
    })
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
