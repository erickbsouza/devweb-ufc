const { response } = require('express');
const md5 = require('md5');
const express = require('express')
const accountService = require('../services/accountService');
const router = express.Router();
const multer = require('multer');

router.post('/login', async(req, res) => {
    if (req.body) {
        user = await accountService.authenticateUser(req.body.email, md5(req.body.password));
        if (user) {
            res.send(user);
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
})

router.get('/revisor', async(req, res) => {
    if (req.headers.authorization) {
        user = await accountService.getAuthenticatedReviewerUser(req.headers.authorization);
        console.log(user);
        if (user) {
            res.send(user);
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
})

router.put('/logout', async(req, res) => {
    await accountService.endSession(req.headers.authorization);
    res.sendStatus(200);
})

router.get('/perfil', async(req, res) => {
    if (req.query.token || req.cookies.token) {
        token = req.query.token ? req.query.token : req.cookies.token;
        user = await accountService.getAuthenticatedUser(token);
        if (user != null) {
            //res.customRender('user/perfil-user', user, { user: user });
        } else {
            res.redirect('/account/logout');
        }
    } else {
        res.redirect('/');
    }
})

router.put('/edit-user', async(req, res) => {
    if (req.headers.authorization) {
        token = req.headers.authorization;
        user = await accountService.getAuthenticatedUser(token);
        if (user != null) {
            await accountService.editUser(req.body);
            res.sendStatus(200);
            //res.customRender('user/perfil-user', user, { user: user });
        } else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(401)
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
        await accountService.newUser(newUser);

        user = await accountService.authenticateUser(newUser.email, newUser.hash);
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

router.get('/all', async(req, res) => {
    if (req.headers.authorization) {
        token = req.headers.token;
        users = await accountService.getUsers();
        if (users != null) {
            console.log(users);
            res.send(users);
        } else {
            console.log("Falhou em encontrar usuarios")
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }

})


module.exports = router;