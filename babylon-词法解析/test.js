const babylon = require("babylon")
const code = `function square(store) {
  store.set('ast', {})
  store.name('ast', {})
  const a = 'store.set'
  return store;
}`;

const astParse = babylon.parse(code, {
//  plugins: [
//    // enable jsx and flow syntaxconst { Button } = require(a)
//    "jsx",
//    "flow"
//  ]

});


const astParseExpression = babylon.parseExpression(code, {
//  plugins: [
//    "jsx",
//    "es2015"
//  ]
});

// parse 是词法分析，parseExpression是语法分析
console.log(astParse, astParseExpression)
