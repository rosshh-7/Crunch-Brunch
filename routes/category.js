const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.menu;
const xss = require('xss');

const fileUpload = require('express-fileupload');

router.get('/', async (req, res) => {
    try {
        let name = xss(req.query.name);
        if (req.session.user) {
            const menuData = await userData.getMenuByCategory(name);
            let getCategory = await userData.getAllCategory();
            if (menuData.length > 0) {
                res.render('pages/menu', {
                    pageHeading: `Menu for ${name}`,
                    data: menuData,
                    getCategory,
                });
            } else {
                res.render('pages/menu', {
                    pageHeading: `No Menu for ${name}`,
                    getCategory,
                });
            }
            //res.render('pages/menu',{pageHeading:`Menu for ${name}`,data:menuData,getCategory,id:req.session.user.userId});
        } else {
            const menuData = await userData.getMenuByCategory(name);
            let getCategory = await userData.getAllCategory();
            if (menuData.length > 0) {
                res.render('pages/menu', {
                    pageHeading: `Menu for ${name}`,
                    data: menuData,
                    getCategory,
                });
            } else {
                res.render('pages/menu', {
                    pageHeading: `No Menu for ${name}`,
                    getCategory,
                });
            }
        }
    } catch (error) {
        res.status(500).send({ errorMessage: error });
    } //res.json({menuData})
});

module.exports = router;
