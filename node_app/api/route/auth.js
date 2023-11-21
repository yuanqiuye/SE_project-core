const express = require('express')
const router = express.Router()
const JWT = require('./../../module/jwt')
const user = require('./../../module/user')

router.post('/register' ,async (req, res) => {
    const body = req.body
    if(body && body.account && body.password){
        const result = await user.register(body.account, body.password, body.name, body.passwordTips)

        if(result){
            res.json({
                status: 0,
                msg: "Success"
            })
            return
        }
    }
    res.json({
        status: -2,
        msg: 'Invalid body',
        data: {}
    })
})

router.post('/login', async (req, res) => {
    const body = req.body
    if(body && body.account && body.password){
        const result = await user.login(body.account, body.password)

        if(result.userId){
            const token = JWT.signJWT(result)
            res.cookie('jwt', token, {
                maxAge: (new Date()).getTime() / 1000 + 1000 * 3600 * 24 * 30,
                path: '/',
                sameSite: 'none', secure: true, httpOnly: true
            })

            res.json({
                status: 0,
                msg: "Success",
                data: {
                    userId: result.userId,
                    name: result.name
                }
            })
            return
        }

        res.json({
            status: -1,
            msg: 'account or password wrong',
            data: {}
        })
        return
        
    }
    res.json({
        status: -2,
        msg: 'Invalid body',
        data: {}
    })
})


module.exports = router