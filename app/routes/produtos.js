module.exports = function(app){
    var listaProdutos = function(request, response){

        var connection =  app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results){
            response.render('produtos/lista.ejs',{lista:results});
        });
        connection.end();
    }

    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function(request, response){
        response.render('produtos/form.ejs', {errosValidacao: {}, produto: {}});
    });

    app.post('/produtos', function(request, response){
        var produto = request.body;

        request.assert('titulo', 'Título é obrigatório!').notEmpty();
        request.assert('descricao', 'Descrição é obrigatória!').notEmpty();
        request.assert('preco', 'Preço é obrigatório!').isFloat();

        var erros = request.validationErrors();
        if(erros){
            response.render('produtos/form.ejs', {errosValidacao: erros, produto: produto});
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function(err, results){
            response.redirect('/produtos');
        });
    });

    app.get('/delete/:id', function(request, response){
        var id = request.params.id;

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.apagar(id, function(err, results){
            response.redirect('/produtos');
        });
    });

    app.get('/editar/:id', function(request, response){
        var id = request.params.id;

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.buscar(id, function(err, results){
            response.render('produtos/formalt.ejs', {errosValidacao: {}, produto: results});
        });
    });

    app.post('/alteracao', function(request, response){
        var produto = request.body;

        request.assert('titulo', 'Título é obrigatório!').notEmpty();
        request.assert('descricao', 'Descrição é obrigatória!').notEmpty();
        request.assert('preco', 'Preço é obrigatório!').isFloat();

        var erros = request.validationErrors();
        if(erros){
            response.render('produtos/formalt.ejs', {errosValidacao: erros, produto: produto});
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salvaalt(produto, function(err, results){
            response.redirect('/produtos');
        });
    });
}
