const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const babelTypes = require("babel-types");
const babel = require('babel-core');

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

traverse(ast, {
  enter(path) {
    if (babelTypes.isIdentifier(path.node, { name: "n" })) {
      path.node.name = "x";
    }
  }
});

const { code: c } = babel.transformFromAst(ast, "", {});
console.log(c)