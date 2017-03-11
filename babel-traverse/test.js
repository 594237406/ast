const babylon = require("babylon")
const babel = require('babel-core');
const traverse = require('babel-traverse').default

const code = `function square(store) {
  store.set('ast', {})
  store.name('ast', {})
  const a = 'store.set'
  return store;
}`;

const ast = babylon.parse(code);


traverse(ast, {
  enter(path) {
    if (
      path.node.type === "Identifier" &&
      path.node.name === "store" && path.parent.type === 'MemberExpression' && path.parent.property.name === 'set'
    ) {
      path.parent.property.name = 'setStore'
      path.parentPath.parentPath.node.arguments[0].value = 'astTest'
    }
  }
});

const { code: c } = babel.transformFromAst(ast, "", {});
console.log(c)