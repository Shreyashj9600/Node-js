const User = require("../models/user");
const { param } = require("../routes/user");

async function handelGetAllUser(req, res) {
    const allDbUser = await User.find({});
    return res.json(allDbUser);
}

async function handelGetUserById(req, res) {
    const id = Number(req.params.id);
    const user = User.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
}

async function handelUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ status: "Success" });
}

async function handelDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    res.json({ status: "Success" });
}

async function handelCreateNewUser(req, res) {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields are req..." });
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    console.log("result", result);

    return res.status(201).json({ status: "success", id: result._id });
}

module.exports = {
    handelGetAllUser,
    handelGetUserById,
    handelUpdateUserById,
    handelDeleteUserById,
    handelCreateNewUser
};
