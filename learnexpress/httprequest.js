/**
 * Created by bz on 2017/8/24.
 */
var app = require('express')();
var http = require('http');
var https  = require('https');
var  URL   = require('url');
var myUrl = URL.parse('http://easy-mock.com/mock/599ed352059b9c566dcf4f84/test/api');

// http.get('http://easy-mock.com/mock/599ed352059b9c566dcf4f84/test/api',function (req,res) {
//     req.on('data',function (data) {
//         console.log(data.toString('utf-8',0,data.length-1));
//     })
//     req.on('end',function (data) {
//         console.log(' on end');
//     })
// })


var option = {
    // protocol: 'http:',
    hostname: 'easy-mock.com',
    path: '/mock/599ed352059b9c566dcf4f84/test/api',
    method: 'GET',
    // port: null,
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
    }
}
const req = http.request(option, function (res) {
        console.log('有响应');
        res.on('data', (data) => {
            console.log( data.toString('utf-8',0,data.length-1) );
            // console.log(`响应主体: ${chunk}`);
        });
        res.on('end', () => {
            console.log('请求结束');
        });
    })
req.end()



function ApiRequest(host, path, method, data, okCallback, errorCallback) {

    console.log('reslove request => ' + method + path);

    var ContentType = 'application/x-www-form-urlencoded'
    if (data != null) {
        console.log('request data => ' + JSON.stringify(data))
        if (data.pic != null) {
            ContentType = 'multipart/form-data'
        }
    }

    let option = {
        hostname: host,
        method: method,
        path: path,
        port: null,
        headers: {
            'Content-Type': ContentType,
        }
    }

    const client = https.request(option, (res) => {
        res.on('error', (err) => {
            console.log('err =>' + err);
            errorCallback(err)
        })

        let chunks = [];
        res.on('data', (chunk) => {
            chunks.push(chunk)
        })

        res.on("end", function () {
            let body = Buffer.concat(chunks)
            let response = body.toString()
            console.log('response end data =>' + response)
            res.setEncoding('utf8')
            okCallback(response, res.statusCode)
        });


    })
    if (data != null) {
        client.write(qs.stringify(data))
    }
    client.end();
}
// ApiRequest('easy-mock.com','/mock/599ed352059b9c566dcf4f84/test/api','get',null,function (res,code) {
//     console.log(res);
//     console.log(code);
// },function (data) {
//     console.log('error');
// })
// var client =  https.request(option,function (res) {
//         console.log(res);
//         // console.log('status',res.statusCode);
//         // console.log('header',res.headers);
//         let chunks  = [];
//         res.on('data',function (a) {
//             chunks.push(a);
//         })
//         res.on('end',function () {
//             console.log(chunks);
//             // let body = Buffer.concat(chunks)
//             // let response = body.toString()
//             // console.log('response end data =>' + response)
//             // res.setEncoding('utf8')
//             // test(response)
//         })
// })
// client.end();


// function myAjax(type,url,data,callback) {
//     $.ajax({
//         type:type,
//         url:url,
//         data:data,
//         headers:{
//             'Host':'api-m.mtime.cn'
//         },
//         success:function (data) {
//             callback(data)
//         }
//     })
// }

//https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=290
// myAjax('get','https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api',{locationId:290},function () {
//     console.log(arguments);
// })

// http.get('http://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=290',function (res) {
//     res.on('data',function (data) {
//         console.log(data);
//         console.log(data.toString('utf-8',0,data.length-1));
//     })
//     res.on('end',function () {
//         console.log('停止请求');
//     })
// })

http.get('http://www.senssun.com/',function (res) {
    res.on('data',function (data) {
        console.log(bzToString(data));
    })
    res.on('end',function () {
        console.log('sensesn 请求结束');
    })
})