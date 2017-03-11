const babylon = require("babylon")
const code = `function square(store) {
  store.set('ast', {})
  store.name('ast', {})
  const a = 'store.set'
  return store;
}`;

const ast = babylon.parse(code);

console.log(ast)
