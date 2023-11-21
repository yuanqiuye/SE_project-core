const express = require('express')
const router = express.Router()
const request = require('./../../module/request')

router.get('/current' ,async (req, res) => {
    const result = request.current_req(req.uid)
    res.json({
        status: 0,
        msg: "Success",
        requests: result
    })
})

module.exports = router