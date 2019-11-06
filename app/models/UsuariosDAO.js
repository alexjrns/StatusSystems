function UsuariosDAO(connection){
	this._connection = connection;
}

UsuariosDAO.prototype.autenticar = function(usuario, application, req, res){
	var login = usuario.login;
	var password = usuario.senha;
	var sql = 'SELECT * FROM usuario WHERE usuario.des_login = ? AND usuario.val_senha = ?';

	this._connection.query(sql, [login, password], function(err, result){
		if(result[0] != undefined){
			req.session.usuariologado = result[0];
			req.session.autorizado = true;
		}

		f_autenticar_check(application, req, res);
	});
}

UsuariosDAO.prototype.autenticar_check = function(application, req, res){
	f_autenticar_check(application, req, res);
}

f_autenticar_check = function(application, req, res){
	if(req.session.autorizado){
		application.app.controllers.AdminController.admin_options(application, req, res);
	}else{
		res.render("admin/admin", {validacao:{}});
	}
}

module.exports = function(){

	return UsuariosDAO;
}