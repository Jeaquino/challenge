function isAdminValidate(req, res, next) {
    if (req.session.user && req.session.user.CategoryId !== 1) {
    console.log(req.session.user);
    }
    if (req.session && req.session.usuarioLogueado.CategoryId == 1) {
        next();
    } else {
        res.redirect('/');
    }
}
module.exports = isAdminValidate;