import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    chatrooms: {
        type: [mongoose.Schema.Types.ObjectId],
        references: "Conversation",
        default: []
    },
})

export default mongoose.model("User", userSchema);
