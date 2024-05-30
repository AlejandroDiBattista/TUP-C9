function noCincos(req, res, next){
    if(req.method == "PUT" && req.params.id == 5){
        res.statusCode(403)
        res.send("No se puede modificar el id 5")
        return 
    }
    next()
}

export default noCincos