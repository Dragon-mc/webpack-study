const { getAst, getDeps, transform } = require('./parser')
const path = require('path')
const fs = require('fs')

module.exports = class Complier {
  constructor(options) {
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }

  run() {
    // 构建依赖
    const entryModule = this.buildModule(this.entry)
    this.modules.push(entryModule)
    for (let module of this.modules) {
      module.dependencies.forEach(depPath => {
        this.modules.push(this.buildModule(depPath, path.dirname(module.asbPath)))
      })
    }
    // 输出文件
    this.emit()
  }

  buildModule(filePath, basePath = '') {
    const absFilePath = path.join(basePath, filePath)
    const ast = getAst(absFilePath)
    return {
      asbPath: absFilePath,
      requirePath: filePath,
      dependencies: getDeps(ast),
      code: transform(ast)
    }
  }

  emit() {
    const outputPath = this.output.path || path.join(__dirname, '../dist')
    const filename = this.output.filename || 'bundule.js'
    // 利用requirePath构建映射对象
    let modules = ''
    this.modules.forEach((module, index) => {
      if (index === this.modules.length - 1) {
        modules += `'${module.requirePath}': function(module, exports, require){
          ${module.code}
        }`
      } else {
        modules += `'${module.requirePath}': function (module, exports, require){
          ${module.code}
        },\n`
      }
    })
    const bundle = `
      (function (modules) {
        function require(filename) {
          var fn = modules[filename]
          var module = { exports: {} }
          fn(module, module.exports, require)
          return module.exports
        }
        require('${this.entry}')
      })({
        ${modules}
      })
    `
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true })
    }
    fs.writeFileSync(path.join(outputPath, filename), bundle, 'utf-8')
  }
}