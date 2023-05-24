const ALUNOS = require('./alunos.js');
const ALUNO = require('./aluno.js');
const COMUNICADO = require('./comunicado.js');

// para a rota de CREATE
async function inclusao(req,res)
{
    if(Object.values(req.body).length!=4 || !req.body.ra || !req.body.latitude || !req.body.longitude || !req.body.foto)
    {
        const ERRO = COMUNICADO.novo('DdI', 'Dados inesperados', 'Nao foram fornecidos exatamente as 4 informações esperadas de um aluno(ra, latitude, longitude e foto)').object;
        return res.status(422).json(ERRO);
    }

    let aluno;
    try
    {
        aluno = ALUNO.novo(req.body.ra, req.body.latitude, req.body.longitude, req.body.foto);
    }
    catch(excecao)
    {
        const erro = COMUNICADO.novo('TDE', 'Dados de tipos errados', 'ra dever ser um numero natural positivo, latitude e longitude deve ser um numero real').object;
        return res.status(422).json(erro);
    }

    const ret = await ALUNOS.inclua(aluno);

    if(ret === null)
    {
        const erro = COMUNICADO.novo('CBD', 'Sem conexao com o BD', 'ra dever ser um numero natural positivo, latitude e longitude deve ser um numero real').object;
        return res.status(500).json(erro);
    }

    if(ret ===false)
    {
        const erro = COMUNICADO.novo('AJE', 'Aluno já existe', 'Já há um Aluno cadastrado com o ra informado').object;
        return res.status(409).json(erro);
    }

    const sucesso = COMUNICADO.novo('IBS', 'Inclusao bem sucedida', 'O Aluno foi incluido com sucesso').object;
    return res.status(200).json(sucesso);
}


async function atualizacao(req,res){
    if(Object.values(req.body).length!=4 || !req.body.ra || !req.body.latitude || !req.body.longitude || !req.body.foto)
    {
        const erro = COMUNICADO.novo('DdI', 'Dados inesperados', 'Nao foram fornecidos exatamente as 4 informações esperadas de um aluno(ra,latitude e lon)').object;
        return res.status(422).json(erro);
    }

    let aluno;
    try
    {
        aluno = ALUNO.novo(req.body.ra, req.body.latitude, req.body.longitude, req.body.foto);
    }
    catch(execao){
        const erro = COMUNICADO.novo('TDE', 'Dados de tipos errados', 'RA deve ser um numero natural positivo, latitude deve ser um texto nao vazio e lon deve ser um numero real positivo').object;
        return res.status(422).json(erro);
    }
    
    const ra = req.params.ra;
    
    if(ra!=aluno.ra)
    {
        const erro = COMUNICADO.novo('TMC', 'Mudança de ra', 'Tentativa de mudar o ra do aluno').object;
        return res.status(400).json(erro);

    }
    
    let ret = await ALUNOS.recupereUm(ra);

    if(ret === null)
    {
        const erro = COMUNICADO.novo('CBD', 'Sem conexao com o BD', 'RA dever ser um numero natural positivo, latitude deve ser um texto nao vazio e lon deve ser um numero real positivo').object;
        return res.status(500).json(erro);
    }

    if(ret ===false)
    {
        const erro = COMUNICADO.novo('FNC', 'Falha no comando SQL', 'O comando SQL apresenta algum erro de sintaxe').object;
        return res.status(409).json(erro);
    }

    // Se o retorno do comando SQL for um vetor vazio:
    if(ret.length==0)
    {
        const erro = COMUNICADO.novo('LNE', 'ALUNO inexistente', 'Não há aluno cadastrado com o RA').object;
        return res.status(404).json(erro);
    }

    ret = await ALUNOS.atualize(aluno);

    if(ret==null)
    {
        const erro = COMUNICADO.novo('CBD','Sem conexao com o bd','Nao foi possivel estabelecer conexao com o banco').object;
        return res.status(500).json(erro);
    }

    if(ret==false)
    {
        const erro = COMUNICADO.novo('FNC', 'Falha no comando SQL', 'O comando sql apresenta algum erro de sintaxe').object;
        return res.status(409).json(erro);
    }

    const sucesso = COMUNICADO.novo('ABS', 'Alteracao bem sucedida', 'O aluno foi atualizado com sucesso').object;
    return res.status(200).json(sucesso);
}

