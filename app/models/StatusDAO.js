function StatusDAO(connection){
	this._connection = connection;
};

StatusDAO.prototype.getStatus = function(callback){
	this._connection.query('select * from mensagens where (opt_ativo is true) order by data_cadastro DESC limit 4', callback);
};

StatusDAO.prototype.getCountSystems = function(req, res, callback){
	this._connection.query("select count(distinct(des_nomesistema)) as cont from sistema", function (err, result, fields) {
    if (err) throw err;
	req.session.contsys = result[0].cont;
	res.render("home/index");
  	});
};

StatusDAO.prototype.getStatusSystems = function(req, callback){
	var cont = req.session.contsys;
	this._connection.query('select * from status_sistema order by dat_atualizacao DESC limit ?', cont, callback);
};

StatusDAO.prototype.getSystems = function(callback){
	this._connection.query('select * from sistema', callback);
};

StatusDAO.prototype.getMessages = function(callback){
	this._connection.query('select * from mensagens where (opt_ativo is true) order by data_cadastro DESC', callback);
};

StatusDAO.prototype.saveStatus = function(status, callback){
 	var values  = [];

	for (var propriedade in status) {
		if (status.hasOwnProperty(propriedade)) {
			if (typeof status[propriedade] == "string") {
				var opt = status[propriedade];
		  		values.push([propriedade, opt]);
			} 
		}
	}
	console.log(values);
	var query = "INSERT INTO `status_sistema` (`des_nomesistema`, `opt_ativo`) VALUES  ?;";

	this._connection.query(query, [values], callback);
};

StatusDAO.prototype.saveDisabledMessages = function(messages, callback){
 	var values  = [];

	for (var propriedade in messages) {
		if (messages.hasOwnProperty(propriedade)) {
			if (typeof messages[propriedade] == "string") {
		  		values.push([propriedade]);
			} 
		}
	}
	console.log(values);
	var query = "UPDATE mensagens SET opt_ativo = 0 WHERE mensagens.id_sistema IN (?)";

	this._connection.query(query, [values], callback);
};

StatusDAO.prototype.salvaoStatus = function(status, callback){
	this._connection.query('insert into mensagens set ? ', status, callback);
};

module.exports = function(){

	return StatusDAO;
};