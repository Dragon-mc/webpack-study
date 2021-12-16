
      (function (modules) {
        function require(filename) {
          var fn = modules[filename]
          var module = { exports: {} }
          fn(module, module.exports, require)
          return module.exports
        }
        require('E:\www\webpack-study\src\index.js')
      })({
        'E:\www\webpack-study\src\index.js': function (module, exports, require){
          "use strict";

var _hello = require("./tool/hello.js");

function printHello() {
  (0, _hello.hello)();
}

printHello();
        },
'./tool/hello.js': function (module, exports, require){
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hello = hello;

var _hello = require("../other/other-nested/hello2.js");

var _hello2 = _interopRequireDefault(_hello);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hello() {
  console.log('hello');
  (0, _hello2.default)();
}
        },
'../other/other-nested/hello2.js': function(module, exports, require){
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hello2;

function hello2() {
  console.log('hello2');
}
        }
      })
    