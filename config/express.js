var express = require('express');
var app = express();
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
require('dotenv').config();



app.set('view engine', 'ejs');
app.set('views','./app/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

app.use(session({
    secret: 'seu_segredo_aqui',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

load('routes',{cwd: 'app'}).then('infra').into(app);

//servir arquivos estáticos
app.use('/static', express.static('./static'));

module.exports = function(){
    return app;
}