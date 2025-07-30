const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware -Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    fs.appendFile(
        "log.txt",
        `\n${Date.now()} : ${req.method} : ${req.path}`,
        (err, data) => {
            next();
        }
    );
    // console.log('hello from middleware 1');
    // req.myUserName = "shreyash"
    // next()
});

app.use((req, res, next) => {
    console.log("hello from middleware 2");
    next();
});

// Routes
app.get("/user", (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
    res.setHeader('X-myName','shreyash jadhav')  // set header from send request | custom header
    // Always add X to custom headers
    console.log(req.headers)  // get headers from requert sending 
    return res.json(users);
});

app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        // TODO: Edit the user with id
        return res.json({ status: "Pending" });
    })
    .delete((req, res) => {
        // TODO: Delete the user with id
        return res.json({ status: "Pending" });
    });

app.post("/api/users", (req, res) => {
    // TODO: Create new user
    const body = req.body;
    // console.log(body)
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    });

    return res.status(201).json({ status: "Pending" });
});

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
