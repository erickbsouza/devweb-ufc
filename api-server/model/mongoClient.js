const MongoClient = require('mongodb').MongoClient;
exports.uri = "mongodb+srv://devweb:devweb@cluster0.47ogr.mongodb.net/devweb?retryWrites=true&w=majority";
exports.options = { useNewUrlParser: true, useUnifiedTopology: true };
exports.client = new MongoClient(this.uri, this.options);
exports.dbName = 'db1';