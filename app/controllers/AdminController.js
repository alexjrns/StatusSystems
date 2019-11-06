module.exports.formulario_inclusao_status = function(application, req, res){
	res.render("admin/form_add_status", {validacao : {}, status : {}});
}

module.exports.admin = function(application, req, res){
	res.render("admin/admin", {validacao : {}});
}

module.exports.config_status = function(application, req, res){
	var connection = application.config.dbConnection();
	var StatusDAO = new application.app.models.StatusDAO(connection);

	StatusDAO.getSystems(function(error, result){
		res.render("admin/form_config_status", {systems : result});
	});
	connection.end();
}

module.exports.disabled_message = function(application, req, res){
	var connection = application.config.dbConnection();
	var StatusDAO = new application.app.models.StatusDAO(connection);

	StatusDAO.getMessages(function(error, result){
		res.render("admin/form_disabled_messages", {messages : result});
	});
	connection.end();
}

module.exports.admin_options = function(application, req, res){
	res.render("admin/admin_options", {validacao : {}});
}

module.exports.autenticar = function(application, req, res){
	var dadosForm = req.body;

	req.assert('login', 'O campo LOGIN não pode ser vazio').notEmpty();
	req.assert('senha', 'O campo SENHA não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render("admin/admin", {validacao : erros});
		return;
	}

	var connection = application.config.dbConnection();
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
	UsuariosDAO.autenticar(dadosForm, application, req, res);
	connection.end();
}

module.exports.autenticar_check = function(application, req, res){
	var connection = application.config.dbConnection();
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
	UsuariosDAO.autenticar_check(application, req, res);
	connection.end();
}

module.exports.save_status = function(application, req, res){
	var status = req.body;

	var connection = application.config.dbConnection();
	var StatusDAO = new application.app.models.StatusDAO(connection);
	StatusDAO.saveStatus(status, function(error, result){
		res.redirect("/");
	});
	connection.end();
}

module.exports.save_disabled_messages = function(application, req, res){
	var messages = req.body;

	var connection = application.config.dbConnection();
	var StatusDAO = new application.app.models.StatusDAO(connection);
	StatusDAO.saveDisabledMessages(messages, function(error, result){
		res.redirect("/");
	});
	connection.end();
}

module.exports.salvao_status = function(application, req, res){
	var status = req.body;

	req.assert('titulo', 'O Título é obrigatório').notEmpty();

	var erros = req.validationErrors();
	if(erros){
		res.render("admin/form_add_status", {validacao : erros, status : status});
		return;
	}

	var connection = application.config.dbConnection();
	var statusDAO = new application.app.models.StatusDAO(connection);

	statusDAO.salvaoStatus(status, function(error, result){
		res.redirect("/");

	});
	connection.end();
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(err){
		res.render("admin/admin", {validacao:{}})
	});
}