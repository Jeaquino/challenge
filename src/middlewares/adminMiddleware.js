function adminMiddleware(req, res, next) {
    res.locals.esAdmin=false
    if (req.session.usuarioLogueado!=undefined) {
        if (req.session.usuarioLogueado.CategoryId == 1) {
            res.locals.esAdmin = true;
        } else {
            res.locals.esAdmin = false;
        }
    } else {
        res.locals.esAdmin = false;
    }
    next();
}

module.exports = adminMiddleware;