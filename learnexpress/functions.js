/**
 * Created by bz on 2017/8/25.
 */
let https = require('https');
let qs = require('querystring');
module.exports = {
    bzToString: function (data) {
        return data.toString('utf-8', 0, data.length + 1);
    },
    ApiRequest: function (host, path, method, data, okCallback, errorCallback) {

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
        qs.stringify(data)
        client.write(qs.stringify(data))
    }
    client.end();
}
}