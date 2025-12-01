var bcrypt = require('bcryptjs');
const session = require('express-session');
var fs = require("fs");

module.exports = function(app){
    app.get('/login', function(request, response){
        response.render('usuarios/login.ejs', {usuario: request.session.usuario || {}});
    });

    app.post('/login', function(request, response){
        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);
        var email = request.body.email;
        var senha = request.body.senha;
        usuariosDAO.buscarPorEmail(email, function(err, results){
            if(err){
                return response.send('Erro ao buscar usuário!');
            }
            if(results.length == 0){
                return response.render('usuarios/login.ejs', 
                {erro: 'Usuário não encontrado!', usuario: request.session.usuario || {}});
            }
            var usuario = results[0];
            var planilha = results[0];
            bcrypt.compare(senha, usuario.senha, function(err, results){
                if(results){
                    request.session.usuario = usuario;
                    request.session.planilha = planilha;
                    response.redirect('/');
                } else {
                    response.render('usuarios/login.ejs', 
                    {erro: 'Usuário ou senha incorretos!', usuario: request.session.usuario || {}});
                }
            });
            connection.end();
        });
    });

    app.get('/logout', function(request, response){
        request.session.destroy();
        response.redirect('/');
    });

    app.get('/registro', function(request, response){
        response.render('usuarios/registro.ejs', {errosValidacao: {}, usuario: request.session.usuario || {}});
    });

    app.post('/registro', function(request, response){
        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);
        var usuario = request.body;
        request.assert('email','E-mail é obrigatório!').notEmpty();
        request.assert('senha','Senha é obrigatória!').notEmpty();
        var erros = request.validationErrors();
        if(erros){
            return response.render('usuarios/registro.ejs', {errosValidacao: erros, usuario: usuario});
        }
        bcrypt.hash(usuario.senha,12,function(err,hash){
            usuario.senha = hash;
            usuariosDAO.salvar(usuario, function(err, results){
                if(err){
                    response.render('usuarios/login.ejs', {erro: 'Erro ao salvar usuário!!'});
                    return response.send('Erro ao salvar usuário!');
                } else {
                    response.redirect('/login');
                }
            });
            connection.end();
        });
    });

    app.get('/calculadora', function(request, response){
        response.render('usuarios/calculadora.ejs', {errosValidacao: {}, usuario: request.session.usuario || {}, results: null });
    });

    app.post('/calculadora', function(request, response){
        var peso = request.body.peso;
        var altura = request.body.altura;
        var idade = request.body.idade;
        var sexo = request.body.sexo;
        var nivel_atividade = request.body.atividade;

        let bmr;
        if(sexo === 'Masculino'){
            bmr = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
        } else if (sexo === 'Feminino'){
            bmr = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
        }

        let fatorAtividade;
        switch(nivel_atividade){
            case 'sedentario': fatorAtividade = 1.2; break;
            case 'leve': fatorAtividade = 1.375; break;
            case 'moderado': fatorAtividade = 1.55; break;
            case 'intenso': fatorAtividade = 1.725; break;
        }

        const tdee = bmr * fatorAtividade;
        const proteina = (peso * 2) * 4;
        const gordura = (peso * 0.8) * 9;

        const caloriasRestantes = tdee - (proteina + gordura);
        const carboidrato = caloriasRestantes / 4;    

        res.render('usuarios/calculadora.ejs', {
            results: {
                tdee: tdee.toFixed(2),
                proteina: proteina.toFixed(2),
                carboidrato: carboidrato.toFixed(2),
                gordura: gordura.toFixed(2)
            },
            usuario: request.session.usuario || {}
        });
    
    });

    // CRIAÇÃO DE PLANILHAS DE TREINO
    app.get('/criar', function(request, response){
        response.render('usuarios/criar.ejs', {errosValidacao: {}, usuario: request.session.usuario || {}, userId: request.session.usuario.id || {}});
    });

    app.post('/criar', function(request, response) {
    var connection = app.infra.connectionFactory();
    var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);
    var planilha = request.body;
    var userId = request.session.usuario.id;
    var dias = parseInt(planilha.dias, 10);

    request.assert('nome_treino', 'Nome da planilha é obrigatório!').notEmpty();
    request.assert('dias', 'A quantidade de dias é obrigatório!').notEmpty();
    request.assert('descricao', 'A descrição é obrigatória!').notEmpty();

    var erros = request.validationErrors();
    if (erros) {
        connection.end();
        return response.render('usuarios/criar.ejs', { errosValidacao: erros, planilha: planilha });
    }

    PlanilhasDAO.salvar(planilha, userId, function(err, results) {
        console.log("CHECKPOINT 1: SALVAR PLANILHA");

        if (err) {
            connection.end();
            return response.send("Erro ao salvar planilha!");
        }
        if (!(results.insertId > 0)) {
            connection.end();
            return response.send("Erro inesperado: insertId inválido!");
        }

        PlanilhasDAO.buscarId(userId, function(err, results) {
            console.log("CHECKPOINT 2: BUSCAR ID DA PLANILHA");
            if (err) {
                connection.end();
                return response.send("Erro ao buscar ID da planilha!");
            }
            if (results.length === 0) {
                connection.end();
                return response.send("Erro: Nenhuma planilha encontrada após salvar!");
            }

            var planilhaId = results[0].id;
            PlanilhasDAO.salvarFicha(planilha, planilhaId, dias, function(err) {
                console.log("CHECKPOINT 3: SALVAR FICHA");
                if (err) {
                    console.log(err);
                    connection.end();
                    return response.send("Erro ao criar ficha!");
                }
                console.log("CHECKPOINT 4: REDIRECT FINAL");
                connection.end();
                return response.redirect('/fichas');
                });
            });
        });
    });



    // EXERCÍCIOS
    app.get('/exercicios', function(request, response){
        const jsonData = fs.readFileSync("Exercicios.json", 'utf8');
        var data = JSON.parse(jsonData);
        response.render('usuarios/exercicios.ejs', { exercicios: data.exercicios });
    });

        // CRIAÇÃO COM IA
    app.get('/mtcf', function(request, response){
        response.render('usuarios/MTC_Form.ejs', {errosValidacao: {}, usuario: request.session.usuario || {}});
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
            console.log("Erros na validação" + erros);
            return response.render('usuarios/MTC_Form.ejs', {errosValidacao: erros, planilha: planilha});
        } else {
            console.log("Passou na validação");
        }
        MtcDAO.buscarTreino(planilha, function(err, results){
            if(err){
                connection.end();
                return response.send("Erro ao buscar treino!" + err);
            }
            if(results != null){
                connection.end();
                request.session.treino = results; // guarda o treino na sessão
                response.render('usuarios/treino.ejs', {treino: results, usuario: request.session.usuario || {} });
            }
        });
    });


    app.get('/fichas', function(request, response) {
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection)

        PlanilhasDAO.viewFichas(request, function(err, results) {
            if (err) {
                console.error("Erro ao buscar fichas:", err);
                return response.status(500).send("Erro ao buscar fichas! " + err);
            }
            response.render('usuarios/fichas.ejs', {usuario: request.session.usuario || {},fichas: results || []});
        });
    });

    app.get('/fichas/:id/exercicios', function(req, res) {
        const idFicha = req.params.id;

        const connection = app.infra.connectionFactory();
        const PlanilhasDAO = new app.infra.PlanilhasDAO(connection);

        PlanilhasDAO.getExercicios(idFicha, function(err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erro: "Erro ao buscar exercícios" });
            }
            console.log("Exercícios encontrados:");
            return res.json(result);
        });
    });




}