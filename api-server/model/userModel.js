const userCollection = 'users';
const { response } = require('express');
const md5 = require('md5');
const mongo = require('./mongoClient');
const dbClient = mongo.client;
const dbName = mongo.dbName;

const profiles = {
    visitor: 'visitor',
    creator: 'creator',
    reviewer: 'reviewer'
}

//begin seed
dbClient.connect(err => {
    const collection = dbClient.db(dbName).collection(userCollection);
    collection.estimatedDocumentCount((err, result) => {
        if (result == 0) {
            collection.insertMany([{
                    _id: 1,
                    foto: '/images/user1-image.jpg',
                    name: 'Alan',
                    surname: 'Maia',
                    email: 'maiaalan@alu.ufc.br',
                    telefone: '85987678933',
                    nusuario: 'alanmaia',
                    hash: md5('senha'),
                    profile: profiles.visitor,
                    token: null,
                    expirationDate: null
                },
                {
                    _id: 2,
                    foto: '/images/profile-picture.png',
                    name: 'João',
                    surname: 'César',
                    email: 'joão@alu.ufc.br',
                    telefone: '8598245333',
                    nusuario: 'joaocesar',
                    hash: md5('senha'),
                    profile: profiles.creator,
                    token: null,
                    expirationDate: null
                },
                {
                    _id: 3,
                    foto: '/images/profile-picture.png',
                    name: 'Leonardo',
                    surname: 'DiCaprio',
                    email: 'leo@alu.ufc.br',
                    telefone: '8598245333',
                    nusuario: 'leocaprio',
                    hash: md5('senha'),
                    profile: profiles.reviewer,
                    token: null,
                    expirationDate: null
                }
            ], (err) => {
                if (err != null) {
                    console.log(err.message);
                }
            });
        }
    });
});
//end seed

getUsers = async(query) => {
    var users = [];
    const collection = dbClient.db(dbName).collection(userCollection);
    users = await collection.find(query).toArray();
    return users;
}

addUserToCollection = async(user) => {
    const collection = dbClient.db(dbName).collection(userCollection);
    await collection.insertOne(user);
}

removeUserFromCollection = async(user) => {
    const collection = dbClient.db(dbName).collection(userCollection);
    await collection.findOneAndDelete({ _id: user._id },
        (err, result) => {
            if (err)
                console.log("Erro");
            console.log("Deletou");
        });
    console.log("chegou aqui");
}

updateUserInCollection = async(user) => {
    const collection = dbClient.db(dbName).collection(userCollection);
    await collection.updateOne({ _id: user._id }, {
        $set: {
            name: user.name,
            surname: user.surname,
            email: user.email,
            nusuario: user.nusuario,
            telefone: user.telefone,
            hash: user.hash,
            profile: user.profile,
            token: user.token,
            expirationDate: user.expirationDate,
            foto: user.foto
        }
    });
}

exports.getUserByToken = async(token, callback) => {
    return (await getUsers()).filter(user => user.token === token)[0];
}

exports.getUserById = async(id, callback) => {
    return (await getUsers()).filter(user => user.id === id)[0];
}

exports.queryUsers = async(query) => {
    return await getUsers(query);
}

exports.getUserByEmail = async(email, callback) => {
    return (await getUsers()).filter(user => user.email === email)[0];
}

exports.insertNewUser = async(user, callback) => {
    await addUserToCollection(user);
};

exports.deleteUser = async(user, callback) => {
    await removeUserFromCollection(user);
};

exports.saveUser = async(user, callback) => {
    if (!(await this.getUserById(user.id))) {
        await addUserToCollection(user);
    } else {
        await updateUserInCollection(user);
    }
};