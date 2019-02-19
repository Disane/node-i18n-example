// load modules
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const i18n = require('i18n');
const ejs = require('ejs');
      
const app = express();

app.use(cookieParser("i18n_demo"));

app.use(session({
    secret: "i18n_demo",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

i18n.configure({

    //define how many languages we would support in our application
    locales:['en', 'de'],
    
    //define the path to language json files, default is /locales
    directory: __dirname + '/locales',
    
    //define the default language
    defaultLocale: 'en',
    
    // define a custom cookie name to parse locale settings from 
    // For some reason, it doesn't work with cookies
    //cookie: 'i18n',
    // , but the ?lang=[language] parameter works
    queryParameter: 'lang'
});
    
app.use(cookieParser("i18n_demo"));

app.use(session({
    secret: "i18n_demo",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

//init i18n after cookie-parser
app.use(i18n.init);

// Body parser midlleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// use EJS render engine
app.set('view engine', 'ejs');

app.get('/de', function (req, res) {
    res.cookie('i18n', 'de');
    res.redirect('/')
});

app.get('/en', function (req, res) {
    res.cookie('i18n', 'en');
    res.redirect('/')
});

app.get('/', function (req, res) {
    if(req.cookies.i18n == undefined){
         res.setLocale('en')
     }
     else{
         res.setLocale(req.cookies.i18n)
    }
    res.render('index', {i18n: res});
});

app.listen('3000');