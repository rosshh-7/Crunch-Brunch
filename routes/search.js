const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const xss = require('xss');
const userData = data.menu;

router.post('/', async(req,res)=>{

    try{
        let getCategory = await userData.getAllCategory();
    if(req.session.user){
    let searchTerm=xss(req.body['searchTerm']);

    let searchResult=await userData.search(searchTerm);
    if(searchResult.length>0){
        // render result page-------res.json({searchResult})
        res.render('pages/searchresult',{searchResult,pageHeading:`Search Result For: ${searchTerm}`,id:req.session.user.userId,getCategory})
    } else {
        ///no result page
        res.render('pages/searchresult',{searchResult,pageHeading:`NO Result For: ${searchTerm}`,id:req.session.user.userId,getCategory})
    }
    } else {
        let searchTerm=xss(req.body['searchTerm']);
        let getCategory = await userData.getAllCategory();
    let searchResult=await userData.search(searchTerm);
    if(searchResult.length>0){
        // render result page-------res.json({searchResult})
        res.render('pages/searchresult',{searchResult,pageHeading:`Search Result For: ${searchTerm}`,getCategory})
    } else {
        ///no result page
        res.render('pages/searchresult',{searchResult,pageHeading:`NO Result For: ${searchTerm}`,getCategory})
    }
    }
}catch(error){
    res.status(500).send({errorMessage:error})
}
});

module.exports=router;