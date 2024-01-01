const express = require('express')
const router = express.Router()
const JWT = require('./../../module/jwt')
const user = require('./../../module/user')

router.post('/userRegister' ,async (req, res) => {
    const body = req.body
    if(body && body.account && body.password){
        const result = await user.register(body.account, body.password, body.hint)

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
        msg: 'Duplicate account',
        data: {}
    })
})

router.post('/userLogin', async (req, res) => {
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
                msg: "Success"
            })
            return
        }

        res.json({
            status: -1,
            msg: 'account or password wrong'
        })
        return
    }
    res.json({
        status: -2,
        msg: 'Invalid body'
    })
})

router.post('/getPasswordHint', async (req, res) => {
    const body = req.body
    if(body.account){
        const result = await user.getHint(body.account)

        if(result.hint){
            res.json({
                status: 0,
                msg: "Success",
                hint: result.hint
            })
            return
        }

        res.json({
            status: -1,
            msg: 'account or password wrong'
        })
        return
    }
    res.json({
        status: -2,
        msg: 'Invalid body'
    })
})


module.exports = router