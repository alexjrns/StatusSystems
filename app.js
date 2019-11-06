var app = require('./config/server')

app.listen(80, function(){
	console.log("Servidor sendo executado com express na porta 80");
});