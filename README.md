# html-to-slatejs

Node.js command line tool for converting HTML files to Slate.js compatible content

To get started:

```
npm install https://github.com/dictybase-playground/html-to-slatejs
```

The script has two main commands -- `convert` and `folder-convert`.

### convert

This command takes one required argument which is an HTML filename. It also takes an optional second argument which is an output file to save the new JSON. It converts the HTML file to Slate-compatible JSON and saves to the output file if provided, otherwise to a file called `output.json`.

To run this script type:

```
html-to-slate convert|c <inputFile> [outputFile]
```

Example:

```
html-to-slate c example.html example.json
```

### folder-convert

This command takes one required argument which is a folder. It also takes an optional second argument which is an output folder to save the new JSON files. It converts the HTML files inside the inputFolder to Slate-compatible JSON and saves to output files inside the outputFolder if provided, otherwise to a folder called `output`.

To run this script type:

```
html-to-slate folder-convert|f <inputFolder> [outputFolder]
```

Example:

```
html-to-slate f examples files
```

For help type:

```
html-to-slate -h
```

### Development

Make changes on a separate branch, run `npm run build` then merge to `develop`.
