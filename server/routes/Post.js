const express = require("express")
const router = express.Router()

const {
    createTag, getAllTags, getTag
} = require("../controllers/Tag")

const {
    createPost, getAllPosts, getPost
} = require("../controllers/Post")

const { auth } = require("../middlewares/auth")


// Create Tag
router.post("/createTag", createTag)
router.get("/getAllTags", getAllTags)
router.get("/getTag/:id", getTag)


// Create Post
router.post("/createPost", auth, createPost)
router.get("/getAllPosts", getAllPosts)
router.get("/getPost/:id", getPost);

module.exports = router