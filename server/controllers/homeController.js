const express = require('express')
const accountService = require('../services/accountService')
const router = express.Router();
const occurrenceCollection = require('../model/occurrenceModel')

router.get('/', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedUser(token);
        if (user) {
            res.customRender('home/index', user, {});
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