function UsuariosDAO(connection) {
    this._connection = connection;
}

UsuariosDAO.prototype.buscarPorEmail = function (email, callback) {
    this._connection.query('select * from usuarios where email = ?',
        [email], callback);
}

UsuariosDAO.prototype.salvar = function (usuario, callback) {
    this._connection.query('insert into usuarios set ?',
        usuario, callback);
}

UsuariosDAO.prototype.viewFichas = function (request, callback) {
    this._connection.query('select * from fichas where usuario_id = ?',
        [request.session.usuario.id], callback);
}

UsuariosDAO.prototype.selectFicha = function (fichaId, callback) {
    this._connection.query('select * from exercicios where ficha_id = ?',
        [fichaId], callback);
}
module.exports = function () {
    return UsuariosDAO;
}