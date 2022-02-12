const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.menu;
const orderData=data.cart;
const sharp = require('sharp');
const fs = require('fs');
const fileUpload = require('express-fileupload');

router.get('/',async(req,res)=>{

    let getCategory = await userData.getAllCategory();
    let data=await orderData.getBestSeller();
  
    if(req.session.user){
    //let data=await orderData.getBestSeller();
   
    if(data==false){
        res.render('pages/bestSeller',{pageHeading:'Top Best Sellers: NO RESULT FOUND',getCategory,id:req.session.user.userId})
    }else{
    
    res.render('pages/bestSeller',{data,pageHeading:'Top Best Sellers of our Website',getCategory,id:req.session.user.userId})
   } } else {
   

       if(data==false){
           
        res.render('pages/bestSeller',{pageHeading:'Top Best Seller: NO RESULT FOUND',getCategory})
       }else {
        res.render('pages/bestSeller',{data,pageHeading:'Top Best Sellers of our Website',getCategory})
       }
    }
})


module.exports=router