const express = require('express')
var bodyParser = require('body-parser');
const middlewares = require('./services/middlewares')
const home = require('./controllers/homeController')
const account = require('./controllers/accountController')
const user = require('./controllers/userController')
const occurrence = require('./controllers/occurrenceController')
const newoccurrence = require('./controllers/occurrenceController')
const app = express()
const port = 3030
app.use(middlewares.parseCookie)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/account', account);

app.use('/api/occurrence', occurrence);

app.use('/api/user', user)

app.listen(port, () => { 
    console.log(`Example app listening at http://localhost:${port}`)
})