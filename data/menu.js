const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const categorys = mongoCollections.category;
const menus = mongoCollections.menu;
const advertises = mongoCollections.advertise;
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
let { ObjectId } = require('mongodb');
const { menu } = require('../config/mongoCollections');
const saltrounds = 16;

async function addCategory(category, image) {
    const categoryCollection = await categorys();
    if (!category || !category.trim()) {
        throw 'Provide valid Category Name';
    }
    if (!image || !image.trim()) {
        throw 'Provide valid Image for category';
    }

    let categorywithoutspaces = category.replace(/ /g, '');

    if (!/^[a-zA-Z]+$/.test(categorywithoutspaces)) {
        throw 'Provide a Valid Category Name. NO SPECIAL CHARACTERS ONLY Alphabetic Characters';
    }
    let newcategory = {
        category: category,
        image: image,
    };

    const findresult = await categoryCollection.find({}).toArray();
    if (findresult.length === 0) {
        const insertInfo = await categoryCollection.insertOne(newcategory);
        if (insertInfo.insertedCount === 0) {
            throw 'Internal Server Error, Couldnot insert';
        } else {
            return { categoryInserted: true };
        }
    } else {
        for (let i = 0; i < findresult.length; i++) {
            if (
                findresult[i].category.toLowerCase() == category.toLowerCase()
            ) {
                throw 'Category Already Exists with same name';
            }
        }
        const insertInfo = await categoryCollection.insertOne(newcategory);
        if (insertInfo.insertedCount === 0) {
            throw 'Internal Server Error, Couldnot insert';
        } else {
            return { categoryInserted: true };
        }
    }
}

async function addMenu(
    itemCategory,
    itemTitle,
    itemDescription,
    itemPrice,
    itemCalories,
    itemImage,
    itemKeywords
) {
    if (!itemCategory || !itemCategory.trim()) {
        throw 'Select Proper Category for Menu';
    }

    if (!itemTitle || !itemTitle.trim()) {
        throw 'Provide Proper Title for Menu';
    }

    if (!itemDescription || !itemDescription.trim()) {
        throw 'Provide Proper Description for Menu';
    }

    if (!itemPrice) {
        throw 'Provide Proper Price for Menu';
    }

    if (!itemCalories) {
        throw 'Provide Proper Calories for Menu';
    }

    if (!itemKeywords || !itemKeywords.trim()) {
        throw 'Provide Proper Keywords for Menu';
    }

    let reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$');

    let titlewithoutspaces = itemTitle.replace(/ /g, '');
    if (!/^[a-zA-Z]+$/.test(titlewithoutspaces)) {
        throw 'Select a Valid Title for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters';
    }

    let descriptionwithoutspaces = itemDescription.replace(/ /g, '');
    if (!/^[a-zA-Z]+$/.test(descriptionwithoutspaces)) {
        throw 'Select a Valid Title for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters';
    }

    if (!reg.test(itemPrice)) {
        throw 'Select a Valid price for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES upto TWO DECIMALS';
    }

    if (!reg.test(itemCalories)) {
        throw 'Select a Valid Calories for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES upto TWO DECIMALS';
    }

    if (!/^[a-zA-Z]+$/.test(itemKeywords)) {
        throw 'Provide Valid keywords for item. NO SPECIAL CHARACTERS Allowed, USE SPACE TO DISTINGUISH BETWEEN TWO WORDS. For Eg: bestdish spicy tangy';
    }

    const MenuCollection = await menus();

    let newMenuItem = {
        itemCategory: itemCategory,
        itemTitle: itemTitle,
        itemDescription: itemDescription,
        itemPrice: itemPrice,
        itemCalories: itemCalories,
        itemImage: itemImage,
        itemKeywords: itemKeywords,
    };

    const findresult = await MenuCollection.find({}).toArray();
    if (findresult.length == 0) {
        const insertInfo = await MenuCollection.insertOne(newMenuItem);
        if (insertInfo.insertedCount === 0) {
            throw 'Internal Server Error Cannot insert';
        } else {
            return { menuInserted: true };
        }
    } else {
        for (let i = 0; i < findresult.length; i++) {
            if (
                findresult[i].itemCategory.toLowerCase() ==
                    itemCategory.toLowerCase() &&
                findresult[i].itemTitle.toLowerCase() == itemTitle.toLowerCase()
            ) {
                throw 'Menu Already exists with similar name';
            }
        }
        const insertInfo = await MenuCollection.insertOne(newMenuItem);
        if (insertInfo.insertedCount === 0) {
            throw 'Internal Server Error Cannot insert';
        } else {
            return { menuInserted: true };
        }
    }
}

