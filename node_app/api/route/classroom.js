const express = require('express')
const router = express.Router()
const classroom = require('./../../module/classroom')

router.get('/status/all' ,async (req, res) => {
    var result = await classroom.check_all()
    var classrooms = []
    for(var prop in result){
        classrooms.push({
            id: prop,
            classroom_status: result[prop]
        })
    }
    res.json({
        status: 0,
        msg: "Success",
        classrooms: classrooms
    })
})

router.get('/status' ,async (req, res) => {
    const class_id = req.query.id
    const result = await classroom.check_status(class_id)
    res.json({
        status: 0,
        msg: "Success",
        classroom_status: result
    })
})

router.post('/reserve' ,async (req, res) => {
    const class_id = req.query.id
    const date = req.body.date
    const start = req.body.start_period
    const end = req.body.end_period
    const result = classroom.make_reservation(class_id, req.uid, date, start, end)
    res.json({
        status: 0,
        msg: "Success",
        reservation_status: result
    })
})

module.exports = router
