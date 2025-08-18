const express = require('express')
const app = express();
const { connectToMongoDB } = require('./connect')
const urlRout = require('./routes/url')
const URL = require('./model/url')
const PORT = 8001

//connect to mongodb 
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('mongoDB is connected successfully'))
    .catch((err) => console.log('MongoDB Error', err))

//midelware
app.use(express.json())

app.use('/url', urlRout)

app.listen(PORT, () => {
    console.log(`server is started at PORT : ${PORT}`)
})