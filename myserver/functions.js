/**
 * Created by bz on 2017/8/31.
 */
var https = require('https');
var querystring = require('querystring');

module.exports = {
    toString: function (data) {
        return data.toString('utf-8', 0, data.length + 1);
    },
    apiRequest:function (method,host,path,data,okcallback,errorcallback) {
            let option = {
                protocal:'https:',
                method:method,
                host:host,//默认是api.weibo
                path:path,
                port:null,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }
            let isGet = option.method=='GET'?true:false;
            if(isGet){
                option.path += '?';  //data {name:'value'} //?nama=value&anme=value
                    for(var index in data){
                        option.path += (index + "=" +data[index] +'&');
                    }
            }
            let client =  https.request(option,function (res) {
                    let chunks = [];
                    res.on('data',function (data) {
                        chunks.push(data);
                    })
                    res.on('end',function (data) {
                        let body = Buffer.concat(chunks)
                        okcallback(body)
                    })
            })
            if(!isGet){
                client.write(querystring.stringify(data))
            }
            client.end();
    }
}