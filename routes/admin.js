const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.menu;
const orderData = data.cart;
const usersinfo = data.user;
const xss = require('xss');
//const orderinfo = data.cart;
const sharp = require('sharp');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const reviewData = data.reviews;

router.get('/dashboard', async (req, res) => {
    //admin session
    if (req.session.admin) {
        let allusers = await usersinfo.getAllUsers();
        let allorders = await orderData.getAllOrders();
        let allcategory = await userData.getAllCategory();
        let allMenu = await userData.getAllMenu();
        let usercount = allusers.length;
        let orercount = allorders.length;
        let catcount = allcategory.length;
        let menucount = allMenu.length;
        res.render('pages/admin_dashboard', {
            layout: 'adminhome',
            count1: usercount,
            count2: orercount,
            count3: catcount,
            count4: menucount,
            name: req.session.admin.name,
        });
    } else {
        res.render('pages/errors', {
            layout: 'adminhome',
            errors: 'Not Authorize to access this page without login',
        });
    }
});

router.get('/ViewCategory', async (req, res) => {
    if (!req.session.admin) {
        res.sendFile(path.resolve('static/forbidden.html'));
    } else {
        let getCategory = await userData.getAllCategory();
        res.render('pages/viewCategory', { layout: 'adminhome', getCategory });
    }
});

router.get('/home', async (req, res) => {
    if (!req.session.admin) {
        res.sendFile(path.resolve('static/forbidden.html'));
    } else {
        let getCategory = await userData.getAllCategory();
        res.render('pages/errors', { layout: 'adminhome' });
    }
});

router.get('/addCategory', async (req, res) => {
    if (!req.session.admin) {
        res.sendFile(path.resolve('static/forbidden.html'));
    } else {
        res.render('pages/addcategory', { layout: 'adminhome' });
    }
});

router.post('/AddCategory', async (req, res) => {
    if (!req.session.admin) {
        res.sendFile(path.resolve('static/forbidden.html'));
    } else {
        //render the page
        try {
            let uploadFile = req.files.menuFile;
            let category = xss(req.body['itemCategory']);
            let categoryImage = uploadFile.name;

            if (!category || !category.trim()) {
                res.status(400).render('pages/addCategory', {
                    layout: 'adminhome',
                    err: 'Provide valid Category Name',
                });
                return;
            }

            if (!categoryImage || !categoryImage.trim()) {
                if (!category || !category.trim()) {
                    res.status(400).render('pages/addCategory', {
                        layout: 'adminhome',
                        err: 'Provide valid Image for category',
                    });
                    return;
                }
                return;
            }

            let categorywithoutspaces = category.replace(/ /g, '');

            if (!/^[a-zA-Z]+$/.test(categorywithoutspaces)) {
                res.status(400).render('pages/addCategory', {
                    layout: 'adminhome',
                    err:
                        'Provide a Valid Category Name. NO SPECIAL CHARACTERS ONLY Alphabetic Characters',
                });
                return;
            }

            category = category.replace(/\s+/g, ' ').trim();

            let uploadpath = './public/images/Category/' + uploadFile.name;
            let ext = path.extname(uploadFile.name);
            const allowedExtension = /png|jpg|jpeg|JPG|PNG/;
            if (!allowedExtension.test(ext)) {
                throw 'Only png|jpg|jpeg|JPG|PNG types allowed';
            }

            //insert

            let add = await userData.addCategory(category, categoryImage);
            if (add.categoryInserted) {
                uploadFile.mv(uploadpath, function (err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    sharp(`./public/images/Category/${uploadFile.name}`)
                        .resize(500, 500)
                        .withMetadata()
                        .toBuffer(function (err, buffer) {
                            fs.writeFile(
                                `./public/images/Category/${uploadFile.name}`,
                                buffer,
                                function (e) {}
                            );
                        });
                    res.redirect('./ViewCategory');
                });
            } else {
            }
        } catch (error) {
            res.status(400).render('pages/addCategory', {
                layout: 'adminhome',
                err: error,
            });
        }
    }
});

