const usuarioLogueadoMiddleware = (req, res, next) => {
    if (req.cookies.recuerdame && req.cookies.user) {
        req.session.usuario = req.cookies.user;
    }
    next();
}
module.exports = usuarioLogueadoMiddleware