const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('babel-core')

module.exports = {
  // 根据文件内容解析为AST
  getAst(path) {
    const source = fs.readFileSync(path, 'utf-8')
    // 根据文件内容解析
    return parser.parse(source, {
      sourceType: 'module'
    })
  },

  // 遍历当前AST，获取相关依赖
  getDeps(ast) {
    const deps = []
    traverse(ast, {
      ImportDeclaration({ node }) {
        deps.push(node.source.value)
      }
    })
    return deps
  },

  // 将ES6的AST，转换为ES5代码
  transform(ast) {
    const { code } = transformFromAst(ast, null, {
      presets: ['env']
    })
    return code
  }
}