router.get('/newMenu', async (req, res) => {
    if (!req.session.admin) {
        res.sendFile(path.resolve('static/forbidden.html'));
    } else {
        let getCategory = await userData.getAllCategory();
        res.render('pages/newMenu', { layout: 'adminhome', data: getCategory });
    }
    //render view page
});

router.post('/addMenu', async (req, res) => {
    if (!req.session.admin) {
        res.sendFile(path.resolve('static/forbidden.html'));
    } else {
        let getCategory = await userData.getAllCategory();
        try {
            let uploadFile = req.files.menuFile;
            let itemCategory = req.body['itemCategory'];
            let itemTitle = req.body['itemTitle'];
            let itemDescription = req.body['itemDescription'];
            let itemPrice = req.body['itemPrice'];
            let itemCalories = req.body['itemCalories'];
            let itemKeywords = req.body['itemKeywords'];
            let itemImage = uploadFile.name;

            if (!itemCategory || !itemCategory.trim()) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err: 'Provide valid Category for Menu Item',
                });
                return;
            }
            if (!itemTitle || !itemTitle.trim()) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err: 'Provide proper Title for Menu Item',
                });
                return;
            }

            if (!itemDescription || !itemDescription.trim()) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err: 'Provide valid Description for Menu Item',
                });
                return;
            }
            if (!itemPrice || !itemPrice.trim()) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err: 'Provide valid Price for Menu Item',
                });
                return;
            }
            if (!itemCalories || !itemCalories.trim()) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err: 'Provide valid Calories for Menu Item',
                });
                return;
            }
            if (!itemKeywords || !itemKeywords.trim()) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err: 'Provide valid Keywords for Menu Item',
                });
                return;
            }

            let reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$');
            let titlewithoutspaces = itemTitle.replace(/ /g, '');
            let checktitle = !/^[a-zA-Z]+$/.test(titlewithoutspaces);
            if (checktitle) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err:
                        'Select a Valid Title for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters',
                    category: userdetails.itemCategory,
                    title: userdetails.itemTitle,
                    description: userdetails.itemDescription,
                    price: userdetails.itemPrice,
                    calories: userdetails.itemCalories,
                    keywords: userdetails.itemKeywords,
                    image: userdetails.itemImage,
                    id: id,
                });
                return;
            }

            let descriptionwithoutspaces = itemDescription.replace(/ /g, '');
            if (!/^[a-zA-Z]+$/.test(descriptionwithoutspaces)) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err:
                        'Select a Valid description for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters',
                    category: userdetails.itemCategory,
                    title: userdetails.itemTitle,
                    description: userdetails.itemDescription,
                    price: userdetails.itemPrice,
                    calories: userdetails.itemCalories,
                    keywords: userdetails.itemKeywords,
                    image: userdetails.itemImage,
                    id: id,
                });
                return;
            }

            if (!reg.test(itemPrice)) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err:
                        'Select a Valid price for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES upto TWO DECIMALS',
                });
                return;
            }
            if (!reg.test(itemCalories)) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err:
                        'Select a Valid Calories for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES upto TWO DECIMALS',
                });
                return;
            }

            let keywordswithoutspaces = itemKeywords.replace(/ /g, '');
            if (!/^[a-zA-Z]+$/.test(keywordswithoutspaces)) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err:
                        'Provide Valid keywords for item. NO SPECIAL CHARACTERS Allowed, USE SPACE TO DISTINGUISH BETWEEN TWO WORDS. For Eg: bestdish spicy tangy',
                });
                return;
            }
            itemTitle = itemTitle.replace(/\s+/g, ' ').trim();
            itemDescription = itemDescription.replace(/\s+/g, ' ').trim();
            itemKeywords = itemKeywords.replace(/\s+/g, ' ').trim();
            itemKeywords = itemKeywords.replace(/ /g, '');
            itemCalories = parseFloat(itemCalories);
            itemPrice = parseFloat(itemPrice);

            let uploadpath = './public/images/Menu/' + uploadFile.name;
            let ext = path.extname(uploadFile.name);

            const allowedExtension = /png|jpg|jpeg|JPG|PNG/;
            if (!allowedExtension.test(ext)) {
                res.status(400).render('pages/newMenu', {
                    layout: 'adminhome',
                    data: getCategory,
                    err: 'Only these extensions allowed png|jpg|jpeg|JPG|PNG',
                });
                return;
            }

            let add = await userData.addMenu(
                itemCategory,
                itemTitle,
                itemDescription,
                itemPrice,
                itemCalories,
                itemImage,
                itemKeywords
            );

            if (add.menuInserted) {
                uploadFile.mv(uploadpath, function (err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    sharp(`./public/images/Menu/${uploadFile.name}`)
                        .resize(200, 200)
                        .withMetadata()
                        .toBuffer(function (err, buffer) {
                            fs.writeFile(
                                `./public/images/Menu/${uploadFile.name}`,
                                buffer,
                                function (e) {}
                            );
                        });
                    res.redirect('./viewMenu');
                });
            } else {
            }
        } catch (error) {
            res.status(500).render('pages/newMenu', {
                layout: 'adminhome',
                data: getCategory,
                err: error,
            });
        }
    }
});

