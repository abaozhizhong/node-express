/**
 * Created by bz on 2017/8/23.
 */
var express = require('express');

var app = express();

app.use(function (request,respone,next) {
    console.log("经过这个中间件");
    next();
})

app.get('/a',function (req,res) {
    // res.set('CotentType','text/plain');
    console.log();
    res.send('路由a的中间件')
})

app.use('/a',function (req,res) {
    console.log('永远都不会调用的中间件');
})

app.get('/b',function (req,res,next) {
    console.log('只要有next(),且不调用render或者set来终止请求就会调用下一个中间件');
    next();
})

app.use('/b',function (req,res,next) {
    console.log('又是路由。。。/b');
    //被挂起 没有send 或者 render
    next()
})

app.use(function (req, res,next) {
    console.log('反正没有路由匹配上前面的路由就都是会用到这个中间件');
    next();
});

app.get('/b', function (req,res,next) {
    console.log('/b (part2):抛出错误');
    throw new Error('/b error part2')//抛出错误但没有往下一个中间件传递错误
});

app.use('/b',function (err,req,res,next) {
    console.log('/b(part3):传递错误到下一个中间件');
    next(err);
})

app.get('/c',function (req,res,next) {
    console.log('抛出错误C');
    // throw new Error('c 失败') //相当于跳出这个函数 执行下一个中间件
    next()
})

app.get('/c',function (err,req,res,next) {
    console.log('检测错误,这个错误是来自上一个中间件:');
    // console.log(err);
    next();
})

app.use(function (err,req,res,next) {
    console.log('检测到错误:'+err);
    res.status(500);
    res.send('500-server-error')
})

app.use(function (req,res) {
    console.log('找不到该路由');
    res.status(404)
    res.send('找不到该路由')
})

app.listen(3000,function () {
    console.log('server running in port 3000');
})