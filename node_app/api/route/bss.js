const express = require('express')
const router = express.Router()
const bss = require('./../../module/bss')

router.post('/getUserPeriodData' ,async (req, res) => {
    const acc = req.body.userAccount
    if(acc == undefined){
        res.status(404).json({
            code: -2,
            msg: 'You do not fill account = =',
            data: {}
        })
    }

    const result = await bss.getUserPeriodData(acc)
    res.json(
        result
    )
})

router.post('/getAllUserPeriodData' ,async (req, res) => {

    const result = await bss.getAllUserPeriodData()
    res.json(
        result
    )
})

router.post('/getEnablePeriodData' ,async (req, res) => {
    const cid = req.body.classroomID

    const result = await bss.getEnablePeriodData(cid)
    res.json(
        result
    )
})

router.post('/getAllEnablePeriodData' ,async (req, res) => {

    const result = await bss.getAllEnablePeriodData()
    res.json(
        result
    )
})

router.post('/setEnablePeriod' ,async (req, res) => {
    const cid = req.body.classroomID
    const PeriodText = req.body.enablePeriod
    const result = await bss.setEnablePeriod(cid, PeriodText)
    res.json({
        result
    })
})

router.post('/sendApply' ,async (req, res) => {
    const cid = req.body.classroomID
    const date = req.body.selectedPeriod.day
    const start = req.body.selectedPeriod.startPeriod
    const end = req.body.selectedPeriod.endPeriod
    const uid = req.body.userAccount

    const result = await bss.sendApply(cid, uid, date, start, end)
    res.json({
        code: 200
    })
})

router.post('/cancelApply' ,async (req, res) => {
    const reser_id = req.body.pid

    const result = await bss.cancelApply(reser_id)
    res.json({
        code: 200
    })
})

router.post('/deletePeriodData' ,async (req, res) => {
    const reser_id = req.body.pid

    const result = await bss.deletePeriodData(reser_id)
    res.json({
        code: 200
    })
})

router.post('/LendKey' ,async (req, res) => {
    const reser_id = req.body.pid

    const result = await bss.LendKey(reser_id)
    res.json({
        code: 200
    })
})

router.post('/ReceiveKey' ,async (req, res) => {
    const reser_id = req.body.pid

    const result = await bss.ReceiveKey(reser_id)
    res.json({
        code: 200
    })
})

router.post('/acceptRequest' ,async (req, res) => {
    const reser_id = req.body.pid

    const result = await bss.acceptRequest(reser_id)
    res.json({
        code: 200
    })
})

router.post('/rejectRequest' ,async (req, res) => {
    const reser_id = req.body.pid

    const result = await bss.rejectRequest(reser_id)
    res.json({
        code: 200
    })
})

router.post('/getAllUserPoint' ,async (req, res) => {

    const result = await bss.getAllUserPoint()
    res.json(
        result
    )
})

router.post('/getUserPoint' ,async (req, res) => {
    const uid = req.body.account

    const result = await bss.getUserPoint(uid)
    res.json(
        result
    )
})

router.post('/setUserPoint' ,async (req, res) => {
    const uid = req.body.account
    const point = req.body.point

    const result = await bss.setUserPoint(uid, point)
    res.json(
        result
    )
})

router.post('/setUserBanState' ,async (req, res) => {
    const uid = req.body.account
    const state = req.body.state

    const result = await bss.setUserBanState(uid, state)
    res.json(
        result
    )
})

router.post('/getIsSave' ,async (req, res) => {
    const uid = req.body.userAccount
    const cid = req.body.classroomID

    const result = await bss.getIsSave(uid, cid)
    res.json(
        result
    )
})

router.post('/addSave' ,async (req, res) => {
    const uid = req.body.userAccount
    const cid = req.body.classroomID

    const result = await bss.AddSave(uid, cid)
    res.json(
        result
    )
})

router.post('/romoveSave' ,async (req, res) => {
    const uid = req.body.userAccount
    const cid = req.body.classroomID

    const result = await bss.romoveSave(uid, cid)
    res.json(
        result
    )
})

router.post('/getAllSave' ,async (req, res) => {
    const uid = req.body.userAccount

    const result = await bss.getAllSave(uid)
    res.json(
        result
    )
})

module.exports = router
