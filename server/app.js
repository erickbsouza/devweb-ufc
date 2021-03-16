const express = require('express')
var bodyParser = require('body-parser');
const middlewares = require('./services/middlewares')
const home = require('./controllers/homeController')
const account = require('./controllers/accountController')
const occurrence = require('./controllers/occurrenceController')
const newoccurrence = require('./controllers/occurrenceController')
const app = express()
app.set('view engine', 'ejs');
const port = 3000
app.use(express.static('public'));
app.use(middlewares.injectCustomRender)
app.use(middlewares.parseCookie)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', home);

app.use('/account', account);

app.use('/occurrence', occurrence);

app.use('/create', newoccurrence);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})