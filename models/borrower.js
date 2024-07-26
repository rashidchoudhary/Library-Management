import mongoose from "mongoose";

const schema = mongoose.Schema({
    borrowername: { type: String, required: true},
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Borrower", schema);