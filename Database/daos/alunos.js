const BD = require('./Database/bd');

async function inclua(aluno)
{
    const conexao = await BD.getConexao();
    if(conexao==null){
        return null;
    }
    try{
        const sql = 'INSERT INTO alunos(ra,latitude,longitude,foto) VALUES(?,?,?,?)';
        const dados = [aluno.ra,aluno.latitude, aluno.longitude,aluno.foto];
        await conexao.query (sql,dados);
        return true;
    }catch(excecao){
        return false;
    }
}

async function atualize(aluno)
{
    const conexao = await BD.getConexao();
    if(conexao == null){
        return null;
    }

    try{
        const sql = 'UPDATE alunos SET latitude=?,longitude=?,foto=? WHERE ra=?';
        const dados = [aluno.latitude, aluno.longitude, aluno.foto, aluno.ra];
        await conexao.query (sql,dados);
        return true;
    }catch(excecao){
        return false;
    }
}

async function remova(ra)
{
    const conexao = await BD.getConexao();
    if(conexao == null){
        return null;
    }

    try{
        const sql = 'DELETE FROM alunos WHERE ra=?';
        const dados = [ra];
        await conexao.query(sql,dados)
        return true;
    }catch(excecao){
        return false;
    }
}

async function recupereUm(ra)
{
    const conexao = await BD.getConexao();
    if(conexao == null){
        return null;
    }
    try{
        const sql = 'SELECT * FROM alunos WHERE ra=?';
        const dados = [ra];
        const [linhas] = await conexao.query(sql,dados)
        return linhas;
    }catch(excecao){
        return false;
    }

}

async function recupereTodos()
{
    const conexao = await BD.getConexao();
    if(conexao == null){
        return null;
    }
    try{
        const sql = 'SELECT * FROM alunos'
        const [linhas] = await conexao.query(sql);
    
        return linhas;
    }catch(excecao){
        return false;
    }

}

module.exports = {inclua, atualize, remova, recupereTodos, recupereUm}