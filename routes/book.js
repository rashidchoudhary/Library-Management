import express from "express";
const router = express.Router();
import bookModel from "../models/book.js";
import { lookup } from "dns";

router.get("/", async (req,res) =>{
    try{
        const data = await bookModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                //joining author with books table
                $lookup: {
                    from: "authors",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                //joining publisher with books table
                $lookup: {
                    from: "publishers",
                    localField: "publisherId",
                    foreignField: "_id",
                    as: "publisher",
                },
            },
            {
                $unwind: "$author",
            },
            {
                $unwind: "$publisher",
            },
            {
                $project: {
                    isDeleted: 0,
                    __v: 0,
                    authorId: 0,
                    publisherId: 0,
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
    const data = await bookModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await bookModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await bookModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await bookModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;