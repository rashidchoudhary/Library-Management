import mongoose from "mongoose";

const schema = mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book"},
    borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: "Borrower"},
    borrowdate: { type: Date, required: true},
    returndate: { type: Date, required: true},
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Transaction", schema);