async function remocao(req,res)
{
    if(Object.values(req.body).length!=0)
    {
        const erro = COMUNICADO.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados desnecessariamente').object;
        return res.status(422).json(erro);
    }

    const ra = req.params.ra;
    let ret = await ALUNOS.recupereUm(ra);

    if(ret===null)
    {
        const erro = COMUNICADO.novo('CBD', 'Sem conexao com o BD', 'Nao foi possivel estabelecer conexao com o bd').object;
        return res.status(500).json(erro);
    }
    if(ret==false)
    {
        const erro = COMUNICADO.novo('FNC', 'Falha no comando SQL', 'O comando sql apresenta algum erro de sintaxe').object;
        return res.status(409).json(erro);
    }

    if(ret.length==0)
    {
        const erro = COMUNICADO.novo('LNE', 'Aluno inexistente', 'Não há Aluno cadastrado com o ra').object;
        return res.status(404).json(erro);
    }

    ret = await ALUNOS.remova(ra);

    if(ret===null)
    {
        const erro = COMUNICADO.novo('CBD', 'Sem conexao com o BD', 'Nao foi possivel estabelecer conexao com o bd').object;
        return res.status(500).json(erro);
    }
    if(ret==false)
    {
        const erro = COMUNICADO.novo('FNC', 'Falha no comando SQL', 'O comando sql apresenta algum erro de sintaxe').object;
        return res.status(409).json(erro);
    }

    const sucesso = COMUNICADO.novo('RBS', 'Remocao bem sucedida', 'O Aluno foi removido com sucesso').object;
    return res.status(200).json(sucesso);

}

async function recuperacaoDeUm(req,res)
{
    if(Object.values(req.body).length!=0){
        const erro = COMUNICADO.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados desnecessariamente').object;
        return res.status(422).json(erro);
    }

    const ra = req.params.ra;

    const ret = await ALUNOS.recupereUm(ra);

    if(ret===null)
    {
        const erro = COMUNICADO.novo('CBD', 'Sem conexao com o BD', 'Nao foi possivel estabelecer conexao com o bd').object;
        return res.status(500).json(erro);
    }

    if(ret===false)
    {
        const erro = COMUNICADO.novo('FNC', 'Falha no comando SQL', 'O comando sql apresenta algum erro de sintaxe').object;
        return res.status(409).json(erro);
    }

    if(ret.length==0)
    {
        const erro = COMUNICADO.novo('LNE', 'Aluno inexistente', 'Não há Aluno cadastrado com o ra').object;
        return res.status(404).json(erro);
    }

    /* ATENCAO: DIFERENTE DOS OUTROS COMANDOS, QUANDO TRATAMOS DO SELECT O RETORNO DO NOSSO JSON SERA AS INFORMACOES DO DBO E NAO UM COMUNICADO*/
    return res.status(200).json(ret);
}

async function recuperacaoDeTodos(req,res)
{

    if(Object.values(req.body).length!=0)
    {
        const erro = COMUNICADO.novo('DSP', 'Dados fornecidos sem proposito', 'Foram fornecidos dados sem proposito').object;
        return res.status(422).json(erro);
    }

    const ret = await ALUNOS.recupereTodos();

    if(ret === null)
    {
        const erro = COMUNICADO.novo('CBD', 'Sem conexao com o BD', 'Nao foi possivel estabelecer conexao com o bd').object;
        res.status(500).json(erro);
    }

    if(ret === false)
    {
        const erro = COMUNICADO.novo('FNC', 'Falha no comando SQL', 'O comando sql apresenta algum erro de sintaxe').object;
        res.status(409).json(erro);
    }

    return res.status(200).json(ret);
}

module.exports = {inclusao, atualizacao, remocao, recuperacaoDeUm, recuperacaoDeTodos}

 