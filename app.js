var app = require('./config/express.js')();
var rotasProdutos = require('./app/routes/produtos.js')(app);
require('./app/routes/usuarios.js');


app.listen(3000, function(){
    console.log('Servidor Rodando! Porta: http://127.0.0.1:3000');
});