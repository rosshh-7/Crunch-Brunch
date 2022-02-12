const mongoCollections = require('../config/mongoCollections');
//const categorys = mongoCollections.category;
const carts = mongoCollections.cart;
const menus = mongoCollections.menu;
const orders = mongoCollections.order;
const uuid = require('uuid');
let { ObjectId } = require('mongodb');
let { getMenuItem } = require('./menu');
//const menus = mongoCollections.menu;

async function createCartItem(id, quantity, price, userID) {
    const cartCollection = await carts();
    const MenuCollection = await menus();
    let menudetails = await getMenuItem(id);
    let total = parseInt(quantity) * parseFloat(price);
    price = parseFloat(price);
    let newcart = {
        itemid: id,
        quantity: quantity,
        userId: userID,
        totalcost: total,
        priceOfItem: price,
        details: {
            title: menudetails.itemTitle,
            description: menudetails.itemDescription,
            cal: menudetails.itemCalories,
            image: menudetails.itemImage,
        },
        order_id: null,
    };

    const findresult = await cartCollection.findOne({
        itemid: id,
        userId: userID,
        order_id: null,
    });
    if (findresult === null) {
        const insertInfo = await cartCollection.insertOne(newcart);
        if (insertInfo.insertedCount === 0) {
            return { cartInserted: false };
        } else {
            return { cartInserted: true };
        }
    } else {
        findresult.quantity;
        let value = parseInt(findresult.quantity) + parseInt(quantity);
        cost = value * findresult.priceOfItem;
        let updatecart = {
            quantity: value,
            totalcost: cost,
        };
        const updatedInfo = await cartCollection.updateOne(
            { itemid: id, userId: userID, order_id: null },
            { $set: updatecart }
        );
        if (updatedInfo.modifiedCount === 0) {
            return { cartInserted: false };
        } else {
            return { cartInserted: true };
        }
    }
}

async function getCounter(userID) {
    const cartCollection = await carts();
    const findresult = await cartCollection
        .find({ userId: userID, order_id: null })
        .toArray();

    return findresult.length;
}

async function getCartUser(userId) {
    const cartCollection = await carts();
    const findresult = await cartCollection
        .find({ userId: userId, order_id: null })
        .toArray();
    return findresult;
}

async function deleteCartItem(deleteid) {
    const cartCollection = await carts();

    let idd = ObjectId(deleteid);

    const deleteresult = await cartCollection.deleteOne({
        _id: idd,
        order_id: null,
    });

    if (deleteresult.deletedCount === 0) {
        return false;
    } else {
        return true;
    }
}

async function updateCartItem(Id, quantity, userID) {
    const cartCollection = await carts();

    let idd = ObjectId(Id);

    const findresult = await cartCollection.findOne({
        _id: idd,
        userId: userID,
        order_id: null,
    });
    let totcost = findresult.totalcost;
    totcost = parseFloat(quantity) * parseFloat(findresult.priceOfItem);
    updateCart = {
        quantity: quantity,
        totalcost: totcost,
    };
    const updatedInfo = await cartCollection.updateOne(
        { _id: idd, userId: userID, order_id: null },
        { $set: updateCart }
    );
    if (updatedInfo.modifiedCount === 0) {
        return { cartupdate: false };
    } else {
        return { cartupdated: true };
    }
}

async function UpdateOrderIdByUserId(userId, orderid) {
    const cartCollection = await carts();
    updateCart = {
        order_id: orderid,
    };
    const updatedInfo = await cartCollection.updateMany(
        { userId: userId, order_id: null },
        { $set: updateCart }
    );

    if (updatedInfo.modifiedCount === 0) {
        return { updated: true };
    } else {
        return { updated: false };
    }
}

