module.exports = function(application){
	application.get('/admin', function(req, res){
		application.app.controllers.AdminController.admin(application, req, res);
	});

	application.get('/admin/addstatus', function(req, res){
		if(req.session.autorizado){
			application.app.controllers.AdminController.formulario_inclusao_status(application, req, res);
		}else{
			application.app.controllers.AdminController.autenticar(application, req, res);
		}
	});

	application.post('/system/savesystem', function(req, res){
		application.app.controllers.SistemaController.save_system(application, req, res);
	});

	application.post('/status/savemessagestatus', function(req, res){
		application.app.controllers.AdminController.salvao_status(application, req, res);

	});


	application.post('/home/savestatus', function(req, res){
		application.app.controllers.AdminController.save_status(application, req, res);

	});

	application.post('/home/savedisabledmessages', function(req, res){
		application.app.controllers.AdminController.save_disabled_messages(application, req, res);
	});

	application.post('/home', function(req, res){
		application.app.controllers.AdminController.autenticar(application, req, res);
	});

	application.get('/home/configstatus', function(req, res){
		if(req.session.autorizado){
			application.app.controllers.AdminController.config_status(application, req, res);
		}else{
			application.app.controllers.AdminController.autenticar(application, req, res);
		}
	});

	application.get('/home/disabledmessage', function(req, res){
		if(req.session.autorizado){
			application.app.controllers.AdminController.disabled_message(application, req, res);
		}else{
			application.app.controllers.AdminController.autenticar(application, req, res);
		}
	});

	application.get('/home/addmessage', function(req, res){
		if(req.session.autorizado){
			application.app.controllers.AdminController.formulario_inclusao_status(application, req, res);
		}else{
			application.app.controllers.AdminController.autenticar(application, req, res);
		}
	});

	application.get('/home/addsystem', function(req, res){
		if(req.session.autorizado){
			application.app.controllers.SistemaController.formulario_inclusao_system(application, req, res);
		}else{
			application.app.controllers.AdminController.autenticar(application, req, res);
		}
	});

	application.get('/home', function(req, res){
		application.app.controllers.AdminController.autenticar_check(application, req, res);
	});

	application.get('/sair', function(req, res){
		application.app.controllers.AdminController.sair(application, req, res);
	});
};