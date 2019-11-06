var http = require('http');

server = http.createServer(function(req, res){
	var categoria  = req.url;
	if(categoria == '/admin'){
		res.end("<html><body>Status dos sistemas - Administração</body></html>");
	}else{
		res.end("<html><body>Status dos sistemas</body></html>");
	}

});
server.listen(8099);

console.log('servidor executando na porta 8099');