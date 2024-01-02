const express = require('express')
const router = express.Router()
const JWT = require('./../../module/jwt')
const user = require('./../../module/user')

//註冊部分
router.post('/userRegister' ,async (req, res) => {
    //取得輸入的資訊
    const body = req.body
    if(body && body.account && body.password){
        //取得使用者輸入的帳號、密碼、密碼提示
        const result = await user.register(body.account, body.password, body.hint)
        //成功註冊
        if(result){
            res.json({
                status: 0,
                msg: "Success"
            })
            return
        }
    }
    //因帳號重複而註冊失敗
    res.json({
        status: -2,
        msg: 'Duplicate account',
        data: {}
    })
})
//登入部分
router.post('/userLogin', async (req, res) => {
    //取得輸入的資訊
    const body = req.body
    if(body && body.account && body.password){
        //取得使用者的帳號、密碼
        const result = await user.login(body.account, body.password)
        if(result.userId){
            const token = JWT.signJWT(result)
            res.cookie('jwt', token, {
                maxAge: (new Date()).getTime() / 1000 + 1000 * 3600 * 24 * 30,
                path: '/',
                sameSite: 'none', secure: true, httpOnly: true,
                domain: 'qiuye.mooo.com'
            })

            res.json({
                status: 0,
                msg: "Success",
                level: result.level
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
//密碼提示部分
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