async function search(searchTerm) {
    const MenuCollection = await menus();

    const findresult = await MenuCollection.find({
        itemKeywords: { $regex: searchTerm, $options: '$i' },
    }).toArray();
    if (findresult.length == 0) {
        return findresult;
    } else {
        return findresult;
    }
}

async function addAdvertise(
    advertiseTitle,
    advertiseDescription,
    advertiseImage
) {
    const AdvertiseCollection = await advertises();

    if (!advertiseTitle || !advertiseTitle.trim()) {
        throw 'Provide valid Title';
    }

    if (!advertiseDescription || !advertiseDescription.trim()) {
        throw 'Provide Valid Description';
    }

    let titlewithoutspaces = advertiseTitle.replace(/ /g, '');

    if (!/^[a-zA-Z]+$/.test(titlewithoutspaces)) {
        throw 'Provide a Valid Title for Advertise. NO SPECIAL CHARACTERS ONLY Alphabetic Characters';
    }
    let descrptionwithoutspaces = advertiseDescription.replace(/ /g, '');

    if (!/^[a-zA-Z]+$/.test(descrptionwithoutspaces)) {
        throw 'Provide a Valid Description for Advertise. NO SPECIAL CHARACTERS ONLY Alphabetic Characters';
    }

    let newAdvertiseItem = {
        advertiseTitle: advertiseTitle,
        advertiseDescription: advertiseDescription,
        advertiseImage: advertiseImage,
    };

    const findresult = await AdvertiseCollection.find({}).toArray();
    if (findresult.length == 0) {
        const insertInfo = await AdvertiseCollection.insertOne(
            newAdvertiseItem
        );
        if (insertInfo.insertedCount === 0) {
            throw 'Server Error Couldnot Insert';
        } else {
            return { advertiseInserted: true };
        }
    } else {
        for (let i = 0; i < findresult.length; i++) {
            if (
                findresult[i].advertiseTitle.toLowerCase() ==
                advertiseTitle.toLowerCase()
            )
                throw 'Advertise Already exists with a similar name';
        }
        const insertInfo = await AdvertiseCollection.insertOne(
            newAdvertiseItem
        );
        if (insertInfo.insertedCount === 0) {
            throw 'Server Error Couldnot Insert';
        } else {
            return { advertiseInserted: true };
        }
    }
}

async function getAllMenu() {
    const MenuCollection = await menus();

    const findresult = await MenuCollection.find({}).toArray();
    return findresult;
}

async function getMenuItem(id) {
    let idd = ObjectId(id);
    const MenuCollection = await menus();
    const findresult = await MenuCollection.findOne({ _id: idd });
    return findresult;
}

