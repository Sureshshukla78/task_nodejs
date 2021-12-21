// rendering pages
exports.home_route = async(req, res)=>{
    res.render("index");
}

exports.forgot_route = async(req, res)=>{
    res.render("update");
}
