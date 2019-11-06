
module.exports = function(application){

	application.get('/', function(req, res){
		application.app.controllers.HomeController.index(application, req, res);

	});	


	application.get('/status', function(req, res){
		application.app.controllers.HomeController.status(application, req, res);

	});	

	application.get('/messages', function(req, res){
		application.app.controllers.HomeController.messages(application, req, res);
	});	

	application.get('/hour', function(req, res){
		application.app.controllers.HomeController.hours(application, req, res);
	});	
};
