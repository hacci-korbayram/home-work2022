const User = require("../models/user.model");

class AuthService {
    static async registerUser(userData) {
        const user = new User(userData);

        await user.save();
        return user;
    }
    static async loginUser(credentials) {
        const { email, password } = credentials;


        //Checking if email exists
        const user = await User.findOne({ email: email });

        if (!user) return Promise.reject({ msg: "Invalid credentials" });

        const isPasswordValid = await user.comparePassword(password);

        //Checking if password is valid
        if (!isPasswordValid) return Promise.reject({ msg: "invalid credentials" });

        return user;
    }
}

module.exports = AuthService;