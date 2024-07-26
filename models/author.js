import mongoose from "mongoose";

const schema = mongoose.Schema({
    authorname: { type: String, required: true},
    authorbirth: { type: Date, required: true},
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Author", schema);