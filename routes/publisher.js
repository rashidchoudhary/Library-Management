import express from "express";
const router = express.Router();
import publisherModel from "../models/publisher.js";

router.get("/", async (req,res) =>{
    try{
        const data = await publisherModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                //finding books of a publisher
                $lookup: {
                   from: "books",
                   localField: "_id",
                   foreignField: "publisherId",
                   as: "books",
                   pipeline: [
                    {
                        $project: {
                            authorId: 0,
                            publisherId: 0,
                            isDeleted: 0,
                            __v: 0,
                        },
                    },
                ], 
                },
            },
            {
                $unwind: "$books"
            },
            {
                $project: {
                    isDeleted: 0,
                    __v: 0,
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
    const data = await publisherModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await publisherModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await publisherModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await publisherModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;