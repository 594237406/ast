const babylon = require("babylon")
const generate = require("babel-generator").default
const traverse = require('babel-traverse').default

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

traverse(ast, {
  enter(path) {
    if (
      path.node.type === "Identifier" && path.node.name === "n"
    ) {
      path.node.name = 'number'
    }
  }
});

const trans = generate(ast, {
  compact: "true",
}, code);

console.log(trans)