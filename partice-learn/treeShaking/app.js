import * as fs from "fs";
import * as path from "path";
import Uglify from 'uglify-js'
import { transform } from "@babel/core";
import * as babel from "@babel/core";
import  { parse } from "@babel/core";
import * as parser from "@babel/parser";
import _traverse from "@babel/traverse";
const traverse = _traverse.default;
const dir = process.cwd()
// 遍历js文件夹下的所有js文件
try{
  const filesList = fs.readdirSync('./js')
    for(let files of filesList){
      // 获取文件绝对路径
      const file = path.join(dir, 'js', files)
      // 获取文件名字，去除后缀
      const fileUrl = path.parse(path.basename(file)).name
      // 获取文件内容
      const content = fs.readFileSync(file, 'utf-8')
      // babel转译
      transformFile(content, fileUrl)
      /*
      // 压缩文件
      let result = Uglify.minify(content, {sourceMap: true})
      // 写入文件
      fs.writeFile(path.join(dir, 'js', `${fileUrl}.min.js`), result.code, 'utf-8', (err) => {
        if (err) {
          console.log(err)
        }
      })*/
    }
} catch (error) {
  console.log(error)
}
function transformFile(content, fileUrl) {
  const ast = parse(content, {
    sourceType: "module",
  })
  const astParser = parser.parse(content)
  traverse(astParser, {
    FunctionDeclaration: function(path) {
      console.log('path.node.', path.node)
      path.node.id.name = "xxxxxxxxx";
    },
  });
  const stringifyTree = JSON.stringify(ast, null, 2)
  fs.writeFile(path.join(dir, 'js', `${fileUrl}.min.js`), stringifyTree, 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}
