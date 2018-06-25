"use strict";

var Html = require("slate-html-serializer").default;

var BLOCK_TAGS = {
  blockquote: "quote",
  p: "paragraph",
  pre: "code"
};

var MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underline",
  del: "strikethrough"
};

var rules = [
// rule that handles blocks
{
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
  }
},
// rule that handles marks
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
  }
}, {
  // special case for images, to grab their src
  deserialize: function deserialize(el, next) {
    if (el.tagName.toLowerCase() == "img") {
      return {
        object: "block",
        type: "image",
        isVoid: true,
        nodes: next(el.childNodes),
        data: {
          src: el.getAttribute("src")
        }
      };
    }
  }
}, {
  // special case for links, to grab their href
  deserialize: function deserialize(el, next) {
    if (el.tagName.toLowerCase() == "a") {
      return {
        object: "inline",
        type: "link",
        nodes: next(el.childNodes),
        data: {
          href: el.getAttribute("href")
        }
      };
    }
  }
}];

// create a new serializer instance with our `rules` from above
var html = new Html({ rules: rules });

module.exports = {
  html: html
};