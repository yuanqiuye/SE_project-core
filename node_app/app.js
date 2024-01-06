const express = require('express')
const app = express()
const config = require('config')

app.use('/api', require('./api/init'))
app.use('/video', (req, res) => {
    res.redirect(301, 'https://www.youtube.com/watch?v=RitCvpvax9M')
})

app.all('*', (req, res) => {
    res.status(404).json({
        code: -2,
        msg: 'Not found',
        data: {}
    })
})

app.listen(5000, () => {
    console.log(`SE_project is listening on port 5000!`)
})
