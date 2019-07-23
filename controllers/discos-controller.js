const repositorio = require('../repositories/discos-repository');

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
        next();
    } catch (e){
        next(e);
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
        next();
    } catch(e){
        next(e);
    }
};

exports.get = async(req, res, next) => {
    res.status(200).send(req.resultConsulta);
}

exports.consulta = consulta;
exports.consultaPorNome = consultaPorNome;
exports.cadastrar = cadastrar;