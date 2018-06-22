#! /usr/bin/env node

const fs = require("fs")
const program = require("commander")
const html = require("./serialize").html

require("jsdom-global")()
global.DOMParser = window.DOMParser

program.version("1.0.0").description("Convert HTML to Slate.js content")

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

      let contentState = html.deserialize(content)
      const contentStateString = JSON.stringify(contentState)

      fs.writeFile(
        `${outputFile ? outputFile : "output.json"}`,
        contentStateString,
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