router.get('/ViewMenu', async (req, res) => {
    //res.render('pages/ViewMenu')
    //render view page
    if (!req.session.admin) res.sendFile(path.resolve('static/forbidden.html'));
    let error = req.query['updatefailed'];

    let AllMenu = await userData.getAllMenu();

    let json = AllMenu;
    if (error == 'AkjsSHD897') {
        res.render('pages/ViewMenu', {
            layout: 'adminhome',
            json,
            error: true,
        });
    } else {
        res.render('pages/ViewMenu', { layout: 'adminhome', json });
    }
});

router.post('/update', async (req, res) => {
    //res.render('pages/ViewMenu')
    //render view page
    if (!req.session.admin) res.sendFile(path.resolve('static/forbidden.html'));
    id = xss(req.body['updateid']);
    let userdetails = await userData.getMenuItem(id);
    let getCategory = await userData.getAllCategory();
    let catArray = [];
    for (let i = 0; i < getCategory.length; i++) {
        if (getCategory[i].category == userdetails.itemCategory) {
        } else {
            catArray.push(getCategory[i]);
        }
    }

    res.render('pages/update', {
        layout: 'adminhome',
        data: catArray,
        category: userdetails.itemCategory,
        title: userdetails.itemTitle,
        description: userdetails.itemDescription,
        price: userdetails.itemPrice,
        calories: userdetails.itemCalories,
        keywords: userdetails.itemKeywords,
        image: userdetails.itemImage,
        id: id,
    });
});

