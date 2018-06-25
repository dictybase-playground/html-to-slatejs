"use strict"

const fs = require("fs")
const path = require("path")
const html = require("../deserialize").html

require("jsdom-global")()
global.DOMParser = window.DOMParser

const folderConvert = (inputFolder, outputFolder) => {
  fs.readdir(inputFolder, (err, files) => {
    if (err) {
      console.error(err)
      process.exit(1) // stop the script
    }

    const checkDirectory = directory => {
      try {
        fs.statSync(directory)
      } catch (e) {
        fs.mkdirSync(directory)
      }
    }

    files.forEach(file => {
      fs.readFile(file, "UTF-8", (err, content) => {
        const fileContent = fs.readFileSync(`${inputFolder}/${file}`)
        const convertedHtml = html.deserialize(fileContent)
        const HtmlString = JSON.stringify(convertedHtml)

        const filenameWithoutExtension = path.basename(file, path.extname(file))

        checkDirectory(outputFolder)

        fs.writeFileSync(
          `./${outputFolder}/${filenameWithoutExtension}.json`,
          HtmlString,
          err => {
            if (err) {
              console.error(err)
            }
          },
        )
      })
      console.log("✅  Conversion complete!")
    })
  })
}

module.exports = folderConvert
