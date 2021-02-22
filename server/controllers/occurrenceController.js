const express = require('express')
const router = express.Router();
const occurrenceCollection = require('../model/occurrenceModel')

router.get('/', async(req, res) => {
    setTimeout(async () => {
        occurrence = await occurrenceCollection.getOccurrences();
        if (occurrence != null) {
            console.log(occurrence.length)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(occurrence));
        } else {
            res.redirect('/erro');
        }
    }, 2000);
})




module.exports = router;