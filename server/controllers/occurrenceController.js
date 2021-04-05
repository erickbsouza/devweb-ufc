const express = require('express')
const router = express.Router();
const occurrenceCollection = require('../model/occurrenceModel')
const accountService = require('../services/accountService')
const occurrenceService = require('../services/occurrenceService')
const httpService = require('../services/httpService')

router.get('/', async(req, res) => {
    let occurrences = await httpService.get(`${httpService.domain}/api/occurrence`);
    if (occurrences != null) {
        occurrences = occurrences.filter((v) => v.visibility == 1);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(occurrences));
    } else {
        res.redirect('/erro');
    }
})

router.get('/create', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await httpService.get(`${httpService.domain}/api/account/sign-in`, token);
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
        if (user && user.profile == "creator" || user.profile == "reviewer") {
            await httpService.post(`${httpService.domain}/api/occurrence`, req.body, user.token);
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
        user = await httpService.get(`${httpService.domain}/api/account/revisor`, token);
        if (user) {
            occurrencesForReview = await httpService.get(`${httpService.domain}/api/occurrence/review`, user.token);
            res.customRender('occurrence/review', user, { occurrences: occurrencesForReview });
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
        user = await httpService.get(`${httpService.domain}/api/account/revisor`, user.token);
        if (user) {
            occurrence = await httpService.get(`${httpService.domain}/api/occurrence/occurrenceId/${req.query.occurrenceId}`, user.token);
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
        user = await httpService.get(`${httpService.domain}/api/account/revisor`, user.token);
        if (user) {
            await httpService.delete(`${httpService.domain}/api/occurrence/${req.params.occurrenceId}`, token);
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
        user = await httpService.get(`${httpService.domain}/api/account/revisor`, user.token);
        if (user) {
            await httpService.put(`${httpService.domain}/api/occurrence/toggle-visibility`, { occurrenceId: req.params.occurrenceId }, token);
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
        user = await httpService.get(`${httpService.domain}/api/account/revisor`, user.token);
        if (user) {
            var editJson = req.body;
            editJson._id = parseInt(req.params.id);
            await httpService.put(`${httpService.domain}/api/occurrence`, editJson, token);
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

router.get('/search', async(req, res) => {
    user = null;
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedUser(token);
    }
    result = await httpService.get(`${httpService.domain}/api/occurrence/search${queryObjectToQueryString(req.query)}`);
    res.customRender('home/searchedOccurrences', user, { searchedOccurrences: result })
})


queryObjectToQueryString = (query) => {
    let entries = Object.entries(query);
    let queryStr = '?';
    for (i = 0; i < entries.length; ++i) {
        let e = entries[i];
        queryStr += `${e[0]}=${e[1]}`;
        if (i < entries.length - 1) {
            queryStr += '&';
        }
    }
    return queryStr;
}


module.exports = router;