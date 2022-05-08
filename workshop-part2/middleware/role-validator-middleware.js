const roleValidator = (req,res, next) =>{
    const role = req.params.role;

    if(role === "admin"){
        next();
        
    }else{
        res.sendStatus(403);
    }
};

module.exports = roleValidator;