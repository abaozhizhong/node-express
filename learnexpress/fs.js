/**
 * Created by bz on 2017/8/24.
 */
let fs = require('fs');


// fs.mkdirSync('temp');
fs.readFile('./test.txt','utf8',(err,data) => {
    if(err) throw err;
    console.log(data);
})


