let express = require('express');
let app = express();
var body_parser = require('body-parser');
// var Formidable = require('formidable');
let public_path = '/static';
let fortnues = require('./lib/fortnues');
app.disable('x-powered-by');//屏蔽响应头中存在express的信息
app.use(body_parser())//POST中间件

app.use('/static',express.static('public'))

app.set('port',process.env.PORT||3000);

let handlebars = require('express3-handlebars').create({defaultLayout:'main'});//一堆模板引擎的东西
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
let goods = [
    {
        name:"我就是商品",
        id:9527,
        price:"1000"
    },
    {
        name:"我就是商品",
        id:9526,
        price:"1000"
    },
]

//提个一个个api
app.get(public_path+'/api',function (request,respone) {
    let a = {
        age:19,
        name:"abaozhi"
    }
    console.log(typeof request.query.blean); //返回来的数据是字符窜类型
    if(Boolean(request.query.blean) == true){
        respone.json(a)
    }
})

//更行商品good
app.put(public_path+'/put/:id',function(request,respone){
        console.log(respone.params);
})

// app.get('/about',function(req,res){
//     res.type('text/plain');
//     res.send('这是/about')
// })
//
// app.use(function (req,res) {
//     res.type('text/plain');
//     res.status(404);
//     res.send('404-Not Found');
// })
//
// app.use(function (err,req,res,next) {
//     console.log(err.stack);
//     res.type('text/plain');
//     res.status(500);
//     res.send('500-Server Error')
// })
// 使用handlebars的新路由
app.get(public_path,function (req,res ) {
    res.render('home');
})

app.get(public_path+'/about',(req,res)=>{
    let t = fortnues.getFortunes();
    res.render('about',{a:t});
})

app.get(public_path+'/header',function (req,res) {
    res.set('Content-Type','text/plain');
    // console.log(res);
    let s = '';
    for (var i in req.headers){
        s += (i+":"+req.headers[i]+'\n');
    }
    console.log(req.headers);
    res.send(s)
})

app.get(public_path+'/query',function (request,res) {
    //request.query  选中字符串参数
    console.log(request.query);
    res.set('Content-Type','text/plain');
    res.send(JSON.stringify(request.query));
})

app.get(public_path+'/greeting',function (request,respone) {
    var obj = {
        message:'welcome',
        style:request.query.style
    }
    respone.render("greeting",{a:JSON.stringify(obj)}); //往页面传数据
})

//使用定制布局渲染
app.get(public_path+'/layout',function (request,respone)    {
        console.log('LAYOUT');
        respone.render('a',{layout:'custom'});
})

//渲染纯文本
app.get(public_path+'/test',function (requset,respone) {
    respone.set('Content-Type','text/plain');
    respone.send('testestestestestestestest')
})

//从重定向redirect
app.get(public_path+'/redirect',function (request,respone) {
    respone.redirect(200,public_path+'/test')
})

app.get(public_path+"/error",function (request,res) {
    res.status(500);
    res.render('error');
})

app.get(public_path+'/form',function (request,respone) {
    respone.render('form');
})

var cookieSecret = require('./credentials');

app.locals.globalValue = 'globalValue' //

app.use(require('express-session')({secret:'stringthings'}));

app.use(function (request,respone,next) {
    request.session.flash = {
        type:'type',
        intro:'介绍',
        message:'简介'
    }
    next();
})

app.use(function (request,respone,next) {
    respone.locals.flash = request.session.flash;
    respone.locals.test = 'testestestest';
    console.log(app.locals.globalValue);
    next();
})

app.get(public_path+"/message",function (request,respone) {
    console.log(respone.locals.flash);
    respone.render('message');
})

console.log(app.locals);

app.post(public_path+"/post",function (request,respone) {
    console.log("表单提交");
    console.log(request.query);
    if(request.xhr==true){
        console.log("this  is a ajax request");
    }
    console.log('body.v1:'+request.body.v1);
    console.log('body.v3:'+request.body.v3);
    console.log('body.v2:'+request.body.v2);
})

app.get(public_path+'/postimg',function (request,respone) {
    respone.render("postimg")
})
// app.post(public_path+'/postimg',function (request,respone) {
//     // respone.status(200);
//     // console.log("有图片上传");
//     // respone.json({
//     //     message:'success'
//     // })
//     let form = new Formidable.IncomingForm();
//     form.parse(request,function(err,fields,files){
//         if(err){console.log('上传失败');}
//         console.log("received fielsd:");
//         console.log(fields);
//         console.log("receives files:");
//         console.log(files);
//         console.log("跳转链接到。。。。上传成功的页面");
//     })
// })

// import bz  from  './defalut.js';
// console.log(bz);

app.use((err,req,res,next)=> {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

//添加404
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});


app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});

