var fs = require('fs');
var esprima = require('esprima');
const code = `function square(store) {
  store.set('ast', 'abc')
  store.name('ast', {})
  const a = 'store.set'
  return store;
}`
var ast = esprima.parse(code);
console.log(JSON.stringify(ast))