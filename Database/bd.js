async function getConexao(){

    if(globalThis.conexao && globalThis.conexao.state !== 'disconnected'){
        return global.conexao;
    }

        
    const mysql = require("mysql2/promise");
    const bdConfig = require('./bdconfig.js');

    try{
        const conexao = await mysql.createConnection(bdConfig);
        global.conexao = conexao;
        return conexao;
    }catch(erro){
        return null;
    }

}

async function estrutureSe(){

    const conexao = await getConexao();
        if(conexao==null) {
            return null;
        }
    
        const sql = 'CREATE TABLE IF NOT EXISTS livros '+
                    '(codigo TINYINT UNSIGNED, '+
                    'nome VARCHAR(60) NOT NULL, '+
                    'preco FLOAT NOT NULL, PRIMARY KEY (codigo))';

    try{
        await conexao.query(sql)
        return true; // criação da tabela bem sucedida
    }catch(erro){
        return false; // criação da tabela mal sucedida
    }
    
}

module.exports = {getConexao, estrutureSe}