const repositorio = require('../repositories/gravadoras-repository.js');

exports.get = async(req, res, next) => {
    try {
        var data = await repositorio.get(res);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

/*exports.getById = async(req, res, next) => {
    try{
        var data = await repositorio.getById(req.params.id, res);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};*/

exports.getByNome = async(req, res, next) => {
    try{
        var data = await repositorio.getByNome(req.params.nome, res);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.patch = async(req, res, next) => {
    try{
        await repositorio.update(req.params.id, req.body, res);
    } catch (e){
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.post = async(req, res, next) => {
    try{
        await repositorio.create(req.body, res);
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }

}

exports.delete = async(req, res, next) => {
    try {
        await repositorio.delete(req.params.id, res)
    } catch(e){
        res.status(500).send({
            message: 'Falha ao remover gravadora',
            data: e
        });
    }

};