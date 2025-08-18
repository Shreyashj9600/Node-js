const express = require("express");
const {
    handelGenerateNewShortUrl,
    handelGetAnalytics,
    handelGenerateShortId,
} = require("../controller/url");

const router = express.Router();

router.post("/", handelGenerateNewShortUrl);

router.get('/:shortId', handelGenerateShortId)

router.get("/analytics/:shortId", handelGetAnalytics);

module.exports = router;
