/**
 * Created by bz on 2017/8/23.
 */
var http = require('http');
var express = require('express');
let app = express();

var logger = require('express-logger');
switch(app.get('env')){
    case 'development':
        app.use(require('morgan')('dev'))
        break;
    case 'production':
        app.use(logger({path:'./log/requests.log',interval:60*60*1000}  ))
        break;
    default :
        console.log('没有匹配上');
}

let httpobj = http.createServer(app);
httpobj.listen( 3000 , function () {
    console.log('server running in port ' +  3000  + 'env is ' + app.get('env'));
})



// http.listen(app.get('port'), function () {
//     console.log('server running in port ' + app.get('port') + 'env is' + app.get('env'));
// })


