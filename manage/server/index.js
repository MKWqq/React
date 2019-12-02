/** node启动文件 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const path=require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.raw({ inflate: true, limit: '10000kb', type: 'multipart/form-data' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { maxage: '12h' }));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');//预检请求使用
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');//预检请求使用
    next();
});

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'))
});

// 处理系统级异常
process.on('uncaughtException', function (err) {
    Logger.error('[tm:' + utils.getNowFormatDate() + ']', err);

    // 系统退出
    // process.exit(1);
});