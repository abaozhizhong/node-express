let express = require('express');
let app = express();

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
app.get('/static',function (req,res ) {
    res.render('home');
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

app.use((err,req,res,next)=> {
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});