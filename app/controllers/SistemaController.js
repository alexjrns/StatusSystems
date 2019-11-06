module.exports.formulario_inclusao_system = function(application, req, res){
	res.render("admin/form_add_system", {validacao : {}, system : {}});
}

module.exports.save_system = function(application, req, res){
	var system = req.body;

	req.assert('val_codigosistema', 'O Código do Sistema é obrigatório').notEmpty();
	req.assert('des_nomesistema', 'O Nome do Sistema é obrigatório').notEmpty();

	var erros = req.validationErrors();
	if(erros){
		res.render("admin/form_add_system", {validacao : erros, system : system});
		return;
	}

	var connection = application.config.dbConnection();
	var systemDAO = new application.app.models.SistemaDAO(connection);

	systemDAO.saveSystem(system, function(error, result){
		res.redirect("/home");

	});
	connection.end();
}
