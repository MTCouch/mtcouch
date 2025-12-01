function PlanilhasDAO(connection) {
    this._connection = connection;
}

PlanilhasDAO.prototype.salvar = function (planilha, userId, callback) {
    this._connection.query('INSERT INTO fichas (usuario_id, nome, descricao, dias) VALUES (?, ?, ?, ?)',
    [userId, planilha.nome_treino, planilha.descricao, planilha.dias],  callback);

}

PlanilhasDAO.prototype.buscarId = function (userId, callback) {
    this._connection.query('SELECT id FROM fichas WHERE id = ?;',
        [userId], callback);
};

PlanilhasDAO.prototype.salvarFicha = function (planilha, planilhaId, dias, callback) {
    for (let dia = 1; dia <= dias; dia++) {
        const nomeDia = `Treino ${String.fromCharCode(64 + dia)}`; // A, B, C - Gera o nome do dia altomaticamente
        
        this._connection.query('INSERT INTO dias_ficha (ficha_id, nome) VALUES (?, ?)',
            [planilhaId, nomeDia || null],
            (err, results) => {
                if (err) {
                    console.error('Erro ao inserir dia:', err);
                    return callback(err);
                }if (dia === planilha.dias) {
                    callback(null, results);
                }
            }
        );
    }
};

PlanilhasDAO.prototype.viewFichas = function (request, callback) {
    this._connection.query('select * from fichas where usuario_id = ?',[request.session.usuario.id], callback);
};

PlanilhasDAO.prototype.salvarCalculo = function (dados, userId, callback) {
    this._connection.query(
        'INSERT INTO calculos (usuario_id, tdee, proteinas, carboidratos, gorduras) VALUES (?, ?, ?, ?, ?)',
        [userId, dados.tdee, dados.proteinas, dados.carboidratos, dados.gorduras],callback);
};

module.exports = function () {
    return PlanilhasDAO;
}  