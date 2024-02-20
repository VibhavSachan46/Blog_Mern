const express = require("express")
const router = express.Router()

const {
    login,
    signup,
    getProfile,
    logout
} = require("../controllers/Auth")

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

//Route for getProfile
router.get("/getProfile", getProfile)

// Route for logout
router.post("/logout", logout)

module.exports = router