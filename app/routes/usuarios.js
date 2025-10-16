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
                    return response.send('Erro ao salvar usuário!');
                }
                response.redirect('/logout');
            });
            connection.end();
        });
    });

    // CRIAÇÃO COM IA
    app.get('/mtcf', function(request, response){
        response.render('usuarios/MTC_Form.ejs', {errosValidacao: {}, usuario: request.session.usuario || {}});
    });

    // CRIAÇÃO DE PLANILHAS DE TREINO
    app.get('/criar', function(request, response){
        response.render('usuarios/criar.ejs', {errosValidacao: {}, usuario: request.session.usuario || {}, userId: request.session.usuario.id || {}});
    });

    app.post('/criar', function(request, response){
        var connection = app.infra.connectionFactory();
        var PlanilhasDAO = new app.infra.PlanilhasDAO(connection);
        var planilha = request.body;
        var userId = request.session.usuario.id;
        var dias = parseInt(planilha.dias, 10);
        request.assert('nome_treino','Nome da planilha é obrigatório!').notEmpty();
        request.assert('dias','A quantidade de dias é obrigatório!').notEmpty();
        request.assert('descricao','A descrição é obrigatória!').notEmpty();
        var erros = request.validationErrors();

        if(erros){
            connection.end();
            return response.render('usuarios/criar.ejs', {errosValidacao: erros, planilha: planilha});
        }
        PlanilhasDAO.salvar(planilha, userId, function(err, results){
            if(err){
                connection.end();
                return response.send("Erro ao salvar planilha!");
            } if(results.insertId > 0){ 
                PlanilhasDAO.buscarId(userId, function(err, results){
                    if(err){
                        connection.end();
                        return response.send("Erro ao buscar ID da planilha!");
                    } if(results.length > 0){
                        var planilhaId = results[0].id;
                        PlanilhasDAO.salvarFicha(planilha, planilhaId, dias, function(err, results){
                            if(err){
                                console.log(err);
                                connection.end();
                                return response.send("Erro ao criar ficha!");
                            } else{
                                response.redirect('/treino');
                            }
                        });
                    }
                });
            }            
        });

        // v 1° FASE: conecxão com o banco 
        // v 2° FASE: verificação dos itens preenchidos
        // v 3° FASE: modulo para verificar o id da ficha (PlanilhaDAO)
        // x 4° FASE: criação de modulo para salvar os dados da ficha (FichaDAO)
        // x 5° FASE: resposta ao usuario (redirecionamento ou mensagem de erro)

    });

    // EXERCÍCIOS
    app.get('/exercicios', function(request, response){
        const jsonData = fs.readFileSync("Exercicios.json", 'utf8');
        var data = JSON.parse(jsonData);
        response.render('usuarios/exercicios.ejs', { exercicios: data.exercicios });
    });

    // TREINO
    app.get('/treino', function(request, response){
        response.render('usuarios/criar_ficha.ejs', {errosValidacao: {}, usuario: request.session.usuario || {}, userId: request.session.usuario.id || {}});
    });
            
}