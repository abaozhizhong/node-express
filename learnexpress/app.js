let express = require('express');
let app = express();
let public_path = '/static';
// let public_path = '';
let fortnues = require('./lib/fortnues');

app.disable('x-powered-by');

app.use('/static',express.static('public'))

app.set('port',process.env.PORT||3000);

let handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');


//
// app.get('/',function (req,res) {
//     res.type('text/plain');
//     res.send('这是/')
// })

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
app.get(public_path+'/layout',function (request,respone) {
        console.log('LAYOUT');
        respone.render('a',{layout:'custom'});
})

//渲染纯文本
app.get(public_path+'/test',function (requset,respone) {
    respone.set('Content-Type','text/plain');
    respone.send('test')
})

//

app.get(public_path+"/error",function (request,res) {
    res.status(500);
    res.render('error');
})

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

