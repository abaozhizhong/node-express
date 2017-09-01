let express = require('express');
let app = express();
var body_parser = require('body-parser');
// var Formidable = require('formidable');
let public_path = '/static';
let fortnues = require('./lib/fortnues');
let qs = require('querystring')
app.disable('x-powered-by');//屏蔽响应头中存在express的信息
app.use(body_parser())//POST中间件

var Bz = require('./functions');

app.use('/static', express.static('public'))

app.set('port', process.env.PORT || 3000);

let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});//一堆模板引擎的东西
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
let goods = [
    {
        name: "我就是商品",
        id: 9527,
        price: "1000"
    },
    {
        name: "我就是商品",
        id: 9526,
        price: "1000"
    },
]


//https://api.weibo.com/oauth2/authorize
var https = require('https')
var http = require('http')
//渲染纯文本
app.get(public_path + '/test', function (requset, respone) {
    respone.render('test')
})


app.post(public_path + '/posttest', function (req, res) {
    let mydata = {
        client_id:1742776748,
        client_secret:'ebb6d86f6bac78187a4f19f62bb64c2f',
        grant_type:'authorization_code',
        code:req.body.code,
        redirect_uri:'http://192.168.17.69:3000/static/test'
    }
    let myrq =  https.request({
        protocol: 'https:',
        method: 'POST',
        port: null,
        host: 'api.weibo.com',
        path: '/oauth2/access_token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }, function (innerres) {
        innerres.on('data', function (data) {
            let temp = JSON.parse(data);
            Bz.bzApirequest('api.weibo.com','/2/users/show.json','GET',{access_token:temp.access_token,uid:temp.uid},function (data) {
                console.log('成功拿到用户数据:',Bz.bzToString(data));
            })
        }).on('end', function () {
            console.log('停止响应');
            res.json({'message': 'success'})
        });

    });
    myrq.write(qs.stringify(mydata));
    myrq.end();
    // Bz.ApiRequest('api.weibo.com','/oauth2/access_token','POST',mydata,function (a,b) {
    //     console.log(a);
    //     console.log(b);
    // },function (err) {
    //     console.log(err);
    // })


})


app.get(public_path + '/index', function (request, respone) {
    respone.render('index');
    //模拟
    // let data = { client_id:'1742776748',redirect_uri:'http://192.168.17.69:3000/test'  }
    // let req =  https.request({protocal:'https:', host:'api.weibo.com',method:'GET',path:'/oauth2/authorize',port:null},function (res) {
    //     res.on('data',function (data) {
    //         console.log(Bz.bzToString(data));
    //     })
    // })
    // req.write(qs.stringify(data));
    // req.on('end',function () {
    //     console.log('亲自请求');
    // })
    //https://api.weibo.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REGISTERED_REDIRECT_URI
    respone.redirect('https://api.weibo.com/oauth2/authorize?client_id=1742776748&response_type=code&redirect_uri=http://192.168.17.69:3000/static/test&forcelogin=true')
})


//提个一个个api
app.get(public_path + '/api', function (request, respone) {
    let a = {
        age: 19,
        name: "abaozhi"
    }
    console.log(typeof request.query.blean); //返回来的数据是字符窜类型
    if (Boolean(request.query.blean) == true) {
        respone.json(a)
    }
})