router.post('/updateMenu', async (req, res) => {
    let catArray = [];
    let uploadFile;
    let itemImage;
    try {
        uploadFile = req.files.menuFile;
        itemImage = uploadFile.name;
    } catch (e) {
        uploadFile = null;
        itemImage = null;
    }
    let itemId = req.body['itemId'];
    try {
        let itemCategory = req.body['itemCategory'];
        let itemTitle = req.body['itemTitle'];
        let itemDescription = req.body['itemDescription'];
        let itemPrice = req.body['itemPrice'];
        let itemCalories = req.body['itemCalories'];
        let itemKeywords = req.body['itemKeywords'];

        // let userdetails = await userData.getMenuItem(itemId);

        let itemCategoryold = req.body['itemCategoryold'];
        let itemTitleold = req.body['itemTitleold'];
        let itemDescriptionold = req.body['itemDescriptionold'];
        let itemPriceold = req.body['itemPriceold'];
        let itemCaloriesold = req.body['itemCaloriesold'];
        let itemKeywordsold = req.body['itemKeywordsold'];
        let getCategory = await userData.getAllCategory();
        let userdetails = await userData.getMenuItem(itemId);
        for (let i = 0; i < getCategory.length; i++) {
            if (getCategory[i].category == itemCategoryold) {
            } else {
                catArray.push(getCategory[i]);
            }
        }

        if (!itemCategory || !itemCategory.trim()) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err: 'Provide valid Category for Menu Item',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }
        if (!itemTitle || !itemTitle.trim()) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err: 'Provide proper Title for Menu Item',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }

        if (!itemDescription || !itemDescription.trim()) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err: 'Provide valid Description for Menu Item',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }
        if (!itemPrice || !itemPrice.trim()) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err: 'Provide valid Price for Menu Item',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }
        if (!itemCalories || !itemCalories.trim()) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err: 'Provide valid Calories for Menu Item',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }
        if (!itemKeywords || !itemKeywords.trim()) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err: 'Provide valid Keywords for Menu Item',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }

        let reg = new RegExp('^[0-9]+(.[0-9]+)*$');
        let titlewithoutspaces = itemTitle.replace(/ /g, '');

        if (!/^[a-zA-Z]+$/.test(titlewithoutspaces)) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err:
                    'Select a Valid Title for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }

        let descriptionwithoutspaces = itemDescription.replace(/ /g, '');
        if (!/^[a-zA-Z]+$/.test(descriptionwithoutspaces)) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err:
                    'Select a Valid Title for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }

        if (!reg.test(itemPrice)) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err:
                    'Select a Valid price for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }
        if (!reg.test(`${itemCalories}`)) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err:
                    'Select a Valid Calories for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }

        let keywordswithoutspaces = itemKeywords.replace(/ /g, '');
        if (!/^[a-zA-Z]+$/.test(keywordswithoutspaces)) {
            res.status(400).render('pages/update', {
                layout: 'adminhome',
                data: catArray,
                err:
                    'Provide Valid keywords for item. NO SPECIAL CHARACTERS Allowed, USE SPACE TO DISTINGUISH BETWEEN TWO WORDS. For Eg: bestdish spicy tangy',
                category: userdetails.itemCategory,
                title: userdetails.itemTitle,
                description: userdetails.itemDescription,
                price: userdetails.itemPrice,
                calories: userdetails.itemCalories,
                keywords: userdetails.itemKeywords,
                image: userdetails.itemImage,
                id: id,
            });
            return;
        }
        itemTitle = itemTitle.replace(/\s+/g, ' ').trim();
        itemDescription = itemDescription.replace(/\s+/g, ' ').trim();
        itemKeywords = itemKeywords.replace(/\s+/g, ' ').trim();
        itemKeywords = itemKeywords.replace(/ /g, '');
        itemCalories = parseFloat(itemCalories);
        itemPrice = parseFloat(itemPrice);

        if (uploadFile) {
        } else {
            if (
                itemCategory == itemCategoryold &&
                itemTitle == itemTitleold &&
                itemDescription == itemDescriptionold &&
                itemPrice == itemPriceold &&
                itemCalories == itemCaloriesold &&
                itemKeywords == itemKeywordsold
            ) {
                res.status(400).render('pages/update', {
                    layout: 'adminhome',
                    data: catArray,
                    err: 'All Values are same as previous nothing to update',
                    category: userdetails.itemCategory,
                    title: userdetails.itemTitle,
                    description: userdetails.itemDescription,
                    price: userdetails.itemPrice,
                    calories: userdetails.itemCalories,
                    keywords: userdetails.itemKeywords,
                    image: userdetails.itemImage,
                    id: id,
                });
                return;
            }
        }

        let update = await userData.updateMenu(
            itemCategory,
            itemTitle,
            itemDescription,
            itemPrice,
            itemCalories,
            itemImage,
            itemKeywords,
            itemId
        );

        if (update.menuupdated) {
            if (uploadFile) {
                let uploadpath = './public/images/Menu/' + uploadFile.name;
                let ext = path.extname(uploadFile.name);
                const allowedExtension = /png|jpg|jpeg|JPG|PNG/;
                if (!allowedExtension.test(ext)) {
                    throw 'Only png|jpg|jpeg|JPG|PNG these extensions allowed';
                    //throw error
                }
                uploadFile.mv(uploadpath, function (err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    sharp(`./public/images/Menu/${uploadFile.name}`)
                        .resize(200, 200)
                        .withMetadata()
                        .toBuffer(function (err, buffer) {
                            fs.writeFile(
                                `./public/images/Menu/${uploadFile.name}`,
                                buffer,
                                function (e) {}
                            );
                        });
                    res.redirect('./ViewMenu');
                });
            } else {
                res.redirect('./ViewMenu');
            }
        } else {
            res.redirect('./ViewMenu');
        }
    } catch (error) {
        console.log(error);
        let userdetails = await userData.getMenuItem(itemId);
        res.status(400).render('pages/update', {
            layout: 'adminhome',
            data: catArray,
            err: error,
            category: userdetails.itemCategory,
            title: userdetails.itemTitle,
            description: userdetails.itemDescription,
            price: userdetails.itemPrice,
            calories: userdetails.itemCalories,
            keywords: userdetails.itemKeywords,
            image: userdetails.itemImage,
            id: itemId,
        });
    }
});

