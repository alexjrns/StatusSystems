module.exports.index = function(application, req, res){
	var connection = application.config.dbConnection();
	var statusDAO = new application.app.models.StatusDAO(connection);

	statusDAO.getCountSystems(req, res)/*, function(error, result){
		res.render("home/index");
	});

	//res.render("home/index");*/
}

module.exports.status = function(application, req, res){
	var connection = application.config.dbConnection();
	var statusDAO = new application.app.models.StatusDAO(connection);

	statusDAO.getStatusSystems(req, function(error, result){
		res.render("home/status", {sistema: result});
	});
	connection.end();
}

module.exports.hours = function(application, req, res){
	var moment = require('moment');

	res.render("home/hour", {hour: moment().format("DD/MM/YYYY - HH:mm:ss")});
}

module.exports.messages = function(application, req, res){
	var connection = application.config.dbConnection();
	var statusDAO = new application.app.models.StatusDAO(connection);

	statusDAO.getStatus(function(error, result){
		res.render("home/messages", {status: result});

	});
	connection.end();
}