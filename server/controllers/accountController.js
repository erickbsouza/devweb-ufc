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

router.get('/perfil', async (req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedUser(token);
        if (user!=null){
            res.customRender('user/perfil-user', user, {user:user});
        }
        else {
            res.redirect('/account/logout');
        }
    }
    else {
        res.redirect('/');
    }

})

router.post('/salvar-alteracoes', async (req, res) => {
    const user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        number: req.body.number,
        description: req.body.description
    }
    res.customRender('user/perfil-user.ejs', user, {user: user});
})

module.exports = router;
