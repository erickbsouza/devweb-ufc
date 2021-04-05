const express = require('express')
const router = express.Router();
const httpService = require('../services/httpService');

router.get('/', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await httpService.get(`${httpService.domain}/api/account/sign-in`, token)
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