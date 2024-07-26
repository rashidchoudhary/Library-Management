import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: { type: String, required: true},
    genre: { type: String, required: true},
    ISBN: { type: String, required: true, unique: true},
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Author"},
    publisherId: { type: mongoose.Schema.Types.ObjectId,  ref: "Publisher"},
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Book", schema);