router.post('/deleteitem', async (req, res) => {
    //menu item delete
    let id = req.body['deleteid'];
    let image = req.body['image'];
    let uploadpath = './public/images/Menu/' + image;
    let deleted = await userData.deleteMenuItem(id);
    if (deleted) {
        fs.unlinkSync(uploadpath);
        res.redirect('./ViewMenu');
    }
});

router.post('/ViewMenuCategory', async (req, res) => {
    res.sendFile(path.resolve('static/forbidden.html'));
    try {
        let category = req.body['category'];
        let getCategory = await userData.getMenuByCategory(category);
    } catch (error) {
        res.status(500).send({ error: error });
    }
    //can get Menu items as per Category
});

router.post('/deleteCategory', async (req, res) => {
    let id = req.body['deleteid'];
    let category = req.body['deletecategory'];
    let getCategory = await userData.deleteCategory(id, category);
    let categoryimage = req.body['image'];
    let uploadpath = './public/images/Category/' + categoryimage;
    if (getCategory.delete == true) {
        res.redirect('./ViewCategory');
        fs.unlinkSync(uploadpath);
    } else if (getCategory.delete == false) {
        res.render('pages/viewCategory', {
            layout: 'adminhome',
            deleteerror: 'Failed to Delete due to some Internal Server Error',
        });
    } else {
        res.render('pages/viewCategory', {
            layout: 'adminhome',
            deleteerror:
                'Cannot Delete Category Directly as it Menu items attached to its Nanme. If you still want to delete the category first delete all Menu items related to this name.',
        });
    }
    //can get Menu items as per Category
});

router.get('/viewAdvertise', async (req, res) => {
    if (!req.session.admin) res.sendFile(path.resolve('static/forbidden.html'));
    //render the page showing all advertisements added
    let advertisedata = await userData.getAdvertise();
    let json = advertisedata;
    res.render('pages/viewAdvertise', {
        layout: 'adminhome',
        json,
        advertisedata,
    });
});

router.get('/addAdd', async (req, res) => {
    if (!req.session.admin) res.sendFile(path.resolve('static/forbidden.html'));
    //render the page showing all advertisements added
    res.render('pages/addAdvertise', { layout: 'adminhome' });
});

