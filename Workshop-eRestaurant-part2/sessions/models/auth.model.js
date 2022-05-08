const path = require("path");
const DataService = require("../services/data.service");

const usersPath = path.join(__dirname, "..", "data", "users.json");

class AuthModel {
    static async loginUser(credentials) {
        console.log("loginUser");
        //Destructuring the credentials
        const {  name, password } = credentials;
        //Getting the users
        const users = await DataService.readJSONFile(usersPath);
        //Checking if user exists in db
        const validUser = users.find(
            user => user.name === name && user.password === password
            );
        if(!validUser) return Promise.reject({msg: "Invalid credentials"});
        return validUser;

    }
}

module.exports = AuthModel;