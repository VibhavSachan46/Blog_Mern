const mongoose = require("mongoose")

const Post = new mongoose.Schema(
    {
        title:{
            type: String,
			required: true,
			trim: true,
        },
        summary:{
            type: String,
			required: true,
			trim: true,
        },
        content:{
            type: String,
			required: true,
			trim: true,
        },
        Author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        Tag:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
        },
        thumbnail:{
            type: String,
			required: true,
			trim: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comments',
            },
        ],
    }, {timestamps:true}
)

module.exports = mongoose.model("Post", Post)