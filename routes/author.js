import express from "express";
const router = express.Router();
import authorModel from "../models/author.js";

router.get("/", async (req,res) =>{
    try{
        const data = await authorModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                //finding books of a author
                $lookup: {
                   from: "books",
                   localField: "_id",
                   foreignField: "authorId",
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
                $project: {
                    isDeleted: 0,
                    __v: 0,
                },
            },
        ])
        res.json({ message: "Data fetched successfully", data });
    } catch({message}){
        res.json({message});
    }
});

router.get("/:id", async (req,res) =>{
    try{
    const data = await authorModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await authorModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await authorModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await authorModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;