const { response } = require('express');
const md5 = require('md5')
const express = require('express')
const accountService = require('../services/accountService')
const router = express.Router();






router.post('/delete-user', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedUser(token);
        if (user != null) {
            console.log(user.email);
            console.log(user.id);
            await accountService.deleteUser(user);
            res.redirect('/');
        } else {
            res.redirect('/account/logout');
        }
    } else {
        res.redirect('/');
    }

})

module.exports = router;