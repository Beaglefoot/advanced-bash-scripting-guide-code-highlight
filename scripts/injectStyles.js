checkArgs();

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const hljs = require("highlight.js/lib/core");

hljs.registerLanguage("bash", require("highlight.js/lib/languages/bash"));
hljs.registerLanguage("shell", require("highlight.js/lib/languages/shell"));

function checkArgs() {
  const htmlFilename = process.argv[2];

  if (!htmlFilename) {
    console.error("No html filename was provided");
    process.exit(1);
  }
}

function injectStyleNode(headNode, pathToCss) {
  const htmlFilename = process.argv[2];
  const styleNode = document.createElement("link");

  styleNode.rel = "stylesheet";
  styleNode.href = path.relative(
    htmlFilename,
    path.resolve(htmlFilename, pathToCss)
  );

  headNode.appendChild(styleNode);
}

function highlightCodeBlocks() {
  const codeBlocks = document.getElementsByClassName("PROGRAMLISTING");

  for (let block of codeBlocks) {
    block.innerHTML = hljs.highlight("bash", block.textContent).value;
    block.classList.add("hljs");
  }
}

function highlightScreenBlocks() {
  const codeBlocks = document.getElementsByClassName("SCREEN");

  for (let block of codeBlocks) {
    block.innerHTML = hljs.highlight("shell", block.textContent).value;
    block.classList.add("hljs");
  }
}

function removeBorderOnScreenBlocks() {
  const tables = document.getElementsByTagName("table");

  for (let table of tables) {
    if (table.getElementsByClassName("SCREEN").length) {
      table.classList.add("no-border");
    }
  }
}

function main() {
  const htmlFilename = process.argv[2];

  console.error(`Processing ${htmlFilename}`);

  const content = fs.readFileSync(htmlFilename, "utf8");
  const dom = new JSDOM(content);

  global.window = dom.window;
  global.document = window.document;

  injectStyleNode(document.head, "styles/custom.css");
  injectStyleNode(document.head, "styles/atom-one-dark.css");

  highlightCodeBlocks();
  highlightScreenBlocks();

  removeBorderOnScreenBlocks();

  console.log(dom.serialize());
}

main();
