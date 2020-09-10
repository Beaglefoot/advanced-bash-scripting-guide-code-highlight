const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const filename = process.argv[2];

if (!filename) {
  console.error("No filename was provided");
  process.exit(1);
}

const content = fs.readFileSync(filename, "utf8");
const dom = new JSDOM(content);
const { window } = dom;
const { document } = window;

function injectStyleNode(headNode) {
  const styleNode = document.createElement("link");

  styleNode.rel = "stylesheet";
  styleNode.href = path.relative(
    filename,
    path.resolve(filename, "../styles/custom.css")
  );

  headNode.appendChild(styleNode);
}

injectStyleNode(document.head);

console.log(dom.serialize());
