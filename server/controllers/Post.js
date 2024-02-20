const Post = require("../models/Post")
const User = require("../models/User")
const Tag = require("../models/Tag")
const mongoose = require('mongoose');

const { uploadImageToCloudinary } = require("../utils/imageUploader")

exports.createPost = async (req, res) => {
    try {
        console.log("Post Process started")
        // Get user ID from request object
        const userId = req.user.id;
        console.log("userId is ", userId)

        //Get all data from req.body
        let {
            title,
            summary,
            content,
            tag,
        } = req.body
        console.log(title, summary, content, tag)

        //get thumbnail from req.file
        // const thumbnail = req.files.thumbnail
        // console.log("thumbnail is" +thumbnail)

        const thumbnail = req.files && req.files.thumbnail;

        //validation. Sare field hone chahiye
        if (!title || !summary || !content || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            })
        }

        // check if tag is valid
        const TagDetails = await Tag.findById(tag)
        if (!TagDetails) {
            return res.status(404).json({
                success: false,
                message: "Tag Details Not Found",
            })
        }

        console.log(TagDetails)

        // upload the image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );
        console.log("Image uploaded");


        //create new post
        const newPost = await Post.create({
            title,
            summary,
            content,
            Tag: TagDetails.id,
            Author: userId,
            thumbnail: thumbnailImage.secure_url,
        })

        // Add Post to User Section
        try {
            await User.findByIdAndUpdate(
                {
                    _id: userId
                },
                {
                    $push: {
                        Posts: newPost._id,
                    },
                },
                { new: true }
            )
        }
        catch (errror) {
            return res.status(404).json({
                success: false,
                message: "Couldnot updated on user",
            })
        }

        // Add Post to Tag Section
        try {
            await Tag.findByIdAndUpdate(
                {
                    _id: tag
                },
                {
                    $push: {
                        Posts: newPost._id,
                    },
                },
                { new: true }

            )
        }
        catch (error) {
            return res.status(404).json({
                success: false,
                message: "could not updated on tag",
            })
        }

        // Return the new course and a success message
        res.status(200).json({
            success: true,
            data: newPost,
            message: "Post Created Successfully",
        });
    }
    catch (error) {
        // Handle any errors that occur during the creation of the course
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create Post",
            error: error.message,
        });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        console.log("Showing all Posts");

        const allPosts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate({
                path: 'Author',
                model: 'User', // Assuming your User model is named 'User'
                select: 'firstName lastName image', // Select the fields you want to populate
            })
            .populate({
                path: 'Tag',
                model: 'Tag', // Assuming your Tag model is named 'Tag'
                select: 'name description', // Select the fields you want to populate
            });

        res.status(200).json({
            success: true,
            data: allPosts,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getPost = async (req, res) => {
    try {
        console.log("Showing specific post");

        const postId = req.params.id; // Assuming you have the post ID in the request parameters
        const specificPost = await Post.findById(postId)
            .populate({
                path: 'Author',
                model: 'User', // Assuming your User model is named 'User'
                select: 'firstName lastName image', // Select the fields you want to populate
            })
            .populate({
                path: 'Tag',
                model: 'Tag', // Assuming your Tag model is named 'Tag'
                select: 'name description', // Select the fields you want to populate
            });

        if (!specificPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        res.status(200).json({
            success: true,
            data: specificPost,
        });
    } catch (error) {
        console.error('Error fetching specific post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch specific post',
            error: error.message,
        });
    }
};


exports.savedPost = async(req,res) =>{
    
}