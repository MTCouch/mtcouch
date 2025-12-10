var bcrypt = require('bcryptjs');
const session = require('express-session');
var fs = require("fs");

module.exports = function(app){

/* =====================================================
   AUTENTICAÇÃO
===================================================== */

    app.get('/login', function(request, response){
        response.render('usuarios/login.ejs', {
            usuario: request.session.usuario || {}
        });
    });

    app.post('/login', function(request, response){
        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);

        var email = request.body.email;
        var senha = request.body.senha;

        usuariosDAO.buscarPorEmail(email, function(err, results){
            if(err){
                connection.end();
                return response.send('Erro ao buscar usuário!');
            }

            if(results.length == 0){
                connection.end();
                return response.render('usuarios/login.ejs', {
                    erro: 'Usuário não encontrado!',
                    usuario: request.session.usuario || {}
                });
            }

            var usuario = results[0];
            var planilha = results[0];

            bcrypt.compare(senha, usuario.senha, function(err, results){
                if(results){
                    request.session.usuario = usuario;
                    request.session.planilha = planilha;
                    response.redirect('/');
                } else {
                    response.render('usuarios/login.ejs', {
                        erro: 'Usuário ou senha incorretos!',
                        usuario: request.session.usuario || {}
                    });
                }
                connection.end();
            });
        });
    });

    app.get('/logout', function(request, response){
        request.session.destroy();
        response.redirect('/');
    });

/* =====================================================
   REGISTRO
===================================================== */

    app.get('/registro', function(request, response){
        response.render('usuarios/registro.ejs', {
            errosValidacao: {},
            usuario: request.session.usuario || {}
        });
    });

    app.post('/registro', function(request, response){
        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);
        var usuario = request.body;

        request.assert('email','E-mail é obrigatório!').notEmpty();
        request.assert('senha','Senha é obrigatória!').notEmpty();

        var erros = request.validationErrors();
        if(erros){
            connection.end();
            return response.render('usuarios/registro.ejs', {
                errosValidacao: erros,
                usuario: usuario
            });
        }

        bcrypt.hash(usuario.senha,12,function(err,hash){
            usuario.senha = hash;

            usuariosDAO.salvar(usuario, function(err){
                connection.end();

                if(err){
                    response.render('usuarios/login.ejs', {
                        erro: 'Erro ao salvar usuário!!'
                    });
                    return;
                }
                response.redirect('/login');
            });
        });
    });

/* =====================================================
   CALCULADORA
===================================================== */

    app.get('/calculadora', function(request, response){
        response.render('usuarios/calculadora.ejs', {
            errosValidacao: {},
            usuario: request.session.usuario || {},
            results: null
        });
    });

    app.post('/calculadora', function(request, response){
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);

        var usuario = request.session.usuario;
        var dados = request.body;

        if (!dados) {
            connection.end();
            return response.send("Erro: Nenhum dado enviado para cálculo.");
        }

        PlanilhasDAO.salvarCalculo(dados, usuario.id, function(err, results){
            connection.end();

            if(err){
                return response.send('Erro ao salvar cálculo!');
            }

            return response.redirect('/fichas');
        });
    });

/* =====================================================
   CRIAÇÃO DE PLANILHAS
===================================================== */

    app.get('/criar', function(request, response){
        response.render('usuarios/criar.ejs', {
            errosValidacao: {},
            usuario: request.session.usuario || {},
            userId: request.session.usuario.id || {}
        });
    });

    app.post('/criar', function(request, response) {
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);

        var planilha = request.body;
        var userId = request.session.usuario.id;
        var dias = parseInt(planilha.dias, 10);

        request.assert('nome_treino', 'Nome da planilha é obrigatório!').notEmpty();
        request.assert('dias', 'A quantidade de dias é obrigatória!').notEmpty();
        request.assert('descricao', 'A descrição é obrigatória!').notEmpty();

        var erros = request.validationErrors();
        if (erros) {
            connection.end();
            return response.render('usuarios/criar.ejs', {
                errosValidacao: erros,
                planilha: planilha
            });
        }

        PlanilhasDAO.salvar(planilha, userId, function(err, results) {
            if (err) {
                connection.end();
                return response.send("Erro ao salvar planilha!");
            }

            const planilhaId = results.insertId;

            PlanilhasDAO.salvarFicha(planilha, planilhaId, dias, function(err) {
                connection.end();

                if (err) {
                    return response.send("Erro ao criar ficha!");
                }

                return response.redirect('/fichas');
            });
        });
    });

