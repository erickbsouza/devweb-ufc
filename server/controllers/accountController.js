const { response } = require('express');
const md5 = require('md5');
const express = require('express')
const router = express.Router();
const multer = require('multer');
const httpService = require('../services/httpService');

router.post('/login', async(req, res) => {
    if (req.body) {
        try {
            user = await httpService.patch(`${httpService.domain}/api/account/login`, req.body);
            if (user) {
                res.cookie('token', user.token, { maxAge: user.expirationDate - Date.now() });
                res.redirect('/');
            } else {
                res.redirect('/?loginFailed=1');
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        res.sendStatus(404);
    }
})

router.get('/logout', async(req, res) => {
    await httpService.patch(`${httpService.domain}/api/account/logout`, {}, req.cookies.token);
    res.clearCookie('token');
    res.redirect('/');
})

router.get('/perfil', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await httpService.get(`${httpService.domain}/api/account/sign-in`, token);
        if (user != null) {
            res.customRender('user/perfil-user', user, { user: user });
        } else {
            res.redirect('/account/logout');
        }
    } else {
        res.redirect('/');
    }
})

router.post('/edit-user', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await httpService.get(`${httpService.domain}/api/account/sign-in`, token);
        if (user != null) {
            user.email = req.body.email;
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.nusuario = req.body.nusuario;
            user.telefone = req.body.telefone;
            await httpService.put(`${httpService.domain}/api/account/edit-user`, user, user.token);
            res.customRender('user/perfil-user', user, { user: user });
        } else {
            res.redirect('/account/logout');
        }
    } else {
        res.customRender('user/perfil-user.ejs', user, { user: user });
    }
})

// SET STORAGE
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/upload-images/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

var uploadPhoto = multer({ storage: storage })

router.post('/edit-user-photo', uploadPhoto.single('user-image'), async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        imagePath = `/upload-images/${req.file.filename}`
        user = await httpService.get(`${httpService.domain}/api/account/sign-in`, token)
        if (user != null) {
            user.foto = imagePath;
            await httpService.put(`${httpService.domain}/api/account/edit-user`, user, user.token);
            res.customRender('user/perfil-user', user, { user: user });
        } else {
            res.redirect('/account/logout');
        }
    } else {
        res.customRender('user/perfil-user.ejs', user, { user: user });
    }
})

router.post('/edit-pw', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await httpService.get(`${httpService.domain}/api/account/sign-in`, token);
        if (user != null) {
            if (md5(req.body.senha) != user.hash) {
                res.redirect('/account/logout');
            } else {
                user.hash = md5(req.body.novaSenha);
                await httpService.put(`${httpService.domain}/api/account/edit-user`, user, user.token);
                // requisicao
                res.customRender('user/perfil-user', user, { user: user });
            }
        } else {
            res.redirect('/account/logout');
        }
    } else {
        res.redirect('/');
    }
})

router.post('/create-account', async(req, res) => {
    if (req.body) {
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
        user = await httpService.post(`${httpService.domain}/api/account/create-user`, req.body);
        if (user) {
            res.cookie('token', user.token, { maxAge: user.expirationDate - Date.now() });
            res.redirect('/');
        } else {
            res.redirect('/?loginFailed=1');
        }
    } else {
        res.sendStatus(404);
    }
})


router.post('/delete-user', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await httpService.get(`${httpService.domain}/api/account/sign-in`, token)
        if (user != null) {
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