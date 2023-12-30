const db = require('./database')

class User {
    async register(user, pwd, pwdtips){
        const result = await db('user').
            upsert({
                acc: user,
                pwd: pwd,
                pwdtips: pwdtips
            })
        return result[0]
    }

    async login(usr, pwd){
        const result = await db("user").where({
            'acc': usr,
            'pwd': pwd
        }).first()

        if(result){
            return {
                userId: result.uid,
                name: usr,
                level: result.level
            }
        }
        return {}
    }

    async getHint(usr){
        const result = await db("user").where({
            'acc': usr
        }).first()
        if(result){
            return {
                hint: result.pwdtips
            }
        }
        return {}
    }
}

module.exports = new User()