/* =====================================================
   FICHAS
===================================================== */

    app.get('/fichas', function(request, response) {
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);

        PlanilhasDAO.viewFichas(request, function(err, results) {
            connection.end();

            if (err) {
                return response.status(500).send("Erro ao buscar fichas!");
            }

            request.session.fichas = results;
            response.render('usuarios/fichas.ejs', {
                usuario: request.session.usuario || {},
                fichas: results || {},
                dias_ficha: []
            });
        });
    });

    app.get('/fichas/:id', function (request, response) {
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);

        const fichaId = request.params.id;

        PlanilhasDAO.viewFichaById(fichaId, function (err, ficha_atual) {
            if (err || !ficha_atual || ficha_atual.length === 0) {
                connection.end();
                return response.status(404).send("Ficha não encontrada");
            }

            PlanilhasDAO.viewFichaDias(fichaId, function (err, dias) {
                if (err) {
                    connection.end();
                    return response.send("Erro ao buscar dias da ficha!");
                }

                let contador = 0;

                if (dias.length === 0) {
                    connection.end();
                    return response.render("usuarios/fichas.ejs", {
                        usuario: request.session.usuario || {},
                        fichas: request.session.fichas || [],
                        ficha_atual: ficha_atual[0],
                        dias_ficha: []
                    });
                }

                dias.forEach(dia => {
                    PlanilhasDAO.viewFichaExercicios(dia.id, function (err, exercicios) {
                        contador++;
                        dia.exercicios = exercicios || [];

                        if (contador === dias.length) {
                            connection.end();
                            response.render("usuarios/fichas.ejs", {
                                usuario: request.session.usuario || {},
                                fichas: request.session.fichas || [],
                                ficha_atual: ficha_atual[0],
                                dias_ficha: dias
                            });
                        }
                    });
                });
            });
        });
    });

    app.get('/delete/:id', function(request, response){
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);

        var id = request.params.id;

        PlanilhasDAO.apagar(id, function(){
            connection.end();
            return response.redirect('/fichas');
        });
    });

/* =====================================================
   EXERCÍCIOS
===================================================== */

    app.get('/exercicios', function(request, response){
        const jsonData = fs.readFileSync("Exercicios.json", 'utf8');
        var data = JSON.parse(jsonData);

        response.render('usuarios/exercicios.ejs', {
            exercicios: data.exercicios,
            diaId: null
        });
    });

    app.get('/ad-exercicios/:id', function(request, response){
        const jsonData = fs.readFileSync("Exercicios.json", 'utf8');
        var data = JSON.parse(jsonData);

        response.render('usuarios/exercicios.ejs', {
            exercicios: data.exercicios,
            diaId: request.params.id
        });
    });

    app.post('/salvar-exercicio/:id', function(request, response){
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);

        var diaId = request.params.id;
        var dados = request.body;

        PlanilhasDAO.insertExercicio(diaId, dados, function(err){
            connection.end();

            if(err){
                return response.send('Erro ao salvar exercício na ficha!');
            }

            return response.redirect('/ad-exercicios/' + diaId);
        });
    });

    app.post('/exercicio/:id/salvar', function(req, res) {
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);

        PlanilhasDAO.atualizarExercicioDia(req.params.id, {
            series: req.body.series,
            repeticoes: req.body.repeticoes,
            descanso: req.body.descanso,
            observacoes: req.body.observacoes
        }, function(err) {
            connection.end();
            if (err) throw err;
            res.redirect('back');
        });
    });

    app.get('/delete_exercicio/:id', function(request, response) {
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);

        PlanilhasDAO.apagarExercicioDia(request.params.id, function(){
            connection.end();
            response.redirect('/fichas');
        });
    });

/* =====================================================
   IA
===================================================== */

    app.get('/mtcf', function(request, response){
        response.render('usuarios/MTC_Form.ejs', {
            errosValidacao: {},
            usuario: request.session.usuario || {}
        });
    });

    app.post('/mtcf', function(request, response){
        var connection = app.infra.connectionFactory();
        var MtcDAO = new app.infra.MtcDAO(connection);

        var planilha = request.body;

        request.assert('nome','O nome da planilha é obrigatório!').notEmpty();
        request.assert('dias','A quantidade de dias é obrigatória!').notEmpty();
        request.assert('experiencia','A experiência é obrigatória!').notEmpty();
        request.assert('objetivo','O objetivo é obrigatório!').notEmpty();

        var erros = request.validationErrors();

        if(erros){
            connection.end();
            return response.render('usuarios/MTC_Form.ejs', {
                errosValidacao: erros,
                planilha: planilha
            });
        }

        MtcDAO.buscarTreino(planilha, function(err, results){
            connection.end();

            if(results != null){
                request.session.treino = results;
                response.render('usuarios/treino.ejs', {
                    treino: results,
                    usuario: request.session.usuario || {}
                });
            }
        });
    });

    app.post('/salvar-treino-ia', async function(req, res) {
        try {
            const treino = JSON.parse(req.body.treino);
            const usuarioId = req.session.usuario.id;

            var connection = app.infra.connectionFactory();
            var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);

            const fichaId = await PlanilhasDAO.salvarTreinoIA(treino, usuarioId);

            connection.end();
            return res.redirect(`/fichas/${fichaId}`);

        } catch (err) {
            return res.status(500).send('Erro ao salvar treino da IA');
        }
    });

};
