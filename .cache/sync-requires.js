// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("C:/Users/Casey.Hill/DEV/Fry/fry-calculator/.cache/layouts/index.js"))
}

exports.components = {
  "component---src-pages-404-js": preferDefault(require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\src\\pages\\404.js")),
  "component---src-pages-page-2-js": preferDefault(require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\src\\pages\\page-2.js")),
  "component---src-pages-index-js": preferDefault(require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\src\\pages\\index.js"))
}

exports.json = {
  "layout-index.json": require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\.cache\\json\\layout-index.json"),
  "404.json": require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\.cache\\json\\404.json"),
  "layout-index.json": require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\.cache\\json\\layout-index.json"),
  "page-2.json": require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\.cache\\json\\page-2.json"),
  "layout-index.json": require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\.cache\\json\\layout-index.json"),
  "index.json": require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\.cache\\json\\index.json"),
  "layout-index.json": require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\.cache\\json\\layout-index.json"),
  "404-html.json": require("C:\\Users\\Casey.Hill\\DEV\\Fry\\fry-calculator\\.cache\\json\\404-html.json")
}