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

    // check if outputFolder already exists
    // if not, then make directory
    const checkDirectory = directory => {
      try {
        fs.statSync(directory)
      } catch (e) {
        fs.mkdirSync(directory)
      }
    }

    files.forEach(file => {
      fs.readFile(file, "UTF-8", (err, content) => {
        // read the content of each file in folder
        const fileContent = fs.readFileSync(`${inputFolder}/${file}`)
        // convert this HTML to deserialized form
        const convertedHtml = html.deserialize(fileContent)
        // stringify the converted HTML
        const HtmlString = JSON.stringify(convertedHtml)
        // get the filename without the extension
        const filenameWithoutExtension = path.basename(file, path.extname(file))

        // check if there is a specified outputFolder
        // if not, create "output" as default
        if (outputFolder) {
          checkDirectory(outputFolder)
        } else {
          checkDirectory("output")
        }

        // write the new file in the specified/created folder
        fs.writeFileSync(
          outputFolder
            ? `./${outputFolder}/${filenameWithoutExtension}.json`
            : `./output/${filenameWithoutExtension}.json`,
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
