function PlanilhasDAO(connection) {
    this._connection = connection;
}

PlanilhasDAO.prototype.salvar = function (planilha, userId, callback) {
    this._connection.query('INSERT INTO planilhas (usuario_id, nome, descricao) VALUES (?, ?, ?)',
    [userId, planilha.nome_treino, planilha.descricao],  callback);

}

module.exports = function () {
    return PlanilhasDAO;
}  