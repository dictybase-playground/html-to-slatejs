# html-to-slatejs

Node.js command line tool for converting HTML files to Slate.js compatible content

To get started:

```
npm install https://github.com/dictybase-playground/html-to-slatejs
```

The script has one main command called `convert`. This command takes one required argument which is an HTML filename. It also takes an optional second argument which is an output file in which to save the new JSON. It converts the HTML file to Slate-compatible JSON and saves to the output file if provided, otherwise to a file called `output.json`.

To run the script type:

```
html-to-slate convert|c <inputFile> [outputFile]
```

Example:

```
html-to-slate c example.html example.json
```

For help type:

```
html-to-slate -h
```
