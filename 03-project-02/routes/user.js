const express = require("express");
const {
    handelGetAllUser,
    handelGetUserById,
    handelUpdateUserById,
    handelDeleteUserById,
    handelCreateNewUser,
} = require("../controllers/user");
const router = express.Router();

router.route("/").get(handelGetAllUser).post(handelCreateNewUser);

router
    .route("/:id")
    .get(handelGetUserById)
    .patch(handelUpdateUserById)
    .delete(handelDeleteUserById);

router.post("/", handelCreateNewUser);

module.exports = router;
