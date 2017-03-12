const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const t = require("babel-types");
const babel = require('babel-core');

const code = `function square(store) {
  store.set('ast', 'abc')
  store.name('ast', {})
  const a = 'store.set'
  return store;
}`;

const ast = babylon.parse(code);

traverse(ast, {
  enter(path) {
    const { node } = path
    const { type, callee, arguments: args }= node
    if (t.isCallExpression(node)) {
      const { object, property } = callee
      if (object.name === 'store' && property.name === 'set') {
        const [{ value: key }, { value: val } ] = args
        console.log(key, val)
      }
    }
  }
});

const { code: c } = babel.transformFromAst(ast, "", {});
//console.log(c)