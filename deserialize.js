const Html = require("slate-html-serializer").default

const BLOCK_TAGS = {
  blockquote: "quote",
  p: "paragraph",
  pre: "code",
}

const MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underline",
  del: "strikethrough",
}

const rules = [
  // rule that handles blocks
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: "block",
          type: type,
          data: {
            className: el.getAttribute("class"),
          },
          nodes: next(el.childNodes),
        }
      }
    },
  },
  // rule that handles marks
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: "mark",
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
  },
  {
    // special case for images, to grab their src
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == "img") {
        return {
          object: "block",
          type: "image",
          isVoid: true,
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute("src"),
          },
        }
      }
    },
  },
  {
    // special case for links, to grab their href
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == "a") {
        return {
          object: "inline",
          type: "link",
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute("href"),
          },
        }
      }
    },
  },
]

// create a new serializer instance with our `rules` from above
const html = new Html({ rules: rules })

module.exports = {
  html: html,
}
