const { verifyAccessToken} =require("../const/jwt.const");
const AuthModel = require("../models/auth.model");

const tokenValidator = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) return res.sendStatus(403);

        const token = authorizationHeader.split("")[1];

        const {userId} = verifyAccessToken(token);

        const user = await AuthModel.getUsersById(userId);
        if(!user) return res.sendStatus(403);

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
};

module.exports = tokenValidator;