const AuthModel = require("../models/auth.model");

class AuthController{
    static async loginUser(req, res){
        try {
            const credentials = req.body;
            const user = await AuthModel.loginUser(credentials);
            req.session.loggedIn = true;
            req.session.role = user.role;
            console.log(req.session);
            res.status(200).send(user);
        } catch (error) {
            res.status(401).send(error);
        }
    }
}

module.exports = AuthController;