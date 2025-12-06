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


PlanilhasDAO.prototype.salvarFichaIA = function(treino, userId, callback) {
    this._connection.query(
        "INSERT INTO fichas (nome, usuario_id) VALUES (?, ?)",
        [treino.nome, userId],
        callback
    );
};

PlanilhasDAO.prototype.salvarDiasIA = function(treino, fichaId, callback) {
    let inseridos = 0;

    treino.fichas.forEach((dia) => {
        this._connection.query(
            "INSERT INTO dias_ficha (ficha_id, nome) VALUES (?, ?)",
            [fichaId, dia.nome],
            (err) => {
                if (err) return callback(err);

                inseridos++;
                if (inseridos === treino.fichas.length) {
                    callback(null);
                }
            }
        );
    });
};


PlanilhasDAO.prototype.viewFichas = function (request, callback) {
    this._connection.query('select * from fichas where usuario_id = ?',[request.session.usuario.id], callback);
};

PlanilhasDAO.prototype.viewFichaDias = function (fichaId, callback) {
    this._connection.query('SELECT * FROM dias_ficha where ficha_id = ?',[fichaId], callback);
}

PlanilhasDAO.prototype.salvarCalculo = function (dados, userId, callback) {
    this._connection.query('INSERT INTO calculos (usuario_id, tdee, proteinas, carboidratos, gorduras) VALUES (?, ?, ?, ?, ?)',
        [userId, dados.tdee, dados.proteinas, dados.carboidratos, dados.gorduras],callback);
}

PlanilhasDAO.prototype.apagar = function(id, callback){
    this._connection.query('DELETE FROM fichas WHERE id = ?', [id], callback);
}

PlanilhasDAO.prototype.insertExercicio = function(diaId, dados, callback){
    this._connection.query('INSERT INTO exercicios (dia_ficha_id, nome, agrupamento_muscular, dificuldade, classificacao, localidade, video)VALUES (?, ?, ?, ?, ?, ?, ?)', [diaId, dados.nome,
        dados.agrupamento_muscular,
        dados.dificuldade,
        dados.classificacao, 
        dados.localidade,
        dados.video], callback);
}

PlanilhasDAO.prototype.viewFichaExercicios = function (diaId, callback) {
    this._connection.query('SELECT * FROM exercicios where dia_ficha_id = ?',[diaId], callback);
};

PlanilhasDAO.prototype.atualizarExercicioDia = function(id, dados, callback) {
    this._connection.query(
        `UPDATE exercicios 
         SET series = ?, repeticoes = ?, descanso = ?, observacoes = ?
         WHERE id = ?`,
        [dados.series, dados.repeticoes, dados.descanso, dados.observacoes, id],
        callback
    );
};

PlanilhasDAO.prototype.apagarExercicioDia = function(idDiaExercicio, callback) {
    this._connection.query('DELETE FROM exercicios WHERE id = ?', [idDiaExercicio], callback);

};

PlanilhasDAO.prototype.salvarTreinoIA = function(treino, usuarioId, callback) {
    const conn = this._connection;

    conn.query(
        'INSERT INTO fichas (nome, usuario_id) VALUES (?, ?)',
        [treino.nome, usuarioId],
        function(err, resultFicha) {
            if (err) return callback(err);

            const fichaId = resultFicha.insertId;

            treino.fichas.forEach(f => {
                conn.query(
                    'INSERT INTO dias_ficha (nome, ficha_id) VALUES (?, ?)',
                    [f.nome, fichaId],
                    function(err, resultDia) {
                        if (err) return callback(err);

                        const diaId = resultDia.insertId;

                        f.exercicios.forEach(ex => {
                            conn.query(
                                `INSERT INTO dia_exercicios
                                 (nome, series, repeticoes, descanso, observacoes, video, dia_id)
                                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                [
                                    ex.nome,
                                    ex.series,
                                    ex.repeticoes,
                                    ex.descanso,
                                    ex.observacoes || null,
                                    ex.video || null,
                                    diaId
                                ]
                            );
                        });
                    }
                );
            });

            callback(null, fichaId);
        }
    );
};

module.exports = function () {
    return PlanilhasDAO;
}  