//更行商品good
app.put(public_path + '/put/:id', function (request, respone) {
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
app.get(public_path, function (req, res) {
    res.render('home');
})

app.get(public_path + '/about', (req, res) => {
    let t = fortnues.getFortunes();
    res.render('about', {a: t});
})

app.get(public_path + '/header', function (req, res) {
    res.set('Content-Type', 'text/plain');
    // console.log(res);
    let s = '';
    for (var i in req.headers) {
        s += (i + ":" + req.headers[i] + '\n');
    }
    console.log(req.headers);
    res.send(s)
})

app.get(public_path + '/query', function (request, res) {
    //request.query  选中字符串参数
    console.log(request.query);
    res.set('Content-Type', 'text/plain');
    res.send(JSON.stringify(request.query));
})

app.get(public_path + '/greeting', function (request, respone) {
    var obj = {
        message: 'welcome',
        style: request.query.style
    }
    respone.render("greeting", {a: JSON.stringify(obj)}); //往页面传数据
})

//使用定制布局渲染
app.get(public_path + '/layout', function (request, respone) {
    console.log('LAYOUT');
    respone.render('a', {layout: 'custom'});
})


//从重定向redirect
app.get(public_path + '/redirect', function (request, respone) {
    respone.redirect(200, public_path + '/test')
})

app.get(public_path + "/error", function (request, res) {
    res.status(500);
    res.render('error');
})

app.get(public_path + '/form', function (request, respone) {
    respone.render('form');
})

var cookieSecret = require('./credentials');

app.locals.globalValue = 'globalValue' //

app.use(require('express-session')({secret: 'stringthings'}));

app.use(function (request, respone, next) {
    request.session.flash = {
        type: 'type',
        intro: '介绍',
        message: '简介'
    }
    next();
})

app.use(function (request, respone, next) {
    respone.locals.flash = request.session.flash;
    respone.locals.test = 'testestestest';
    console.log(app.locals.globalValue);
    next();
})

app.get(public_path + "/message", function (request, respone) {
    console.log(respone.locals.flash);
    respone.render('message');
})

console.log(app.locals);

app.post(public_path + "/post", function (request, respone) {
    console.log("表单提交");
    console.log(request.query);
    if (request.xhr == true) {
        console.log("this  is a ajax request");
    }
    console.log('body.v1:' + request.body.v1);
    console.log('body.v3:' + request.body.v3);
    console.log('body.v2:' + request.body.v2);
})

app.get(public_path + '/postimg', function (request, respone) {
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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

//添加404
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});


app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});


//
// //temp
// function asyncFunction(data,callback) {
//     console.log('等等会有回调函数:',data);
//     process.nextTick(function () {
//         callback(520)
//     })
// }
// asyncFunction('是的',function (a) {
//     console.log('传递的参数是：'+a);
// });console.log('我比callback更加快？？');
//
// function myFun(x,y) {
//     console.log('x*y equal to '+x*y);
// }
//
// setTimeout(myFun,5000,10,10)
//
// //TCP服务器端
// var net = require('net');
// var server = net.createServer(function (conn) {
//     console.log('connected');
//     conn.on('data',function (data) {
//         console.log(data + 'from' + conn.remoteAddress +":"+ conn.remotePort);
//     //    conn.write('repeating'+data);
//     })
//     conn.on('close',function () {
//         console.log('client closed connection');
//     })
// }).listen(8124)
//
// //TCP客户端
// var net  = require('net')
// let client = new net.Socket();
// client.setEncoding('utf8');
// client.connect('8124','localhost',function () {
//     console.log('connneted to server');
//     client.write('whio needs a browser to communicate?');
// })
// process.stdin.resume();
// process.stdin.on('data',function (data) {
//     client.write(data);
// })
// client.on('data',function (data) {
//     console.log('client recevie data from stdin:'+data);
// })
//
// //'aaaaa'
// process.stdin.resume();
// process.stdin.pipe(process.stdout,{end:false});
//
// let readline  = require('readline')
// var interface = readline.createInterface(process.stdin,process.stdout,null);
// inerface.question('What is the meaning of life? ',function(answer){
//     console.log('About the meaning of life,you said'+  answer);
//     interface.setPrompt('>>');
//     inerface.prompt();
// })
// function closeInterface(){
//     console.log('leaveing  interface...');
//     process.exit();
// }
// interface.on('line '.function(cmd){
//     if(cmd.trim()=='.leave'){
//         closeInterface();
//         return;
//     }else{
//         console.log('repeating command:'+cmd);
//     }
//     interface.setPrompt(">>");
//     interface.prompt();
// })
// interface.on('close',function(){
//     closeInterface();
// })