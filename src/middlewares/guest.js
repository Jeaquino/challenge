function guest(req, res, next) {
    console.log("hola hola hola", req);
    if (req.session.usuarioLogueado) {
        return res.redirect('/');
    }
    next();
}
module.exports = guest;
