function sessionMiddleware(req,res,next){
res.locals.usuarioLogueado=false

if(req.session.usuarioLogueado){
    res.locals.usuarioLogueado=true
}
else{
    res.locals.usuarioLogueado=false
    
}

next()


}




module.exports=sessionMiddleware