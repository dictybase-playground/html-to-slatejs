#! /usr/bin/env node

const fs = require("fs")
const program = require("commander")
const html = require("./serialize").html

program.version("1.0.0").description("Convert HTML to Slate.js content")

program
  .command("convert <inputFile> [outputFile]")
  .alias("c")
  .description(
    "Converts HTML file to Slate.js content and saves to optional outputFile or contentState.js",
  )
  .action((inputFile, outputFile) => {
    fs.readFile(inputFile, "UTF-8", (err, content) => {
      if (err) {
        console.log(err)
      }
      console.log(content)
      //   const dom = new JSDOM(html)
      //   global.document = dom.window.document
      let contentState = html.serialize(content)
      const contentStateString = JSON.stringify(contentState)

      fs.writeFile(
        `${outputFile ? outputFile : "contentState.js"}`,
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
