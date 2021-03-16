const occurrenceCollection = 'occurrences';
const { response } = require('express');
const mongo = require('./mongoClient');
const dbClient = mongo.client;
const dbName = mongo.dbName;

const status = {
    resolved: 'resolved',
    hapenning: 'hapenning',
    pending: 'pending'
}

const severity = {
    low: 'low',
    medium: 'medium',
    high: 'high'
}

const type = {
    police: 'local_police',
    firemen: 'local_fire_department',
    medical: 'local_hospital'
}

//begin seed
dbClient.connect(err => {
    const collection = dbClient.db(dbName).collection(occurrenceCollection);
    collection.estimatedDocumentCount((err, result) => {
        if (result == 0) {
            collection.insertMany([{
                    _id: 1,
                    title: 'Assalto a loja de roupas',
                    dateTime: Date.now() - 1000000,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus bibendum tincidunt. Suspendisse est augue, pharetra volutpat congue sit amet, tincidunt vel elit. Nunc porta lectus eget nisi porta, nec posuere diam porttitor. Ut ac elit accumsan, pellentesque dolor eget, maximus metus. Integer mattis vehicula nisl ac congue. Mauris at neque justo. Integer convallis quam dui, vel pulvinar tortor consequat sit amet. Mauris laoreet, mauris a tristique ultricies, ligula mauris tincidunt tortor. ',
                    location: { latitude: -3.7486207, longitude: -38.4939688, descricao: 'Antonio Sales, 3451' },
                    type: type.police,
                    severity: severity.low,
                    status: status.pending,
                    visibility: 1,
                    userId: 1,
                    creationDate: Date.now()
                },
                {
                    _id: 2,
                    title: 'Incêndio em prédio residencial',
                    dateTime: Date.now() - 2000000,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus bibendum tincidunt. Suspendisse est augue, pharetra volutpat congue sit amet, tincidunt vel elit. Nunc porta lectus eget nisi porta, nec posuere diam porttitor. Ut ac elit accumsan, pellentesque dolor eget, maximus metus. Integer mattis vehicula nisl ac congue. Mauris at neque justo. Integer convallis quam dui, vel pulvinar tortor consequat sit amet. Mauris laoreet, mauris a tristique ultricies, ligula mauris tincidunt tortor. ',
                    location: { latitude: -3.7136323, longitude: -38.5667309, descricao: 'Rua do Oriente, 1005 - Álvaro Weyne' },
                    type: type.firemen,
                    severity: severity.medium,
                    status: status.resolved,
                    visibility: 1,
                    userId: 1,
                    creationDate: Date.now()
                },
                {
                    _id: 3,
                    title: 'Incêndio em prédio residencial',
                    dateTime: Date.now() - 3000000,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus bibendum tincidunt. Suspendisse est augue, pharetra volutpat congue sit amet, tincidunt vel elit. Nunc porta lectus eget nisi porta, nec posuere diam porttitor. Ut ac elit accumsan, pellentesque dolor eget, maximus metus. Integer mattis vehicula nisl ac congue. Mauris at neque justo. Integer convallis quam dui, vel pulvinar tortor consequat sit amet. Mauris laoreet, mauris a tristique ultricies, ligula mauris tincidunt tortor. ',
                    location: { latitude: -3.7136323, longitude: -38.5667309, descricao: 'Rua do Oriente, 1005 - Álvaro Weyne' },
                    type: type.medical,
                    severity: severity.high,
                    status: status.hapenning,
                    visibility: 1,
                    userId: 1,
                    creationDate: Date.now()
                },
                {
                    _id: 4,
                    title: 'Incêndio em prédio residencial',
                    dateTime: Date.now() - 4000000,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus bibendum tincidunt. Suspendisse est augue, pharetra volutpat congue sit amet, tincidunt vel elit. Nunc porta lectus eget nisi porta, nec posuere diam porttitor. Ut ac elit accumsan, pellentesque dolor eget, maximus metus. Integer mattis vehicula nisl ac congue. Mauris at neque justo. Integer convallis quam dui, vel pulvinar tortor consequat sit amet. Mauris laoreet, mauris a tristique ultricies, ligula mauris tincidunt tortor. ',
                    location: { latitude: -3.7136323, longitude: -38.5667309, descricao: 'Rua do Oriente, 1005 - Álvaro Weyne' },
                    type: type.firemen,
                    severity: severity.medium,
                    status: status.resolved,
                    visibility: 1,
                    userId: 1,
                    creationDate: Date.now()
                },
                {
                    _id: 5,
                    title: 'Incêndio em prédio residencial',
                    dateTime: Date.now() - 50000000,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus bibendum tincidunt. Suspendisse est augue, pharetra volutpat congue sit amet, tincidunt vel elit. Nunc porta lectus eget nisi porta, nec posuere diam porttitor. Ut ac elit accumsan, pellentesque dolor eget, maximus metus. Integer mattis vehicula nisl ac congue. Mauris at neque justo. Integer convallis quam dui, vel pulvinar tortor consequat sit amet. Mauris laoreet, mauris a tristique ultricies, ligula mauris tincidunt tortor. ',
                    location: { latitude: -3.7136323, longitude: -38.5667309, descricao: 'Rua do Oriente, 1005 - Álvaro Weyne' },
                    type: type.firemen,
                    severity: severity.medium,
                    status: status.resolved,
                    visibility: 1,
                    userId: 1,
                    creationDate: Date.now()
                },
                {
                    _id: 6,
                    title: 'Incêndio em prédio residencial',
                    dateTime: Date.now() - 6000000,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus bibendum tincidunt. Suspendisse est augue, pharetra volutpat congue sit amet, tincidunt vel elit. Nunc porta lectus eget nisi porta, nec posuere diam porttitor. Ut ac elit accumsan, pellentesque dolor eget, maximus metus. Integer mattis vehicula nisl ac congue. Mauris at neque justo. Integer convallis quam dui, vel pulvinar tortor consequat sit amet. Mauris laoreet, mauris a tristique ultricies, ligula mauris tincidunt tortor. ',
                    location: { latitude: -3.7136323, longitude: -38.5667309, descricao: 'Rua do Oriente, 1005 - Álvaro Weyne' },
                    type: type.firemen,
                    severity: severity.medium,
                    status: status.resolved,
                    visibility: 1,
                    userId: 1,
                    creationDate: Date.now()
                },
                {
                    _id: 7,
                    title: 'Incêndio em prédio residencial',
                    dateTime: Date.now() - 7000000,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus bibendum tincidunt. Suspendisse est augue, pharetra volutpat congue sit amet, tincidunt vel elit. Nunc porta lectus eget nisi porta, nec posuere diam porttitor. Ut ac elit accumsan, pellentesque dolor eget, maximus metus. Integer mattis vehicula nisl ac congue. Mauris at neque justo. Integer convallis quam dui, vel pulvinar tortor consequat sit amet. Mauris laoreet, mauris a tristique ultricies, ligula mauris tincidunt tortor. ',
                    location: { latitude: -3.7136323, longitude: -38.5667309, descricao: 'Rua do Oriente, 1005 - Álvaro Weyne' },
                    type: type.firemen,
                    severity: severity.medium,
                    status: status.resolved,
                    visibility: 1,
                    userId: 1,
                    creationDate: Date.now()
                },
                {
                    _id: 8,
                    title: 'Incêndio em prédio residencial',
                    dateTime: Date.now() - 8000000,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus bibendum tincidunt. Suspendisse est augue, pharetra volutpat congue sit amet, tincidunt vel elit. Nunc porta lectus eget nisi porta, nec posuere diam porttitor. Ut ac elit accumsan, pellentesque dolor eget, maximus metus. Integer mattis vehicula nisl ac congue. Mauris at neque justo. Integer convallis quam dui, vel pulvinar tortor consequat sit amet. Mauris laoreet, mauris a tristique ultricies, ligula mauris tincidunt tortor. ',
                    location: { latitude: -3.7136323, longitude: -38.5667309, descricao: 'Rua do Oriente, 1005 - Álvaro Weyne' },
                    type: type.firemen,
                    severity: severity.medium,
                    status: status.resolved,
                    visibility: 1,
                    userId: 1,
                    creationDate: Date.now()
                },
            ], (err) => {
                if (err != null) {
                    console.log(err.message);
                }
            });
        }
    });
});
//end seed

