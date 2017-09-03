/**
 * Created by bz on 2017/8/24.
 */
let fs = require('fs');


// fs.mkdirSync('temp');
fs.readFile('./test.txt','utf8',(err,data) => {
    if(err) throw err;
    console.log(data);
})

// var buffer = new Buffer(['I LOVE YOU']);  废弃的方法
// console.log( buffer.toString('utf-8') );
let buffer = Buffer.from([0x49,0x20,0x4c,0x4f,0x56,0x45,0x20,0x59,0x4f,0x55,]);
console.log(buffer.toString());

// E288A9
//5F
//E288A9


//写入缓冲区
buffer.write('you   ',2,1,'utf8')
console.log(buffer.toString());

let bf0 = new Buffer(16);
bf0.write('hey');
let bf1= new Buffer(9);
bf1.write(' Abaozhi');
bf1.copy(bf0,3,0,bf1.length-1);
console.log( bf0.toString() );


