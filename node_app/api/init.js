const express = require('express')
const cookieParser = require('cookie-parser')
const config = require('config')
const router = express.Router()
const JWT = require('./../module/jwt')

router.use(express.json())
router.use(cookieParser())

router.use(async (req, res, next) => {
    req.uid = -1

    const path = '' + req.path
    if (req.cookies && req.cookies.jwt) {
        const token = req.cookies.jwt
        
        const result = JWT.verifyJWT(token)
        if(result.userId){
            req.uid = result.userId
            req.level = result.level
        } 
    }
    if (path.startsWith('/auth') || req.uid > 0) return next()
    
    res.status(403).json({
        code: -1,
        msg: 'Access denied',
        data: {}
    })
})

router.use('/auth', require('./route/auth'))
router.use('/classroom', require('./route/classroom'))
router.use('/request', require('./route/request'))
router.use('/review', require('./route/review'))

router.all('*', (req, res) => {
    res.status(404).json({
        code: -2,
        msg: 'Not found',
        data: {}
    })
})

module.exports = router