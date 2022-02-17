// 导入依赖包
const http       = require("http");
const path       = require("path");
const url        = require("url");
const fs         = require("fs");
const superagent = require("superagent");
const cheerio    = require("cheerio");

// 解码字符串
function unescapeString(str){
    if(!str){
        return ''
    }else{
        return unescape(str.replace(/&#x/g,'%u').replace(/;/g,''));
    }
}
function downFile(){
    let file = document.querySelectorAll('.mdui-list .mdui-list-item .mdui-list-item-content .mdui-list-item-title .mdui-float-right')
    let len = file.length
    let num = 1
    for(let i = 0 ;i< len;i++){
        let a = file[i];
        num++
        let timer = setInterval(()=> { a.click()}, 1000)
        if(len === num - 1){
            timer = null
        }
    }

}
// 获取数据
function getData(pageUrl){
    document.querySelectorAll('.mdui-list .mdui-list-item .mdui-list-item-content .mdui-list-item-title .mdui-float-right')
  const st = new Date()
    console.log('开始时间节点：',st);
    superagent.get(pageUrl).end((error,response)=>{
      let content = response.text
      let $=cheerio.load(content);
      let html = $('.mdui-list').html()
      let result = {
      }
      console.log(html)
      // result = JSON.stringify(result)
      // fs.writeFile('juejinHotId.json',result, 'utf-8',err=>{
      //   if(!err){
      //     console.log('写入成功')
      //   }
      // })
    });

}
// getData('https://juejin.cn/frontend');
// getData('https://juejin.cn/post/6967634683811069982');
getData('https://ali.wangzai.top/%e6%8e%98%e9%87%91%e5%b0%8f%e5%86%8c/%e5%89%8d%e7%ab%af%e5%b0%8f%e5%86%8c/Web%20%e5%89%8d%e7%ab%af%e9%9d%a2%e8%af%95%e6%8c%87%e5%8d%97%e4%b8%8e%e9%ab%98%e9%a2%91%e8%80%83%e9%a2%98%e8%a7%a3%e6%9e%90');
