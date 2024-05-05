function adminMiddleware(req, res, next) {
    ////ponemos un estado llamado esAdmin, el cual empieza en false sea para usuario normal o para invitado
    res.locals.esAdmin=false
    if (req.session.usuarioLogueado!=undefined) {

        //luego nos fijamos que si esta logueado el usuario logueado tenga el categoryid en 1 que es el de administrador, el 2 es normal
        if (req.session.usuarioLogueado.CategoryId == 1) {
            ////en caso de ser 1 se habilita y se habilitaria las sesiones para administradores, como editar, borrar libros
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