async function createOrder(userId, orderid) {
    const orderCollection = await orders();
    var today = new Date();

    var date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

    var time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    var dateTime = date + ' ' + time;
    neworder = {
        order_id: orderid,
        userId: userId,
        date: dateTime,
    };
    const insertInfo = await orderCollection.insertOne(neworder);
    // if (insertInfo.insertedCount === 0) {
    //     // console.log("yes")
    // } else {
    //     // console.log("no")
    // }
}

async function getOrderByUserId(userId) {
    const orderCollection = await orders();

    const findresult = await orderCollection.find({ userId: userId }).toArray();

    if (findresult.length > 0) {
        return findresult;
    } else {
        return false;
    }
}

async function getCartByOrderId(orderId) {
    const cartCollection = await carts();
    orderId = parseInt(orderId);
    const findresult = await cartCollection
        .find({ order_id: orderId })
        .toArray();

    if (findresult.length > 0) {
        return findresult;
    } else {
        return false;
    }
}

async function getItemDetailsById(itemid) {
    const MenuCollection = await menus();
    let idd = ObjectId(itemid);
    const findresult = await MenuCollection.findOne({ _id: idd });

    if (findresult === null) {
        return null;
    } else {
        return findresult;
    }
}

async function getAllOrders() {
    const orderCollection = await orders();
    const findresult = await orderCollection
        .find({})
        .sort({ _id: -1 })
        .toArray();
    return findresult;
}

async function getBestSeller() {
    const cartCollection = await carts();
    const MenuCollection = await menus();
    let count = await cartCollection
        .find({ order_id: { $ne: null } })
        .toArray();
    let menu = await MenuCollection.find({}).toArray();
    let counter = 0;
    let obj = {};
    let itemarray = [];
    let counterarrray = [];
    if (count.length > 0) {
        if (menu.length > 0) {
            for (let i = 0; i < menu.length; i++) {
                for (let j = 0; j < count.length; j++) {
                    if (menu[i]._id.toString() == count[j].itemid) {
                        counter = counter + 1;
                    }
                }
                obj.itemid = menu[i]._id.toString();
                obj.counter = counter;
                counterarrray.push(counter);
                itemarray.push(obj);
                obj = {};
                counter = 0;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
    //   for(let i=0;i<itemarray.length;i++){
    //     for(let j=1;j<itemarray.length;j++){
    //     if(itemarray[i].counter
    //   }
    // }
    let maxitems = [];
    if (itemarray.length >= 3) {
        let max1 = Math.max(...counterarrray);

        counterarrray = counterarrray.filter((item) => item !== max1);

        let max2 = Math.max(...counterarrray);
        counterarrray = counterarrray.filter((item) => item !== max2);
        let max3 = Math.max(...counterarrray);
        let counterarray = [max1, max2, max3];

        let maxcounterarray = [];
        for (let i = 0; i < counterarray.length; i++) {
            if (counterarray[i] != 0) {
                maxcounterarray.push(counterarray[i]);
            }
        }

        for (let i = 0; i < itemarray.length; i++) {
            for (let j = 0; j < maxcounterarray.length; j++) {
                if (itemarray[i].counter == maxcounterarray[j]) {
                    maxitems.push(itemarray[i].itemid);
                }
            }
        }
    } else {
        if (itemarray.length == 0) {
            return false;
        } else {
            for (let i = 0; i < itemarray.length; i++) {
                maxitems.push(itemarray[i].itemid);
            }
        }
    }
    let finalresult = [];
    for (let i = 0; i < maxitems.length; i++) {
        let findresult = await getItemDetailsById(maxitems[i]);
        if (findresult === null) {
            return false;
        } else {
            finalresult.push(findresult);
        }
    }
    if (finalresult.length > 0) {
        return finalresult;
    } else {
        return false;
    }
}

module.exports = {
    createCartItem,
    getCounter,
    getCartUser,
    deleteCartItem,
    updateCartItem,
    UpdateOrderIdByUserId,
    createOrder,
    getOrderByUserId,
    getCartByOrderId,
    getItemDetailsById,
    getAllOrders,
    getBestSeller,
};
