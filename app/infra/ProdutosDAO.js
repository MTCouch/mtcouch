function ProdutosDAO(connection){
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback){
    this._connection.query('select * from produtos', callback);
}

ProdutosDAO.prototype.salva = function(produto, callback){
    this._connection.query('insert into produtos set ?', produto, callback);
}

ProdutosDAO.prototype.apagar = function(id, callback){
    this._connection.query('delete from produtos where id = ?', id, callback);
}

ProdutosDAO.prototype.buscar = function(id, callback){
    this._connection.query('select * from produtos where id = ?', id, callback);
}

ProdutosDAO.prototype.salvaalt = function(produto, callback){
    this._connection.query('update produtos set ? where id = ?', 
        [produto, produto.id], callback);
}

module.exports = function(){
    return ProdutosDAO;
}