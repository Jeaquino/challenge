const adminValidacion = (req, res, next) => {
    if (req.session.usuario && req.session.usuario.CategoryId == 1) {
        next();
    } else {
        res.redirect("/");
    }

}

module.exports = adminValidacion;