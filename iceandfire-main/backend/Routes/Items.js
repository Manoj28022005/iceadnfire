const express=require("express");
const router=express.Router();
const FoodItem=require('../modals/FoodItem');
const mongoose=require("mongoose");

// const item=require('../modals/FoodItem');

router.get('/food-item-names',async(req,res)=>{
    try{
        const items=await FoodItem.find({});
        // const names=items.map(item=>item.name);
        res.json(items);
    }catch(error){
        res.status(500).json({error:"An error occured while fetching"});
    }
});

module.exports=router;
