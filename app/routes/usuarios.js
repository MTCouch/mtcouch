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
            bcrypt.compare(senha, usuario.senha, function(err, results){
                if(results){
                    request.session.usuario = usuario;
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
                    return response.send('Erro ao salvar usuário!');
                }
                response.redirect('/logout');
            });
            connection.end();
        });
    });

    // CRIAÇÃO DE PLANILHAS DE TREINO
    app.get('/criar', function(request, response){
        response.render('usuarios/criar.ejs', {errosValidacao: {}, usuario: request.session.usuario || {}});
    });

    app.post('/criar', function(request, response){
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);
        var planilha = request.body;
        request.assert('nome_treino','Nome da planilha é obrigatório!').notEmpty();
        request.assert('descricao','A descrição é obrigatória!').notEmpty();
        var erros = request.validationErrors();

        if(erros){
            connection.end();
            return response.render('usuarios/criar.ejs', {errosValidacao: erros, usuario: planilha});
        }
        PlanilhasDAO.salvar(planilha, session.usuario.id, function(err, results){
            connection.end();
            if(err){
                return response.send("Erro ao criar a planilha!");
            }            
            response.redirect('/exercicios');
        });
    });

    // CRIAÇÃO COM IA
    app.get('/mtcf', function(request, response){
        response.render('usuarios/MTC_Form.ejs', {errosValidacao: {}, usuario: request.session.usuario || {}});
    });

    // EXERCÍCIOS
    app.get('/exercicios', function(request, response){
        const jsonData = fs.readFileSync("Exercicios.json", 'utf8');
        var data = JSON.parse(jsonData);
        response.render('usuarios/exercicios.ejs', { exercicios: data.exercicios });
    });
            
}