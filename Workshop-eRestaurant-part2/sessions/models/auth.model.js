const DataService = require("../services/data.service");
const path = require("path");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname, "..", "data", "users.json");

class User{
    constructor(firstName, lastName, age, email, password){
        this.id = uuid();
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
    }
}
class AuthModel{
    static async getAllUsers(){
        return DataService.readJSONFile(usersPath);
    }
    static async getUsersById(userId){
        const users = await this.getAllUsers();
        const foundUser = users.find(user => user.id === userId);

        return foundUser;
    }
    // 1. Create a user
    static async createUser(userData){
        const users = await this.getAllUsers();
        const userExists = users.some(user => user.email === userData.email);
        if(userExists) return Promise.reject({msg: "email already taken"});

        const hashedPassword = await bcrypt.hash(userData.password, 0);
       console.log(hashedPassword); 
    
    const newUser = new User(
        userData.firstName, 
        userData.lastName, 
        userData.age,
        userData.email,
        hashedPassword
    );
    console.log("this is the new user object");
    console.log(newUser);

    const updatedUsers = [...users, newUser];

    await DataService.saveJSONFile(usersPath, updatedUsers);

    const{password, ...userWithPassword} = newUser;

    return userWithPassword;
}
//2.login users
static async loginUser(credentials) {
    //Destructuring the credentials
    const { email, password } = credentials;
    //Getting the users
    const users = await this.getAllUsers();
    //Checking if user exists
    const foundUser = users.find(user => user.email === email);
    if (!foundUser) return Promise.reject({ msg: "Invalid Credentials" });
    //Checking if the password if valid
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) return Promise.reject({ msg: "Invalid Credentials" });
    //Removing hashed password from user object
    const { password: hashedPassword, ...userWithoutPassword } = foundUser;

    return userWithoutPassword;
}
//3 save refresh token
static async saveRefreshToken(userId, refreshToken) {
    const users = await this.getAllUsers();

    const updatedUser = users.map(user => {
        if(user.id === userId){
            user.refreshToken = refreshToken;
            return user;
        }
        return user;
    });
    await DataService.saveJSONFile(usersPath,updatedUser);
}
static async deleteRefreshToken(userId){
    const users = await this.getAllUsers();

    const updatedUsers = users.map(user => {
        if(user.id === userId){
            user.refreshToken = null;
            return user;
        }
        return user;
    });

    await DataService.saveJSONFile(usersPath,updatedUsers);
}
}
module.exports = AuthModel;