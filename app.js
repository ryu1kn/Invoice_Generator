
var express=require("express");
var http=require('http');
var bodyParser=require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var connection = require('./config');
var mysql = require('mysql');

app.set('view engine','ejs');


//var authenticateController=require('./controllers/authenticate-controller');
//var registerController=require('./controllers/register-controller');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* route to handle login and registration */

//app.post('/api/register',registerController.register);
//app.post('/api/authenticate',authenticateController.authenticate);

app.get('/', function(req, res){
    res.render('logIn');
});

app.get('/logIn', function(req, res){
    //console.log(req.query)
  res.render('logIn');
});

app.post('/logIn', urlencodedParser, function(req, res){
    console.log(req.body.user_name);
    res.render('logIn');
    var valDB = {name: req.body.user_name,password: req.body.password};
    
    var query = connection.query('INSERT INTO test SET ?', valDB, function (error, results){    
        connection.query(mysql,function (err, result) {
            if (error){
                console.log("Error in the query");
            }
            else{
                console.log("Successfull query!");
            }    
        });
    });

    console.log(query.sql);
});

app.get('/user_registration', urlencodedParser, function(req, res){
    res.render('user_registration');
});

app.post('/user_registration', urlencodedParser, function(req, res){
    res.render('user_registration');
    var valUR = {name: req.body.user_name, email: req.body.password, password: req.body.email};
    console.log(valUR);

    var query = connection.query('INSERT INTO users SET ?', valUR, function (error, results){    
        connection.query(mysql,function (err, result) {
            if (error){
                console.log("Error in the query");
            }
            else{
                console.log("Successfull query!");
            }    
        });
    });
});

app.get('/site_details', function(req, res){
    res.render('site_details');
});

app.get('/shift_details', function(req, res){
    res.render('shift_details');
});

app.get('/income_details', function(req, res){
    res.render('income_details');
});


app.listen(8080);