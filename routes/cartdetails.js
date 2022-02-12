const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const { safeAttrValue } = require('xss');
const cartData = data.cart;
const orderData = data.menu;
const xss = require('xss');

router.get('/', async (req, res) => {
    let getCategory = await orderData.getAllCategory();
    if (req.session.user) {
        //cart collection
        let cartdetails = await cartData.getCartUser(req.session.user.userId);

        if (cartdetails.length != 0) {
            let total = 0;
            for (let i = 0; i < cartdetails.length; i++) {
                total =
                    parseFloat(total) + parseFloat(cartdetails[i].totalcost);
            }

            let tax = parseFloat(0.05 * total);
            tax = tax.toFixed(2);
            total = total.toFixed(2);
            res.render('pages/cart', {
                cartdetails,
                tax,
                total,
                getCategory,
                id: req.session.user.userId,
            });
        } else {
            res.render('pages/cart', {
                NoCart: 'DANG!! Your Cart is Empty. Hurry Up!!',
                getCategory,
                id: req.session.user.userId,
            });
        }
    } else {
        res.render('pages/cart', {
            NoCart: 'You must be logged-in to able to use the cart',
            getCategory,
        });
    }
});

router.post('/delete', async (req, res) => {
    let deleteid = xss(req.body['delete']);
    if (req.session.user) {
        let cartdetails = await cartData.deleteCartItem(deleteid);
        if (cartdetails) {
            res.redirect('/cartpage');
        }
        //error while deleting
    }
});

module.exports = router;
