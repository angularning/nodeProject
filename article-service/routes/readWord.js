var mammoth = require("mammoth");
const fs = require('fs')
mammoth.convertToHtml({path: "/Users/angularning/Desktop/234.docx"})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
        fs.promises.appendFile('/Users/angularning/Desktop/1111.html', html)
        console.log(html)
    })
    .done();
