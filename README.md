# 超级简单webpack打包原理实现

## 项目目录

```
|-- forestpack
    |-- dist
    |   |-- bundle.js
    |-- lib
    |   |-- compiler.js
    |   |-- index.js
    |   |-- parser.js
    |-- webpack.config.js
    |-- package.json

```

其中complier.js就是主要的编译文件，parser.js借助babel提供的能力，对代码进行依赖分析以及代码转换

## 目的

主要为了了解webpack最最基本的功能，也就是将模块给打包到一起，形成一个唯一的bundle