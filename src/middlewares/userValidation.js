function userValidate(req, res, next) {
    res.locals.isLogged = false;
    res.locals.user =[];
    if (req.session && req.session.usuarioLogueado) {
        res.locals.isLogged = true;
        res.locals.user = req.session.usuarioLogueado;
       if (req.session.usuarioLogueado.categoryId == 1){
        res.locals.admin = true
       } 
       else {
        res.locals.admin = false
       }
    }
    
    next();
    }
    
module.exports = userValidate;