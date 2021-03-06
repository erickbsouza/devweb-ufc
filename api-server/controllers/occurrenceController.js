const express = require('express')
const router = express.Router();
const occurrenceCollection = require('../model/occurrenceModel')
const accountService = require('../services/accountService')
const occurrenceService = require('../services/occurrenceService')

router.get('/', async(req, res) => {
    var occurrences = await occurrenceService.getOccurrencesMain();
    res.send(occurrences);
})

router.get('/occurrenceId/:occurrenceId', async(req, res) => {
    var occurrence = await occurrenceService.getOccurrenceById(req.params.occurrenceId);
    if (occurrence != null) {
        res.send(occurrence);
    } else {
        res.sendStatus(404);
    }
})

router.post('/', async (req, res) => {
    if (req.headers.authorization) {
        token = req.headers.authorization;
        user = await httpService.get(`${httpService.domain}/api/account/sign-in`, token);
        occurrence = {
            title: req.body.title,
            dateTime: req.body.dateTime,
            description: req.body.description,
            location: { latitude: req.body.latitude, longitude:req.body.longitude, descricao:req.body.descricao },
            type: req.body.type,
            severity: req.body.severity,
            status: req.body.status,
        };
        if (user && (user.profile=="creator" || user.profile =="reviewer")) {
            var insertedId = await occurrenceService.addOccurrence(occurrence, user._id);
            res.send({insertedId: insertedId});
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
});

router.get('/review', async(req, res) => {
    if (req.headers.authorization) {
        token = req.headers.authorization;
        user = await accountService.getAuthenticatedReviewerUser(token);
        if (user) {
            occurrencesForReview = await occurrenceService.getOccurrencesForReview();
            res.send(occurrencesForReview);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
})

router.get('/search', async(req, res) => {
    result = await occurrenceService.searchOccurrences(req.query);
    res.send(result);
})

router.put('/', async(req, res) =>{
    if (req.headers.authorization) {
        token = req.headers.authorization;
        user = await accountService.getAuthenticatedReviewerUser(token);
        if (user) {
            var editJson = req.body;
            await occurrenceService.editOccurrence(editJson);
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
})
router.patch('/toggle-visibility', async(req, res) =>{
    if (req.headers.authorization) {
        token = req.headers.authorization;
        user = await accountService.getAuthenticatedReviewerUser(token);
        if (user) {
            await occurrenceService.toggleOccurrenceVisibility(parseInt(req.body.occurrenceId));
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }    
})

router.delete('/:occurrenceId', async(req, res) =>{
    if (req.headers.authorization) {
        token = req.headers.authorization;
        user = await accountService.getAuthenticatedReviewerUser(token);
        if (user) {
            await occurrenceService.deleteOccurrence(parseInt(req.params.occurrenceId));
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
    
})

module.exports = router;