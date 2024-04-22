const Announcment = require('../models/announcmentModel');
const asyncHandler = require('express-async-handler')



const getAnnouncment = asyncHandler(async(req,res) =>{
   
    try{
       const announcment = await Announcment.find({})
       res.status(200).json(announcment)
    }
    catch(err){
      res.status(500);
      throw new Error(error.message);
    }
    
})

// get announcment by id

const getAnnouncById = asyncHandler( async(req,res) =>{
   
    try{
       const {id} = req.params;
       const announcment = await Announcment.findById(id)
       res.status(200).json(announcment)
    }
    catch(err){
      res.status(500);
      throw new Error(error.message);
    }
    
})

// update announcment

const updateAnnouncment = asyncHandler( async(req,res) =>{
   
    try{
       const {id} = req.params;
       const announcment = await Announcment.findByIdAndUpdate(id , req.body)
       if(!announcment){
        return res.status(404).json({message: "Can not find the product"})
       }
       const updatedValue = await Announcment.findById(id)
       res.status(200).json(updatedValue)
    }
    catch(err){
      res.status(500);
      throw new Error(err.message);
    }
    
})

// delete announcment

const deleteAnnouncment = asyncHandler( async(req,res) =>{
   
    try{
       const {id} = req.params;
       const announcment = await Announcment.findByIdAndDelete(id)
       if(!announcment){
        return res.status(404).json({message: `Can not find the product with this id:${id}`})
       }
       res.status(200).json(announcment)
    }
    catch(err){
      res.status(500);
      throw new Error(err.message);
    }
    
})

// send announcment to the database

const addAnnouncment = asyncHandler( async(req,res) =>{
   
    try{
       const announcment = await Announcment.create(req.body)
       res.status(200).json(announcment)
    }
    catch(err){
      res.status(500);
      throw new Error(err.message);
    }

    
})

module.exports ={
    getAnnouncById,
    getAnnouncment,
    updateAnnouncment,
    addAnnouncment,
    deleteAnnouncment
}