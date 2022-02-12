const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.menu;

router.get('/', async (req, res) => {
    if (req.session.user) {
        try {
            const menuData = await userData.getAllMenu();

            let getCategory = await userData.getAllCategory();

            res.render('pages/menu', {
                pageHeading: 'Menu',
                data: menuData,
                getCategory,
                id: req.session.user.userId,
            });
        } catch (e) {
            res.render('pages/errors');
        }
    } else {
        const menuData = await userData.getAllMenu();

        let getCategory = await userData.getAllCategory();

        res.render('pages/menu', {
            pageHeading: 'Menu',
            data: menuData,
            getCategory,
        });
    }
});

module.exports = router;
