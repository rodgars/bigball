module.exports = (req, res, next) => {
    if(!req.user.isAdmin){
        return res.status(401).send({error: 'You must be admin to put oficial results'});
    }

    next();
};

// exemplo de implementacao, sera necessario criar a flag isAdmin (ou algo relativo) 
// para validar se o usuario pode ou não efetuar a operação