#! /usr/bin/env node

const fs = require("fs")
const program = require("commander")
const html = require("./serialize").html
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

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
