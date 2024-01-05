const db = require('./database')

class BSS {
    toShowData(date){
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        if(currentDate.getDay() == 0 || currentDate.getDay() == 6){
            const currentDayOfWeek = currentDate.getDay();
            const daysUntilNextMonday = (1 + 7 - currentDayOfWeek) % 7;
            const nextMonday = new Date(date);
            nextMonday.setDate(date.getDate() + daysUntilNextMonday);
            const nextFriday = new Date(nextMonday);
            nextFriday.setDate(nextMonday.getDate() + 5);
            return date >= nextMonday && date <= nextFriday;
        }else{
            const currentDayOfWeek = currentDate.getDay();
            const daysUntilMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
            const currentMonday = new Date(currentDate);
            currentMonday.setDate(currentDate.getDate() - daysUntilMonday);
            const currentFriday = new Date(currentMonday);
            currentFriday.setDate(currentMonday.getDate() + 5);
            return date >= currentMonday && date <= currentFriday;
        }
    }

    processData(results){
        const ans = []
        results.forEach(result => {
            const currentTime = new Date()
            const startTime = new Date(result.start)
            const endTime = new Date(result.end)
            if (this.toShowData(startTime)){
                var status = 7
                if(result.review_id == 0){
                    status = 0
                }else if(result.review_id == -1){
                    status = 1
                }else if(currentTime < startTime && result.key_state == 0){
                    status = 2
                }else if(currentTime < startTime && result.key_state == -1){
                    status = 3
                }else if(currentTime > startTime && currentTime < endTime){
                    status = 4
                }else if(result.key_state == -1){
                    status = 5
                }else if(result.key_state == 1){
                    status = 6
                }
                ans.push({
                    "pid": result.reser_id,
                    "classroomID": result.cid,
                    "period": {
                        "startPeriod": result.start,
                        "endPeriod": result.end
                    },
                    "status": status
                })
            }
        })
        return ans
    }

    async getUserPeriodData(acc){
        const results = await db('reservation')
            .select()
            .where('uid', acc)
        if(results){
            return this.processData(results)
        }
        return {}
    }

    async getAllUserPeriodData(){
        const results = await db('reservation')
            .select()
        if(results){
            return this.processData(results)
        }
        return {}
    }

    async getEnablePeriodData(cid){
        const results = await db('enableTime')
            .select()
            .where("cid", cid)
        if(results[0]){
            return JSON.parse(results[0].PeriodText)
        }
        return {}
    }

    async getAllEnablePeriodData(){
        var results = await db('classroom')
            .select()
        const ans = {}
        if(results){
            results.forEach(result => {
                ans[result.code] = []
            })
        }
        results = await db('enableTime')
            .select()
        if(results[0]){
            results.forEach(result => {
                ans[result.cid] = JSON.parse(result.PeriodText)
            })
        }
        return ans
    }

    async setEnablePeriod(cid, enablePeriod){
        const result = await db('enableTime')
            .insert({
                cid: cid,
                PeriodText: JSON.stringify(enablePeriod) 
            })
            .onConflict('cid')
            .merge()
        if(result){
            return true
        }else{
            return false
        }
    }

    async sendApply(cid, uid, start, end){ 
        const now = new Date()
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const reser_id = `${uid}-${year}${month}${day}${hours}${minutes}${seconds}`;
        const result = await db('reservation')
            .insert({
                reser_id: reser_id,
                cid: cid,
                uid: uid,
                start: start,
                end: end,
                key_state: 0,
                review_id: 0
            })
        if(result){
            return true
        }else{
            return false
        }
    }

    async cancelApply(reser_id){
        const result = await db('reservation')
            .where('reser_id', reser_id)
            .del()
        if(result){
            return true
        }else{
            return false
        }
    }

    async deletePeriodData(reser_id){
        const result = await db('reservation')
            .where('reser_id', reser_id)
            .del()
        if(result){
            return true
        }else{
            return false
        }
    }

    async LendKey(reser_id){
        const result = await db('reservation')
            .where('reser_id', reser_id)
            .update({"key_state": -1})
        if(result){
            return true
        }else{
            return false
        }
    }

    async ReceiveKey(reser_id){
        const result = await db('reservation')
            .where('reser_id', reser_id)
            .update({"key_state": 1})
        if(result){
            return true
        }else{
            return false
        }
    }

    async acceptRequest(reser_id){
        const result = await db('reservation')
            .where('reser_id', reser_id)
            .update({"review_id": 1})
        if(result){
            return true
        }else{
            return false
        }
    }

    async rejectRequest(reser_id){
        const result = await db('reservation')
            .where('reser_id', reser_id)
            .update({"review_id": -1})
        if(result){
            return true
        }else{
            return false
        }
    }

    async getAllUserPoint(){
        const results = await db('user')
            .select()
        if(results[0]){
            var ans = []
            results.forEach(result => {
                ans.push({
                    'account': result.acc,
                    'role': 0,
                    'point': result.point,
                    'banned': result.banned
                })
            })
            return ans
        }
        return {}
    }

    async getUserPoint(uid){
        const results = await db('user')
            .where('acc', uid)
        if(results[0]){
            return {
                'point': results[0].point
            }
        }
        return {}
    }

    async setUserPoint(uid, point){
        const results = await db('user')
            .where('acc', uid)
            .update({"point": point})
        if(results){
            return {}
        }
        return {}
    }

    
    async setUserBanState(uid, banned){
        const results = await db('user')
            .where('acc', uid)
            .update({"banned": banned})
        if(results){
            return {}
        }
        return {}
    }

    async getIsSave(uid, cid){
        const results = await db('save')
            .where({
                uid: uid,
                cid: cid
            })
            .first()
        if(results){
            return true
        }
        return false
    }

    async AddSave(uid, cid){
        const results = await db('save')
            .insert({
                uid: uid,
                cid: cid
            })
        if(results){
            return {}
        }
        return {}
    }

    async romoveSave(uid, cid){
        const results = await db('save')
            .where({
                uid: uid,
                cid: cid
            })
            .del()
        if(results){
            return {}
        }
        return {}
    }

    async getAllSave(uid){
        var results = await db('classroom')
            .select()
        const ans = {}
        if(results){
            results.forEach(result => {
                ans[result.code] = false
            })
        }
        results = await db('save')
            .select()
            .where({
                uid: uid
            })
        if(results[0]){
            results.forEach(result => {
                ans[result.cid] = true
            })
        }
        return ans
    }
 
}

module.exports = new BSS()
