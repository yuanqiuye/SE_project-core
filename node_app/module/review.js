const db = require('./database')

class Request {
    async get_list(){
        const result = await db('reservation')
            .whereNull('review_id')
            var ans = []
        for(var reser in result){
            ans.push({
                id: reser.reser_id,
                userID: reser.uid,
                classroomID: reser.cid,
                date: reser.date,
                start_period: reser.start,
                end_period: reser.end
            })
        }
        return ans
    }

    async submit_review(reser_id, accept, msg){
        var result = await db('review')
            .insert({
                reser_id: reser_id,
                accept: accept,
                msg: msg
            })
        var review_id = result[0]
        result = await db('reservation')
            .where('reser_id', reser_id)
            .update('review_id', review_id)
        return true
    }
 
}

module.exports = new Request()