const express = require('express')
const router = express.Router()
const review = require('./../../module/review')

router.get('/list' ,async (req, res) => {
    const result = await review.get_list()
    res.json({
        status: 0,
        msg: "Success",
        requests: result
    })
})

router.post('/submit' ,async (req, res) => {
    const reser_id = req.body.request_id
    const accept = req.body.request_result
    const msg = req.body.review_msg

    const result = await review.submit_review(reser_id, accept, msg)
    res.json({
        status: 0,
        msg: "Success"
    })
})

module.exports = router