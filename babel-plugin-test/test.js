const babel = require('babel-core');

const code = `import { Button } from 'antd'`;

var result = babel.transform(code, {
  plugins:["import"]
});

console.log(result.code);

