var express = require('express'); //Framework sobre o NODE
var consign = require('consign'); //Framework que escaneia arquivos e insere-as na aplicação automáticamente
var bodyParser = require('body-parser'); //Midleware para receber os dados dos formulários via POST em JSON
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var app = express();
app.set('view engine', 'ejs'); //setando os views para o modo ejs
app.set('views', './app/views'); //indicando o diretório dos views

app.use(express.static('./app/public/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(expressSession({
	secret:'yaysdgyaugsdua',
	resave: false,
	saveUninitialized: false
	}));

consign()
	.include('app/routes') //Escaneando automaticamente os arquivos de rotas e inserindo-os na aplicação
	.then('config/dbConnection.js') //Importando a conexão com o banco
	.then('app/models') //Importando as models da aplicacao
	.then('app/controllers')
	.into(app); 

module.exports = app;