function getCollection() {
    return dbClient.db(dbName).collection(occurrenceCollection);
}

updateOccurrenceInCollection = async (occurrence) => {
    const collection = getCollection();
    await collection.updateOne({_id: occurrence._id}, {
        $set: {
            title: occurrence.title,
            dateTime: occurrence.dateTime,
            description: occurrence.description,
            location: occurrence.location,
            type: occurrence.type,
            severity: occurrence.severity,
            status: occurrence.status,
            visibility: occurrence.visibility,
            userId: occurrence.userId,
            creationDate: occurrence.creationDate
        }
    });
}

addOccurrenceInCollection = async (occurrence) => {
    const collection = getCollection();
    lastid = await collection.find().sort({_id:-1}).limit(1)._id;
    occurrence._id=lastid+1;
    await collection.insertOne(occurrence);
}



deleteOccurrenceInCollection = async (occurrenceId) => {
    const collection = getCollection();
    await collection.deleteOne({_id: occurrenceId});
}

exports.getOccurrences = async(query) => {
    var occurrences = [];
    const collection = dbClient.db(dbName).collection(occurrenceCollection);
    occurrences = await collection.find(query).toArray();
    return occurrences;
}


exports.getOccurrencesBySeverity = async(severity, callback) => {
    return (await getOccurrences()).filter(occorrence => occorrence.severity === severity)[0];
}

exports.updateOccurrence = async(occurrence) => {
    await updateOccurrenceInCollection(occurrence);
}

exports.deleteOccurrence = async(occurrenceId) => {
    await deleteOccurrenceInCollection(occurrenceId);
}
exports.addOccurrence = async(occurrence) => {
    await addOccurrenceInCollection(occurrence);
}
