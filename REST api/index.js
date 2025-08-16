const express = require('express')
const app = express()
const fs = require('fs')
const users = require('./MOCK_DATA.json')

const PORT = 8000

// middelware
app.use(express.urlencoded({ extended: false }))

//route              
app.get('/user', (req, res) => {
    const html = `
                <ul>
                    ${users.map((item) => `<li>${item.first_name}</li>`).join('')}
                </ul>
    `;
    res.send(html)
})

app.get('/api/user', (req, res) => {
    return res.json(users)
})

app.route('/api/user/:id')
    .get((req, res) => {
        //get user 
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
        return res.json(user)
    })
    .delete((req, res) => {
        // delete user 
        const id = Number(req.params.id)
        const deleteUser = users.findIndex((user) => user.id === id)
        if (deleteUser === -1) {
            return res.json({ status: "error", message: "User not found" });
        }
        users.splice(deleteUser, 1);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: "error", message: "Failed to save changes" });
            }
            console.log(`User with ID ${id} deleted`);
            return res.json({ status: "success", message: `User with ID ${id} deleted` });
        });
    })
    .put((req, res) => {
        // edit user 
        const id = Number(req.params.id)
        const updatedData = req.body;

        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        users[userIndex] = { ...users[userIndex], ...updatedData };
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: "error", message: "Failed to update user" });
            }
            console.log(`User with ID ${id} updated`);
            return res.json({ status: "success", data: users[userIndex] });
        });

    })

app.post('/api/user', (req, res) => {
    // create a new user 
    const data = req.body
    users.push({ ...data, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) console.log(err)
        console.log('data Addaded');
    })
    return res.json({ status: "success", id: users.length })
})

app.listen(PORT, () => {
    console.log(`server started at PORT : ${PORT}`)
})