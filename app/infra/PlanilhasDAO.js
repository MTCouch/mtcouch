function PlanilhasDAO(connection) {
    this._connection = connection;
}

PlanilhasDAO.prototype.salvar = function (planilha, callback) {
    this._connection.query('INSERT INTO planilhas (usuario_id, nome, descricao) VALUES (?, ?, ?)',
    [planilha.usuario_id, planilha.nome_treino, planilha.descricao],  callback);

}

module.exports = function () {
    return PlanilhasDAO;
}