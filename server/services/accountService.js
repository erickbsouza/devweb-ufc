const userModel = require('../model/userModel');

//implement
generateToken = (seed) => {
    var length = seed.length;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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


exports.newUser = async (user) => {
    await userModel.insertNewUser(user);
}

exports.editUser = async (user) => {
    await userModel.saveUser(user);
}

exports.getAuthenticatedReviewerUser = async (token) => {
    var user = await userModel.getUserByToken(token);
    if (user.profile == 'reviewer')
        return user;
    else
        return null;
}

exports.endSession = async (token) => {
    user = await userModel.getUserByToken(token);
    if (user) {
        user.token = null;
        user.expirationDate = null;
        await userModel.saveUser(user);
    }
}