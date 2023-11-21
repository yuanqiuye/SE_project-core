const db = require('./database')

class Request {
    async current_req(uid){
        const result = await db('reservation')
            .where({
                uid: uid
            })
        var ans = []
        for(var reser in result){
            var request_status = 1
            if(reser.review_id == null){
                request_status = 0
            }
            ans.push({
                id: reser.reser_id,
                request_status: request_status,
                classroomID: reser.cid,
                date: reser.date,
                start_period: reser.start,
                end_period: reser.end
            })
        }
        return ans
    }
 
}

module.exports = new Request()