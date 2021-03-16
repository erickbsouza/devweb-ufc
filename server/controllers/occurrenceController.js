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

router.get('/review', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedReviewerUser(token);
        if (user) {
            occurrencesForReview = await occurrenceService.getOccurrencesForReview();
            res.customRender('occurrence/review', user, {occurrences: occurrencesForReview});
        } else {
            res.customRender('home/index', null, {})
        }
    } else if (req.query.loginFailed == 1) {
        res.customRender('home/index', null, { loginFailed: 1 });
    } else {
        res.customRender('home/index', null, {})
    }
})

router.get('/edit-occurrence', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedReviewerUser(token);
        if (user) {
            occurrence = await occurrenceService.getOccurrenceById(parseInt(req.query.occurrenceId));
            res.customRender('occurrence/edit-occurrence', user, occurrence);
        } else {
            res.customRender('home/index', null, {})
        }
    } else if (req.query.loginFailed == 1) {
        res.customRender('home/index', null, { loginFailed: 1 });
    } else {
        res.customRender('home/index', null, {})
    }
})

router.get('/delete/:occurrenceId', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedReviewerUser(token);
        if (user) {
            await occurrenceService.deleteOccurrence(parseInt(req.params.occurrenceId));
            res.redirect('/occurrence/review');
        } else {
            res.customRender('home/index', null, {})
        }
    } else if (req.query.loginFailed == 1) {
        res.customRender('home/index', null, { loginFailed: 1 });
    } else {
        res.customRender('home/index', null, {})
    }
})

router.get('/toggle-visibility/:occurrenceId', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedReviewerUser(token);
        if (user) {
            await occurrenceService.toggleOccurrenceVisibility(parseInt(req.params.occurrenceId));
            res.redirect('/occurrence/review');
        } else {
            res.customRender('home/index', null, {})
        }
    } else if (req.query.loginFailed == 1) {
        res.customRender('home/index', null, { loginFailed: 1 });
    } else {
        res.customRender('home/index', null, {})
    }
})

router.post('/edit-occurrence/:id', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedReviewerUser(token);
        if (user) {
            var editJson = req.body;
            editJson._id = parseInt(req.params.id);
            await occurrenceService.editOccurrence(editJson);
            res.redirect('/occurrence/review');
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