const db = require('./database')

class Classroom {
    async check_status(cid){
        const result = await db('reservation')
            .select()
            .whereRaw('date = CURDATE()')
        if(result){
            return 1
        }
        return 0
    }

    async check_all(){
        const result = await db('classroom')
            .select('cid')
        var status = {}
        for(var cid in result){
            status[cid] = await this.check_status(cid)
        }
        return status
    }

    async make_reservation(cid, uid, date, start, end){
        const result = await db('reservation')
            .insert({
                cid: cid,
                uid: uid,
                date: Date(date),
                start: start,
                end: end
            })
        if(result){
            return true
        }else{
            return false
        }
    }
 
}

module.exports = new Classroom()