router.post('/addadvertise', async (req, res) => {
    try {
        let uploadFile = req.files.menuFile;
        let advertiseTitle = xss(req.body['advertiseTitle']);
        let advertiseDescription = xss(req.body['advertiseDescription']);
        let advertiseImage = uploadFile.name;

        if (!advertiseTitle || !advertiseTitle.trim()) {
            res.status(400).render('pages/addAdvertise', {
                layout: 'adminhome',
                err: 'Provide valid Title Name',
            });

            return;
        }

        if (!advertiseDescription || !advertiseDescription.trim()) {
            res.status(400).render('pages/addAdvertise', {
                layout: 'adminhome',
                err: 'Provide valid Description',
            });
            return;
        }

        let titlewithoutspaces = advertiseTitle.replace(/ /g, '');

        if (!/^[a-zA-Z]+$/.test(titlewithoutspaces)) {
            res.status(400).render('pages/addAdvertise', {
                layout: 'adminhome',
                err:
                    'Provide a Valid Title for Advertise. NO SPECIAL CHARACTERS ONLY Alphabetic Characters',
            });
            return;
        }
        let descrptionwithoutspaces = advertiseDescription.replace(/ /g, '');

        if (!/^[a-zA-Z]+$/.test(descrptionwithoutspaces)) {
            res.status(400).render('pages/addAdvertise', {
                layout: 'adminhome',
                err:
                    'Provide a Valid Description for Advertise. NO SPECIAL CHARACTERS ONLY Alphabetic Characters',
            });
            return;
        }

        advertiseTitle = advertiseTitle.replace(/\s+/g, ' ').trim();
        advertiseDescription = advertiseDescription.replace(/\s+/g, ' ').trim();

        let uploadpath = './public/images/Advertise/' + uploadFile.name;
        let ext = path.extname(uploadFile.name);
        const allowedExtension = /png|jpg|jpeg|JPG|PNG/;
        if (!allowedExtension.test(ext)) {
            throw 'ONLY png|jpg|jpeg|JPG|PNG allowed';
        }

        let add = await userData.addAdvertise(
            advertiseTitle,
            advertiseDescription,
            advertiseImage
        );

        if (add.advertiseInserted) {
            uploadFile.mv(uploadpath, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                sharp(`./public/images/Advertise/${uploadFile.name}`)
                    .resize(1400, 500)
                    .withMetadata()
                    .toBuffer(function (err, buffer) {
                        fs.writeFile(
                            `./public/images/Advertise/${uploadFile.name}`,
                            buffer,
                            function (e) {}
                        );
                    });
            });
            res.redirect('./viewAdvertise');
        } else {
            //mongo error not inserted
        }
    } catch (error) {
        res.status(400).render('pages/addAdvertise', {
            layout: 'adminhome',
            err: error,
        });
    }
});

router.post('/deleteadvertise', async (req, res) => {
    let advertiseId = req.body['deleteid'];
    let advertiseimage = req.body['image'];
    let uploadpath = './public/images/Advertise/' + advertiseimage;

    let deleted = await userData.deleteAdvertise(advertiseId);

    if (deleted.advertiseDeleted) {
        fs.unlinkSync(uploadpath);
        res.redirect('./viewAdvertise');
    } else {
        //mongo error not inserted
        res.render('pages/viewAdvertise', {
            layout: 'adminhome',
            deleteerror:
                'Unable to insert into Database.Try again After sometime!! Internal Database error',
        });
    }
});

router.get('/getorders', async (req, res) => {
    if (!req.session.admin) res.sendFile(path.resolve('static/forbidden.html'));
    let getAllOrders = await orderData.getAllOrders();
    res.render('pages/viewOrders', { layout: 'adminhome', json: getAllOrders });
});

router.get('/viewreview', async (req, res) => {
    if (!req.session.admin) res.sendFile(path.resolve('static/forbidden.html'));
    const allreviews = await reviewData.getAllReviews();
    res.render('pages/adminreview', { layout: 'adminhome', allreviews });
});

router.post('/viewreview', async (req, res) => {
    try {
        let delrevid = req.body['reviewid'];
        const delreviews = await reviewData.removeReviewById(delrevid);
        const allreviews = await reviewData.getAllReviews();
        res.render('pages/adminreview', { layout: 'adminhome', allreviews });
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});

module.exports = router;
