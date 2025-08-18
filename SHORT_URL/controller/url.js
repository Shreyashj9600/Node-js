const { nanoid } = require('nanoid')
const URL = require('../model/url')

async function handelGenerateNewShortUrl(req, res) {
    const body = req.body
    if (!body.url) return res.status(400).json({ error: "url is required" })
    const shortId = nanoid(8)

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.json({ id: shortId })
}

async function handelGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })

    return res.json({
        totalCliks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

async function handelGenerateShortId(req, res) {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        },
    })
    res.redirect(entry.redirectURL)
}

module.exports = {
    handelGenerateNewShortUrl,
    handelGenerateShortId,
    handelGetAnalytics
}