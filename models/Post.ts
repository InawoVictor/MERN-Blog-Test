import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false
    },
},
{timestamps: true}
)

export default mongoose.models.Post || mongoose.model("Post", PostSchema);