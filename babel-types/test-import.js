const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const t = require("babel-types");
const babel = require('babel-core');

const code = `import { Button } from 'antd'`;

const ast = babylon.parse(code, {
  sourceType: 'module'
});

const toLowerCase = word => Array.from(word).map((char, index)=> !index ? char.toLowerCase() : char).join('')

traverse(ast, {
  enter(path) {
    const { node } = path
    const { type, specifiers, source }= node
    if (t.isImportDeclaration(node)) {
      const elementsNode = specifiers.filter(specifier => t.isImportSpecifier(specifier))
      if (elementsNode.length === 1) {
        const elementNode = elementsNode[0]
        const element = toLowerCase(elementNode.imported.name)
        elementNode.type = 'ImportDefaultSpecifier'
        source.value += `/lib/${element}`
      }
    }
  }
});

const { code: c } = babel.transformFromAst(ast, "", {});
console.log(c)