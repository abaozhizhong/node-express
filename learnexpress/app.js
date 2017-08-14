// let express = require('express');
// let app = express();
//
// app.set('port',process.env.PORT||3000);
//
//
// let handlebars = require('express3-handlebars').create({defaultLayout:'main'});
// app.engine('headlebars',handlebars.engine);
// app.set('view engine','headlebars');
//
// //
// // app.get('/',function (req,res) {
// //     res.type('text/plain');
// //     res.send('这是/')
// // })
// //
// // app.get('/about',function(req,res){
// //     res.type('text/plain');
// //     res.send('这是/about')
// // })
// //
// // app.use(function (req,res) {
// //     res.type('text/plain');
// //     res.status(404);
// //     res.send('404-Not Found');
// // })
// //
// // app.use(function (err,req,res,next) {
// //     console.log(err.stack);
// //     res.type('text/plain');
// //     res.status(500);
// //     res.send('500-Server Error')
// // })
//
//
// // 使用handlebars的新路由
//     app.get('/',function (req,res ) {
//     res.render('home');
// })
//
// // app.get('/about',(req,res)=>{
// //     res.render('about');
// // })
// //
// // app.use((req, res, next) => {
// //     res.status(404);
// //     res.render('404');
// // });
// //
// // app.use((err,req,res,next)=> {
// //     res.status(500);
// //     res.render('500');
// // }),
//
//
// app.listen(app.get('port'),function(){
//     console.log('server is running in Http://localhost:'+app.get('port')+' press ctrl + c to stop it')
// })
//
//
//


var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
    .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// app.use(express.static(__dirname + '/public'));
//
// var fortuneCookies = [
//     "Conquer your fears or they will conquer you.",
//     "Rivers need springs.",
//     "Do not fear what you don't know.",
//     "You will have a pleasant surprise.",
//     "Whenever possible, keep it simple.",
// ];

app.get('/', function(req, res) {
    res.render('home');
});
// app.get('/about', function(req,res){
//     var randomFortune =
//         fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
//     res.render('about', { fortune: randomFortune });
// });

// 404 catch-all handler (middleware)
// app.use(function(req, res, next){
//     res.status(404);
//     res.render('404');
// });

// 500 error handler (middleware)
// app.use(function(err, req, res, next){
//     console.error(err.stack);
//     res.status(500);
//     res.render('500');
// });

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});