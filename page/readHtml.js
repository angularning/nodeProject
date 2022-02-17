// 导入依赖包
const http       = require("http");
const path       = require("path");
const url        = require("url");
const fs         = require("fs");
const superagent = require("superagent");
const cheerio    = require("cheerio");

//爬取页面地址
const pageUrl="https://www.cnblogs.com/";

// 解码字符串
function unescapeString(str){
    if(!str){
        return ''
    }else{
        return unescape(str.replace(/&#x/g,'%u').replace(/;/g,''));
    }
}

// 获取数据
function fetchData(pageUrl){
  const st = new Date()
    console.log('开始时间节点：',st);
    superagent.get(pageUrl).end((error,response)=>{
      let content = response.text
      let $=cheerio.load(content);
      let article = $('.article-content').html()
      let result = {
        title: pageUrl,
        time: st,
        article,
      }
      result = JSON.stringify(result)
      fs.writeFile('jj.json',result, 'utf-8',err=>{
        if(!err){
          console.log('写入成功')
        }
      })
    });
    
}
fetchData('https://juejin.cn/post/6966967718721355784');