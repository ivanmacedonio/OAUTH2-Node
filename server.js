const express = require('express')
const app = express()
const crud = require('./Routes/Crud')
//middlewares
app.use(express.json())

//health check
app.get('/', (_req, res) => {
    return res.send("Alive!")
})

app.use('/', crud)

app.listen(3000, () => {
    console.log("Server is running on 3k")
})

