const express = require('express');
const urlRegex = require('url-regex');
const router = express.Router();
const {
    generateUrl,
    preservedUrls
} = require('../utils');

let Url = require('../model/url');

router.post('/new', (req, res, next) => {

    const token = req.headers.authorization;
    const destUrl = req.body.destUrl;

    // Validate URL existence
    if (!destUrl)
        return res.status(400).json({
            result: 'fail',
            error: 'No URL has been provided.'
        });

    // Validate URL
    const isValidUrl = urlRegex({
        exact: true,
        strict: false
    }).test(destUrl);
    if (!isValidUrl) return res.status(400).json({
        result: 'fail',
        error: 'URL is not valid.'
    });

    // validate URL length
    if (destUrl.length > 2000) {
        return res.status(400).json({
            result: 'fail',
            error: 'Maximum URL length is 2000.'
        });
    }

    const newUrl = new Url({
        destUrl: destUrl,
        shortId: generateUrl()
    });

    if (!token || typeof token === 'undefined') {
        newUrl.save((err, save) => {
            if (err)
                return res.status(403).json({
                    result: 'fail',
                    error: 'Server unreachable. Please try after some time.'
                });
            if (save)
                return res.status(200).json({
                    result: 'success',
                    createdAt: save.createdAt,
                    shortId: save.shortId,
                    shortUrl: 'https://srtt.me/' + save.shortId,
                    destUrl: destUrl
                });
        });
    }

});

router.get('*', function (req, res) {
    res.status(404).send('404 not found');
});

module.exports = router;