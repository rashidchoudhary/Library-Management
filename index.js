import express from "express";
import mongoose from "mongoose";
import authorRouter from "./routes/author.js";
import publisherRouter from "./routes/publisher.js";
import bookRouter from "./routes/book.js";
import borrowerRouter from "./routes/borrower.js";
import transactionRouter from "./routes/transaction.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/library_management_dev");

const connection = mongoose.connection;

connection.once("connected", () => console.log("Database Connected..."));

connection.on("error", (error) => console.log("Database Error: ", error));

app.use("/author", authorRouter);
app.use("/publisher", publisherRouter);
app.use("/book", bookRouter);
app.use("/borrower", borrowerRouter);
app.use("/borrower", borrowerRouter);
app.use("/transaction", transactionRouter);

app.listen(2020, () =>{
    console.log("Server is running on port 2020...")
});