import express from "express";
const router = express.Router();
import borrowerModel from "../models/borrower.js";

router.get("/", async (req,res) =>{
    try{
        const data = await borrowerModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                //finding transaction of borrower 
                $lookup: {
                    from: "transactions",
                    localField: "_id",
                    foreignField: "borrowerId",
                    as: "transaction",
                    pipeline: [
                            {
                                $project: {
                                    borrowerId: 0,
                                    transactionId: 0,
                                    isDeleted: 0,
                                    __v: 0,
                                },
                            },
                        {
                            //finding books of a borrower
                            $lookup: {
                                from: "books",
                                localField: "bookId",
                                foreignField: "_id",
                                as: "books",
                                pipeline: [
                                    {
                                        $project: {
                                            publisherId: 0,
                                            authorId: 0,
                                            isDeleted: 0,
                                            __v: 0,
                                        },
                                    },
                                ],
                            },
                        },
                    ],
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
    const data = await borrowerModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await borrowerModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await borrowerModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await borrowerModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;