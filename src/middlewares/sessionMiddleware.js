const db = require('../database/models');

function sessionMiddleware(req, res, next) {

    //uso res.locals porque es la manera de agregar una variable local, la cual la empiezo con false
    //luego si encuentra una session o una cookie se pondra en true
    //luego de eso ya puedo manipular ciertos elementos con esa variable locals
    res.locals.usuarioLogueado = false;

    // Leo el ID del usuario de la cookie
    let idCookie = req.cookies.id;


    ///si existe cookies.id (cosa que al loguear se habilitan cookies y session), buscara un usuario que tenga el mismo id
    // luego de eso ese usuario de la cookie representara la session.usuarioLogueado
    if (idCookie) {
        db.User.findByPk(idCookie)
            .then(usuario => {
                if (usuario) {
                  res.locals.usuarioLogueado = true;
                    req.session.usuarioLogueado = usuario;
                }
                
                next();
            })
         ;
    } else {
        next();
    }
}

module.exports = sessionMiddleware;