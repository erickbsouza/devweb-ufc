const { response } = require('express');
const md5 = require('md5')
const express = require('express')
const accountService = require('../services/accountService')
const router = express.Router();

router.post('/login', async (req, res) => {
    if (req.body) {
        user = await accountService.authenticateUser(req.body.email, md5(req.body.password));
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
}})

router.post('/edit-user', async (req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedUser(token);       
        if (user!=null){
            user.email = req.body.email;
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.nusuario = req.body.nusuario;
            user.telefone = req.body.telefone;
            user.hash = md5(req.body.password);
            await accountService.editUser(user);
            res.customRender('user/perfil-user', user, {user:user});
        }
        else {
            res.redirect('/account/logout');
        }

    }
    res.customRender('user/perfil-user.ejs', user, {user: user});
})

router.post('/edit-pw', async (req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedUser(token);       
        if (user!=null){
            if (md5(req.body.senha) != user.hash){
                res.redirect('/account/logout');
            }
            else{
                user.hash = md5(req.body.novaSenha);
                await accountService.editUser(user);
                res.customRender('user/perfil-user', user, {user:user});
            }
        }
        else {
            res.redirect('/account/logout');
        }
    }
    else {
        res.redirect('/');
    }
})

router.post('/create-account', async (req, res) => {
    if (req.body){
        const newUser = {
            foto: '/images/user1-image.jpg',
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            nusuario: req.body.nusuario,
            telefone: req.body.telefone,
            hash: md5(req.body.password),
            profile: 'visitor',
            token: null,
            expirationDate: null
        }
        await accountService.newUser(newUser);

        user = await accountService.authenticateUser(newUser.email, newUser.hash);
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

module.exports = router;
