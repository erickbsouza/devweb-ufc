const userModel = require('../model/userModel');

//implement
generateToken = (seed) => {
    return '1234';
}

// Autentica o usuário e retorna ele autenticado.
exports.authenticateUser = async (email, hash) => {
    let user = await userModel.getUserByEmail(email);
    if (user && user.hash === hash) {
        let token = generateToken(user.email);
        let currentDate = new Date();
        let expirationDate = currentDate.setDate(currentDate.getDate() + 1);
        user.token = token;
        user.expirationDate = expirationDate;
        await userModel.saveUser(user);
        return user;
    }
    else {
        return null;
    }
}

exports.getAuthenticatedUser = async (token) => {
    return await userModel.getUserByToken(token);
}

exports.endSession = async (token) => {
    user = await userModel.getUserByToken(token);
    if (user) {
        user.token = null;
        user.expirationDate = null;
        await userModel.saveUser(user);
    }
}