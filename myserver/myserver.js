/**
 * Created by bz on 2017/8/31.
 */
let express = require('express');
let x = require('./functions');
let CONFIG = require('./config');
let app = express();
app.use(express.static('public'));

let success = {

}


//获取授权code
app.get('/authorize',function (req,res) {
    res.redirect('https://api.weibo.com/oauth2/authorize?'+'client_id='+CONFIG.APPKEY+'&redirect_uri='+CONFIG.REDERECTURL+"&forcelogin="+'false')
})

//获取token
app.get('/token',function (req,res) {
    let data = {
        client_id:CONFIG.APPKEY,
        client_secret:CONFIG.APPSECRET,
        grant_type:'authorization_code',
        code:req.query.code,
        redirect_uri:CONFIG.REDERECTURL
    };
    console.log(data);
    x.apiRequest('POST',CONFIG.HOST,CONFIG.TOKEN,data,function (data) {
        res.json(x.toString(data))
    })
})

//获取我关注用户的微博
app.get('/hometimeline',function (req,res) {
    let data = {
        access_token:req.query.access_token,
    }
    x.apiRequest('GET',CONFIG.HOST,CONFIG.HOMETIMELINE,data,function (data) {
        res.json(x.toString(data))
    })
})

//读取个人微博内容
app.get('/usertimeline',function (req,res) {
    let data = {
        access_token:req.query.access_token,
        // uid:req.query.uid
    }
    x.apiRequest('GET',CONFIG.HOST,CONFIG.USERTIMELINE,data,function (data) {
        res.json(x.toString(data))
    })
})

//
app.get('/show',function (req,res) {//Permission Denied 20112	：	由于作者隐私设置，你没有权限查看此微博
    let data = {
        access_token:req.query.access_token,
        id:req.query.id
    }
    x.apiRequest('GET',CONFIG.HOST,CONFIG.SHOW,data,function (data) {
        res.json(x.toString(data))
    })
})


app.get('/go',function (req,res) {
    let data = {
        access_token:req.query.access_token,
        uid:req.query.uid,
        id:req.query.id
    }
    x.apiRequest('GET',CONFIG.HOST,CONFIG.GO,data,function (data) {
        res.json(x.toString(data))
    })
})


app.listen(3000,function (res) {
    console.log('myserver running in port 3000');
})