var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cbRouter = require('./router/cb.js');

process.on('uncaughtException', function(err) {
    console.log(err.stack);
});

var app = express(); //创建express实例
app.use(bodyParser.json()); //解析json
app.use(bodyParser.urlencoded({
    extended: false
}));


//静态文件路由
app.use(express.static(path.join(__dirname, '/web/html/')));
app.use(express.static(path.join(__dirname, '/web/css/')));
app.use(express.static(path.join(__dirname, '/web/fonts/')));
app.use(express.static(path.join(__dirname, '/web/js/')));
app.use(express.static(path.join(__dirname, '/web/image/')));



//api路由
app.use('/cb', cbRouter);


app.listen(4000); //设置监听http请求的端口号
console.log("server started on port 4000");
