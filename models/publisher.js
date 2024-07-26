import mongoose from "mongoose";

const schema = mongoose.Schema({
    publishername: { type: String, required: true},
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Publisher", schema);