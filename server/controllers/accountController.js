const { response } = require('express');
const express = require('express')
const accountService = require('../services/accountService')
const router = express.Router();

router.post('/login', async (req, res) => {
    if (req.body) {
        user = await accountService.authenticateUser(req.body.email, req.body.password);
        if (user) {
            res.cookie('token', user.token, {maxAge: user.expirationDate - Date.now()});
            res.redirect('/');
        }
        else {
            res.redirect('/?loginFailed=1');
        }
    }
    else {
        res.sendStatus(404);
    }
})

router.get('/logout', async (req, res) => {
    await accountService.endSession(req.cookies.token);
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = router;
