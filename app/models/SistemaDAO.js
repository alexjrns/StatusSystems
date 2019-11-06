function SistemaDAO(connection){
	this._connection = connection;
};

SistemaDAO.prototype.getSystems = function(callback){
	this._connection.query('select * from sistema', callback);
};

SistemaDAO.prototype.saveSystem = function(sistema, callback){
	this._connection.query('insert into sistema set ? ', sistema, callback);
};

module.exports = function(){

	return SistemaDAO;
};