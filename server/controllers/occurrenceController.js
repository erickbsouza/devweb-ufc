const express = require('express')
const router = express.Router();
const occurrenceCollection = require('../model/occurrenceModel')
const accountService = require('../services/accountService')
const occurrenceService = require('../services/occurrenceService')

router.get('/', async(req, res) => {
    setTimeout(async () => {
        occurrence = await occurrenceCollection.getOccurrences();
        if (occurrence != null) {
            console.log(occurrence.length)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(occurrence));
        } else {
            res.redirect('/erro');
        }
    }, 2000);
})

router.get('/create', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedUser(token);
        if (user) {
            res.customRender('novaocorrencia/index', user, {});
        } else {
            res.customRender('home/index', null, {})
        }
    } else if (req.query.loginFailed == 1) {
        res.customRender('home/index', null, { loginFailed: 1 });
    } else {
        res.customRender('home/index', null, {})
    }
})

router.post('/create2', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedUser(token);
        occurrence = {
            title: req.body.title,
            dateTime: req.body.dateTime,
            description: req.body.description,
            location: { latitude: req.body.latitude, longitude:req.body.longitude, descricao:req.body.descricao },
            type: req.body.type,
            severity: req.body.severity,
            status: req.body.status,
        };
       
        if (user && user.profile=="creator" || user.profile =="reviewer") {
            await occurrenceService.addOccurrence(occurrence, user._id)
            res.customRender('novaocorrencia/index', user, {});
        } else {
            res.customRender('home/index', null, {})
        }
    } else if (req.query.loginFailed == 1) {
        res.customRender('home/index', null, { loginFailed: 1 });
    } else {
        res.customRender('home/index', null, {})
    }
})




module.exports = router;