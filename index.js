const express = require('express');
const bd      = require('./bd.js');
const rotas   = require('./rotas.js');

function middleWareGlobal(req,res,next)
{
    console.time('Duracao'); // marca inicio da requisição
    console.log('Iniciou o processamento da requisição ' + req.method + ' em '+ req.url); //indica o 

    next(); // função que chama o processamento, propriamente dito, da requisição

    console.log('Terminou o processamento da requisição ' + req.method + ' em ' + req.url); // indica o
    console.timeEnd('Duracao'); // informa duração do processamento da requisição
}

async function ativacaoDoServidor()
{
    const ret = bd.estrutureSe();

        if(ret === null)
        {
            console.log('Nao foi possivel estabelecer conexão com o BD');
            process.exit(1);
        }
    
        if(ret ===false)
        {
            console.log('Nao foi possivele estruturar o BD!');
            process.exit(1);
        }
    
        const express = require('express')
        const app = express();
    
        app.use(express.json()); // faz com que o express consiga processar JSON
        app.use(middleWareGlobal); // app.use cria o middleware global
    
        app.post('/livros',rotas.inclusao);
        app.put('/livros/:codigo', rotas.atualizacao);
        app.delete('/livros/:codigo', rotas.remocao);
        app.get('/livros/:codigo', rotas.recuperacaoDeUm);
        app.get('/livros', rotas.recuperacaoDeTodos);
    
        console.log('Servidor ativo na porta 3000...');
        app.listen(3000);
        
}

ativacaoDoServidor();
