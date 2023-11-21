const db = require('./database')

class User {
    async register(user, pwd, name, pwdtips){
        const result = await db('user').
            insert({
                acc: user,
                pwd: pwd,
                name: name,
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
}

module.exports = new User()