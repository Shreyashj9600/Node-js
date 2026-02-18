const express = require('express')
const app = express()

const session = require('express-session')
const MongoStore = require('connect-mongo').default


app.use(session({
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/sessiondb'
    })
}))

app.get('/', (req, res) => {
    if (req.session.username) {
        res.send(`<h1>Username from session : ${req.session.username}</h1>`)
    } else {
        res.send('<h1>No Username found in session.</h1>')
    }
});

app.get('/set-username', (req, res) => {
    req.session.username = 'shreyash'
    res.send('<h1>Username has been set in session.</h1>')

});

app.get('/get-username', (req, res) => {
    if (req.session.username) {
        res.send(`<h1>Username from session : ${req.session.username}</h1>`)
    } else {
        res.send('<h1>No Username found in session.</h1>')
    }
});

app.get('/destroy', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('faild to destroy session')
        }
        res.send('<h1>Session destroy successfully.</h1>')
    })
});

app.listen(3000, () => {
    console.log('server running on port 3000');
})