async function updateMenu(
    itemCategory,
    itemTitle,
    itemDescription,
    itemPrice,
    itemCalories,
    itemImage,
    itemKeywords,
    itemId
) {
    if (!itemCategory || !itemCategory.trim()) {
        throw 'Select Proper Category for Menu';
    }

    if (!itemTitle || !itemTitle.trim()) {
        throw 'Provide Proper Title for Menu';
    }

    if (!itemDescription || !itemDescription.trim()) {
        throw 'Provide Proper Description for Menu';
    }

    if (!itemPrice) {
        throw 'Provide Proper Price for Menu';
    }

    if (!itemCalories) {
        throw 'Provide Proper Calories for Menu';
    }

    if (!itemKeywords || !itemKeywords.trim()) {
        throw 'Provide Proper Keywords for Menu';
    }

    let reg = new RegExp('^[0-9]+(.[0-9]+)*$');

    let titlewithoutspaces = itemTitle.replace(/ /g, '');
    if (!/^[a-zA-Z]+$/.test(titlewithoutspaces)) {
        throw 'Select a Valid Title for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters';
    }

    let descriptionwithoutspaces = itemDescription.replace(/ /g, '');
    if (!/^[a-zA-Z]+$/.test(descriptionwithoutspaces)) {
        throw 'Select a Valid Title for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters';
    }

    if (!reg.test(itemPrice)) {
        throw 'Select a Valid price for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES';
    }

    if (!reg.test(itemCalories)) {
        throw 'Select a Valid Calories for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES';
    }

    if (!/^[a-zA-Z]+$/.test(itemKeywords)) {
        throw 'Provide Valid keywords for item. NO SPECIAL CHARACTERS Allowed, USE SPACE TO DISTINGUISH BETWEEN TWO WORDS. For Eg: bestdish spicy tangy';
    }

    const MenuCollection = await menus();
    let newMenuItem = {};
    if (itemImage) {
        newMenuItem = {
            itemCategory: itemCategory,
            itemTitle: itemTitle,
            itemDescription: itemDescription,
            itemPrice: itemPrice,
            itemCalories: itemCalories,
            itemImage: itemImage,
            itemKeywords: itemKeywords,
        };
    } else {
        newMenuItem = {
            itemCategory: itemCategory,
            itemTitle: itemTitle,
            itemDescription: itemDescription,
            itemPrice: itemPrice,
            itemCalories: itemCalories,
            itemKeywords: itemKeywords,
        };
    }
    let itemIdd = ObjectId(itemId);
    const updatedInfo = await MenuCollection.updateOne(
        { _id: itemIdd },
        { $set: newMenuItem }
    );

    if (updatedInfo.modifiedCount === 0) {
        throw 'Server Error Nothing updated';
    } else {
        return { menuupdated: true };
    }
}

async function deleteMenuItem(id) {
    let idd = ObjectId(id);

    const MenuCollection = await menus();

    const deleteresult = await MenuCollection.deleteOne({ _id: idd });
    if (deleteresult.deletedCount === 0) {
        return false;
    } else {
        return true;
    }
}

async function getAllCategory() {
    const categoryCollection = await categorys();
    let getCategorys = await categoryCollection.find({}).toArray();

    return getCategorys;
}

async function getMenuByCategory(category) {
    const MenuCollection = await menus();
    let CategoryMenu = await MenuCollection.find({
        itemCategory: category,
    }).toArray();

    return CategoryMenu;
}

async function deleteCategory(id, category) {
    let idd = ObjectId(id);
    const categoryCollection = await categorys();
    const MenuCollection = await menus();
    const findresult = await MenuCollection.find({
        itemCategory: category,
    }).toArray();

    if (findresult.length === 0) {
        const deleteresult = await categoryCollection.deleteOne({ _id: idd });

        if (deleteresult.deletedCount === 0) {
            return { delete: false };
        } else {
            return { delete: true };
        }
    } else {
        return { delete: 'cannot delete' };
    }
}

async function deleteAdvertise(id) {
    let idd = ObjectId(id);
    const AdvertiseCollection = await advertises();

    const deleteresult = await AdvertiseCollection.deleteOne({ _id: idd });

    if (deleteresult.deletedCount === 0) {
        return { advertiseDeleted: false };
    } else {
        return { advertiseDeleted: true };
    }
}

async function getAdvertise() {
    const AdvertiseCollection = await advertises();

    const getresult = await AdvertiseCollection.find({}).toArray();

    if (getresult.length > 0) {
        return getresult;
    } else {
        return false;
    }
}

module.exports = {
    addCategory,
    addMenu,
    search,
    addAdvertise,
    getAllMenu,
    getMenuItem,
    updateMenu,
    deleteMenuItem,
    getAllCategory,
    getMenuByCategory,
    deleteAdvertise,
    deleteCategory,
    getAdvertise,
};
