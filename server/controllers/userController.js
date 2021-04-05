const { response } = require('express');
const md5 = require('md5')
const express = require('express')
const router = express.Router();
const httpService = require('../services/httpService');

router.get('/all', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        users = await httpService.get(`${httpService.domain}/api/account/all`, token);
        if (users != null) {
            console.log(users);
            res.customRender('user/all', users, { users: users });
        } else {
            console.log("Falhou em encontrar usuarios")
        }
    } else {
        res.redirect('/');
    }

})

router.post('/delete-user', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await httpService.get(`${httpService.domain}/api/account/sign-in`, token);
        if (user != null) {
            console.log(user.email);
            console.log(user.id);
            await httpService.delete(`${httpService.domain}/api/account/remove-user`, user.token);
            res.redirect('/');
        } else {
            res.redirect('/account/logout');
        }
    } else {
        res.redirect('/');
    }

})

module.exports = router;