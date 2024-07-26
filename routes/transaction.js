import express from "express";
const router = express.Router();
import transactionModel from "../models/transaction.js";

router.get("/", async (req,res) =>{
    try{
        const data = await transactionModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                //joining transaction with borrower table
                $lookup: {
                    from: "borrowers",
                    localField: "borrowerId",
                    foreignField: "_id",
                    as: "borrower",
                },
            },
            {
                //joining transaction with books table
                $lookup: {
                    from: "books",
                    localField: "bookId",
                    foreignField: "_id",
                    as: "book",
                },
            },
            {
                $unwind: "$borrower",
            },
            {
                $unwind: "$book",
            },
            {
                $project: {
                    isDeleted: 0,
                    __v: 0,
                    classId: 0,
                    bookId: 0,
                    borrowerId: 0,
                },
            },
        ]);
        res.json({ message: "Data fetched successfully", data });
    } catch({message}){
        res.json({message});
    }
});

router.get("/:id", async (req,res) =>{
    try{
    const data = await transactionModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await transactionModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await transactionModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await transactionModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;