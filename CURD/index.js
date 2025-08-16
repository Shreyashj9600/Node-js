const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 4000

//connect mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/curd')
    .then(() => console.log('mongoDB is connected successfully'))
    .catch((err) => console.log('mongoDB Error', err))

//     
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    gender: {
        type: String
    }
})

//MODEL
const User = mongoose.model('user', userSchema)

// middelware 
app.use(express.urlencoded())

// Route
// create user  
app.post('/api/user', async (req, res) => {
    const body = req.body
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender
    })
    // console.log("result" , result)
    res.status(201).json({ msg: "user create successfully" })
})

app.get('/user', async (req, res) => {
    const allDbUser = await User.find({})
    const html = `
            <ul>
                ${allDbUser.map((user) => `<li>${user.firstName}<br> ${user.email} </li>`).join('')}
            </ul>
    `;
    return res.send(html)
})

app.get('/api/user', async (req, res) => {
    const allDbUser = await User.find({})
    return res.send(allDbUser)
})

app.route('/api/user/:id')
    .get(async (req, res) => {
        const uniqueUser = await User.findById(req.params.id)
        return res.json(uniqueUser)
    })
    .put(async (req,res) => {
        const allDbUser = await User.findByIdAndUpdate(req.params.id , {firstName:"chanded"})
        return res.json(allDbUser)
    })
    .delete(async (req,res) => {
        const allDbUser = await User.findByIdAndDelete(req.params.id)
        return res.json(allDbUser)
    })

app.listen(PORT, () => {
    console.log(`server started at PORT : ${PORT}`)
})