"use strict"

const fs = require("fs")
const html = require("../deserialize").html

require("jsdom-global")()
global.DOMParser = window.DOMParser

const convert = (inputFile, outputFile) => {
  fs.readFile(inputFile, "UTF-8", (err, content) => {
    if (err) {
      console.error(err)
    }

    let convertedHtml = html.deserialize(content)
    const HtmlString = JSON.stringify(convertedHtml)

    fs.writeFile(
      `${outputFile ? outputFile : "output.json"}`,
      HtmlString,
      err => {
        if (err) {
          console.error(err)
        }

        console.log("Conversion complete!")
      },
    )
  })
}

module.exports = convert
