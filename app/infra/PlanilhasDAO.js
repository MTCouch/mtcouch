function PlanilhasDAO(connection) {
    this._connection = connection;
}

PlanilhasDAO.prototype.salvar = function (planilha, userId, callback) {
    this._connection.query('INSERT INTO fichas (usuario_id, nome, descricao, dias) VALUES (?, ?, ?, ?)',
    [userId, planilha.nome_treino, planilha.descricao, planilha.dias],  callback);

}

PlanilhasDAO.prototype.buscarId = function (userId, callback) {
    this._connection.query('SELECT id FROM fichas WHERE usuario_id = ?;',
        [userId], callback);
};

PlanilhasDAO.prototype.salvarFicha = function (planilha, planilhaId, dias, callback) {
    let inseridos = 0;

    for (let d = 1; d <= dias; d++) {
        const nomeDia = `Treino ${String.fromCharCode(64 + d)}`;

        this._connection.query('INSERT INTO dias_ficha (ficha_id, nome) VALUES (?, ?)',
            [planilhaId, nomeDia],
            (err, results) => {
                if (err) {
                    console.error('Erro ao inserir dia:', err);
                    return callback(err);
                }

                inseridos++;

                // Quando todos os dias forem inseridos, chama o callback
                if (inseridos === dias) {
                    callback(null, results);
                }
            }
        );
    }
};


PlanilhasDAO.prototype.viewFichas = function (request, callback) {
    this._connection.query('select * from fichas where usuario_id = ?',[request.session.usuario.id], callback);
};

PlanilhasDAO.prototype.viewFichaExercicios = function (fichaId, callback) {
    this._connection.query('SELECT * FROM dias_ficha where ficha_id = ?',[fichaId], callback);
}

PlanilhasDAO.prototype.salvarCalculo = function (dados, userId, callback) {
    this._connection.query('INSERT INTO calculos (usuario_id, tdee, proteinas, carboidratos, gorduras) VALUES (?, ?, ?, ?, ?)',
        [userId, dados.tdee, dados.proteinas, dados.carboidratos, dados.gorduras],callback);
}

PlanilhasDAO.prototype.apagar = function(id, callback){
    this._connection.query('DELETE FROM fichas WHERE id = ?', [id], callback);
}

module.exports = function () {
    return PlanilhasDAO;
}  