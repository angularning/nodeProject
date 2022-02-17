const xlsx = require('node-xlsx');
const fs = require('fs')

// 解析得到文档中的所有 sheet
const sheets = xlsx.parse('/Users/angularning/Desktop/文章数据1.xlsx');

// 遍历 sheet
sheets.forEach(function(sheet){
    console.log(sheet)
    console.log(sheet['name']);
    // 读取每行内容
    for(var rowId in sheet['data']){
        console.log(rowId);
        var row=sheet['data'][rowId];
        console.log(row);
    }
});
/*

const excelData = [
    {
        name: 'sheet1',
        data: [
            [
                'uuid',
                'title',
                'content'
            ],
            [
                '6844903767926636558',
                '一篇文章构建你的 NodeJS 知识体系',
                '1111111111'
            ],
        ]
    }
]
const buffer = xlsx.build(excelData);
fs.writeFile('/Users/angularning/Desktop/文章数据1.xlsx', buffer, function(err) {
    if (err) {
        console.log("Write failed: " + err);
        return;
    }
    console.log("写入成功");
});
*/
