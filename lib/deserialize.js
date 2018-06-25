"use strict";

var Html = require("slate-html-serializer").default;

var BLOCK_TAGS = {
  p: "paragraph",
  li: "list-item",
  ul: "bulleted-list",
  ol: "numbered-list",
  blockquote: "quote",
  pre: "code",
  h1: "heading-one",
  h2: "heading-two",
  h3: "heading-three",
  h4: "heading-four",
  h5: "heading-five",
  h6: "heading-six",
  figure: "figure",
  figcaption: "figcaption",
  hr: "divider",
  table: "table",
  th: "table-head",
  tr: "table-row",
  td: "table-cell",
  center: "center"
};

var MARK_TAGS = {
  strong: "bold",
  b: "bold",
  em: "italic",
  i: "italic",
  u: "underline",
  s: "strikethrough",
  code: "code"
};

var rules = [{
  deserialize: function deserialize(el, next) {
    var tagName = el.tagName.toLowerCase();
    if (tagName === "img") {
      // special case for images, to grab their src
      return {
        object: "block",
        type: "image",
        isVoid: true,
        nodes: next(el.childNodes),
        data: {
          src: el.getAttribute("src")
        }
      };
    } else if (tagName === "a") {
      // special case for links, to grab their href
      return {
        object: "inline",
        type: "link",
        nodes: next(el.childNodes),
        data: {
          href: el.getAttribute("href")
        }
      };
    } else if (BLOCK_TAGS[tagName]) {
      // rule to handle blocks
      return {
        object: "block",
        type: BLOCK_TAGS[tagName],
        data: {
          className: el.getAttribute("class")
        },
        nodes: next(el.childNodes)
      };
    } else if (MARK_TAGS[tagName]) {
      // rule to handle marks
      return {
        object: "mark",
        type: MARK_TAGS[tagName],
        nodes: next(el.childNodes)
      };
    }
  }
}];

// create a new serializer instance with our `rules` from above
var html = new Html({ rules: rules });

module.exports = {
  html: html
};