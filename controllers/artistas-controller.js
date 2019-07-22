const repositorio = require('../repositories/artistas-repository');

const consulta = async(req, res, next) => {
    try {
        const results = await repositorio.get();
        req.resultConsulta = results;
        next();
    } catch (e) {
        next(e);
    }
};

const consultaPorNome = async(req, res, next) => {
    try{
        const results =  await repositorio.getByNome(req.params.nome);
        req.resultConsulta = results;
        next();
    } catch (e) {
        next(e);
    }
};

exports.patch = async(req, res, next) => {
    try{
        await repositorio.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Registro atualizado com sucesso!'
        });
    } catch (e){
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

const cadastrar = async(req, res, next) => {
    try{
        await repositorio.create(req.body);
	    next();
    } catch(e){
        next(e);
    }
}
exports.delete = async(req, res, next) => {
    try {
        await repositorio.delete(req.params.id);
        res.status(200).send({
            message: 'Registro deletado com sucesso!'
        });
    } catch(e){
        res.status(500).send({
            message: 'Falha ao remover artista',
            data: e
        });
    }
};

exports.get = async(req, res, next) => {
    res.status(200).send(req.resultConsulta);
}

exports.consulta = consulta;
exports.consultaPorNome = consultaPorNome;
exports.cadastrar = cadastrar;