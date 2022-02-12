const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const favData = data.favorites;
const xss = require('xss');


router.post('/',async(req,res)=>{
if(req.session.user){
    let itemId=xss(req.body['itemId'])
    
    let userId=req.session.user.userId
    let added=await favData.addFavorite(userId, itemId)
    if(added.addedtoFavorite==true){
        res.send({success:true})
    }else if(added.addedtoFavorite==522){
        res.send({success:522})
    }else if(added.addedtoFavorite==523){
        res.send({success:523})
    }
else {
    res.send({success:added.addedtoFavorite})
}

} else{
    res.send({success:false})
}
})

router.post('/delete',async(req,res)=>{
    if(req.session.user){
        try{
    let id=xss(req.body['itemid'])
    let deleted=await favData.removeFavorite(req.session.user.userId,id)
            if(deleted.deletedfromFavorite){
                res.send({success:true})
            }

}catch(err){
    console.log(err)
    res.send({success:err})
}
}
})


module.exports=router;