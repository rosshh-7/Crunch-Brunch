const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const { route } = require('./users');
const { Router, response } = require('express');
const { ObjectId } = require('bson');
const cartData = data.cart;
const menuData = data.menu;
const userData = data.user;
var Publishable_Key =
    'pk_test_51K0juZCsyI93mWA70otfl7zDJgeF6RXUZjSNpUk20pDMRV7Ia6a5mqYOBCEr3aHp5Wh21CJQiDKdTTiIY7BmujbG00WCFZBW95';
var Secret_Key =
    'sk_test_51K0juZCsyI93mWA7U5FlUvzECuroJrru73V3MrVSWXfgVCY0xrANdpDqEEmzUTCGNeNwRlMAH0MtOMDJUJ9dfgar00yMxJKw4V';
const stripe = require('stripe')(Secret_Key);

var nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    let getCategory = await menuData.getAllCategory();

    // Moreover you can take more details from user
    // like Address, Name, etc from form
    var num = Math.floor(Math.random() * 90000) + 10000;

    if (req.session.user) {
        stripe.customers
            .create({
                email: req.body.stripeEmail,
                source: req.body.stripeToken,
            })
            .then((customer) => {
                return stripe.charges.create({
                    amount: req.session.user.cartvalue,
                    description: req.session.user.cartdescription, /// product names
                    currency: 'USD',
                    customer: customer.id,
                });
            })
            .then((charge) => {
                // req.session.user.paymentstatus=true;
                req.session.user.receipt = charge.receipt_url;
                //add entry to database
            })
            .then(() => {
                let order = cartData.UpdateOrderIdByUserId(
                    req.session.user.userId,
                    num
                );
            })
            .then(() => {
                let neworder = cartData.createOrder(
                    req.session.user.userId,
                    num
                );
            })
            .then(() => {
                let mailto = `${req.session.user.email}`;
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    secure: true,
                    auth: {
                        user: 'sudronikbusiness@gmail.com',
                        pass: '8454949819',
                    },
                });

                var mailOptions = {
                    from: 'sudronikbusiness@gmail.com',
                    to: mailto,
                    subject: 'Order placed: Everyday Brunch',
                    text:
                        'Thank For Ordering food with Everyday Brunch.\n We are delighted to have you with us. You can now view your order in the orders section.\n Also you can download your payment receipt from here:\n\n' +
                        req.session.user.receipt,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        //console.log('Email sent: ' + info.response);
                    }
                });
            })
            .then(() => {
                res.render('pages/orderplaced', {
                    order: num,
                    getCategory,
                    id: req.session.user.userId,
                });
            })
            .catch((err) => {
                res.render('pages/cart', {
                    failedtitle: 'Payment Failed, trying again in sometime',
                    getCategory,
                    id: req.session.user.userId,
                });
                // If some error occurs
                //res.send(err)
            });
    } else {
        res.send({ error: 'need to login to access this page' });
    }
});
module.exports = router;
