"use strict";

var Html = require("slate-html-serializer").default;

var BLOCK_TAGS = {
  blockquote: "quote",
  p: "paragraph",
  pre: "code"

  // Add a dictionary of mark tags.
};var MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underline"
};

var rules = [{
  deserialize: function deserialize(el, next) {
    var type = BLOCK_TAGS[el.tagName.toLowerCase()];
    if (type) {
      return {
        object: "block",
        type: type,
        data: {
          className: el.getAttribute("class")
        },
        nodes: next(el.childNodes)
      };
    }
  },
  serialize: function serialize(obj, children) {
    if (obj.object == "block") {
      switch (obj.type) {
        case "code":
          return React.createElement(
            "pre",
            null,
            React.createElement(
              "code",
              null,
              children
            )
          );
        case "paragraph":
          return React.createElement(
            "p",
            { className: obj.data.get("className") },
            children
          );
        case "quote":
          return React.createElement(
            "blockquote",
            null,
            children
          );
      }
    }
  }
},
// Add a new rule that handles marks...
{
  deserialize: function deserialize(el, next) {
    var type = MARK_TAGS[el.tagName.toLowerCase()];
    if (type) {
      return {
        object: "mark",
        type: type,
        nodes: next(el.childNodes)
      };
    }
  },
  serialize: function serialize(obj, children) {
    if (obj.object == "mark") {
      switch (obj.type) {
        case "bold":
          return React.createElement(
            "strong",
            null,
            children
          );
        case "italic":
          return React.createElement(
            "em",
            null,
            children
          );
        case "underline":
          return React.createElement(
            "u",
            null,
            children
          );
      }
    }
  }
}];

// Create a new serializer instance with our `rules` from above.
var html = new Html({ rules: rules });

module.exports.html = html;