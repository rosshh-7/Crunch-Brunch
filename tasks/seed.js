const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const signup = data.signup;
const menuData = data.menu;
const cartData = data.cart;
const usersinfo = data.user;
const reviews = data.reviews;
//ek min thamb
async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    //  Users
    const userA = await signup.createUser(
        'Akshay',
        'Sahasrabuddhe',
        'AkshayS@gmail.com',
        '01/01/1995',
        'male',
        'LA',
        'CA',
        'AkshayS',
        'AkshaySPW'
    );
    const userB = await signup.createUser(
        'Haoyu',
        'Li',
        'HaoyuL@gmail.com',
        '02/02/1996',
        'female',
        'Hoboken',
        'NJ',
        'HaoyuL',
        'HaoyuLPW'
    );
    const userC = await signup.createUser(
        'Roshan',
        'Badhujar',
        'RoshanB@gmail.com',
        '03/03/1997',
        'male',
        'Boston',
        'MA',
        'RoshanB',
        'RoshanBPW'
    );
    const userD = await signup.createUser(
        'Tanay',
        'Tadas',
        'tanaysid97@gmail.com',
        '04/04/1998',
        'male',
        'Miami',
        'FL',
        'TanayT',
        'TanayTPW'
    );
    const userE = await signup.createUser(
        'Yongxiang',
        'Zhang',
        'YongxiangZ@gmail.com',
        '05/05/1999',
        'male',
        'Philadelphia',
        'PA',
        'YongxiangZ',
        'YongxiangZPW'
    );

    const getAll = await usersinfo.getAllUsers();
    console.log(getAll);
    const catA = await menuData.addCategory('Brunch', 'menu.png');
    //pancake
    //Double Egg Fry with Cheese
    //Avacado toast

    const catB = await menuData.addCategory('Sides', 'sides.png');
    //french fries
    //Gluten Free GArlic bread
    //choco lava cake
    const catD = await menuData.addCategory('Beverages', 'beverages.png'); //strawberry banna smoothies
    //kale smoothies
    //watermelon juice
    //chocolate cold brew
    const catE = await menuData.addCategory('Deserts', 'desserts.png');
    //caramel frappaccino
    //hot brew
    //hazelnu
    const catF = await menuData.addCategory('Combos', 'combo.jpg');

    const getallcat = await menuData.getAllCategory();
    //console.log(getallcat)
    const menu1 = await menuData.addMenu(
        getallcat[0].category,
        'Pancake with honey and Strawberry',
        'Three soft freshly baked pancakes with spoon of honey and topped with strawbeery',
        '20',
        '359',
        'abc1.png',
        'pancakehoneystrawberry'
    );
    const menu2 = await menuData.addMenu(
        getallcat[0].category,
        'Double Egg Fry with cheese',
        'Three eggs fried in italian olive oil garnished with chilli flakes and pepper',
        '25',
        '240',
        'abc2.jpeg',
        'oliveoileggspepperchillispicy'
    );
    const menu3 = await menuData.addMenu(
        getallcat[0].category,
        'Avacado Toast',
        'Creamy Avacado smashed and spread across Gluten free Vegan Bread with a dash if lime',
        '40',
        '250',
        'abc3.png',
        'avacadospreadbreadlimecreamy'
    );
    const menu4 = await menuData.addMenu(
        getallcat[1].category,
        'French Fries',
        'Freshly Cooked Potato fries tossed in peri peri spice and served with loaded mayo',
        '45',
        '400',
        'sides1.jpeg',
        'frenchfriespotatomayocheese'
    );
    const menu5 = await menuData.addMenu(
        getallcat[1].category,
        'Garlic bread',
        'Roasted garlic spread over bread',
        '31.99',
        '400',
        'sides2.png',
        'garlicbreadoregano'
    );
    const menu6 = await menuData.addMenu(
        getallcat[1].category,
        'Choco Lava Cake',
        'Melted Dark Chocolate inside soft chocolate creamy cake',
        '45',
        '180',
        'sides3.jpeg',
        'chocolatelavacreamydark'
    );
    const menu7 = await menuData.addMenu(
        getallcat[2].category,
        'Strawberry Banana Smoothies',
        'Fresh Strawberry blended with frozen bananas to make a thick delicious smoothies',
        '18',
        '220',
        'beverages1.jpeg',
        'strawberrybananathicksmoothies'
    );
    const menu8 = await menuData.addMenu(
        getallcat[2].category,
        'Kale Smoothies',
        'Green King blended with ample fruits to blend its raw taste',
        '19.99',
        '159',
        'beverages2.png',
        'kalegreensmoothiesfruitsfiber'
    );
    const menu9 = await menuData.addMenu(
        getallcat[2].category,
        'Watermelon juice',
        'Watermelon juice thats it no additives',
        '28.99',
        '399',
        'beverages3.png',
        'watermelonfruitnomixing'
    );
    const menu10 = await menuData.addMenu(
        getallcat[2].category,
        'Chocolcate Cold Brew',
        'Authentic chocolate from Ghana blend to make a thick smoothie',
        '35',
        '399',
        'beverages4.jpeg',
        'chocolateghanadarkcoldsmoothiesthick'
    );
    const menu11 = await menuData.addMenu(
        getallcat[3].category,
        'Caramel Frappacciono',
        'Caramel Frappaccino',
        '29.36',
        '454',
        'coffee1.png',
        'caramelFrappaccinohotcoffee'
    );
    const menu12 = await menuData.addMenu(
        getallcat[3].category,
        'Black Forest Cake',
        'Dark coffee to kick your midnight lazines',
        '29.99',
        '191',
        'coffee2.png',
        'coffeedarkmidnightkicker'
    );
    const menu13 = await menuData.addMenu(
        getallcat[4].category,
        'Pizza Mania',
        'Perfect lunch alternative with garlic breads and pizza',
        '25.99',
        '600',
        'combo1.jpg',
        'combofriespizzacokegarlicbread'
    );
    const menu14 = await menuData.addMenu(
        getallcat[4].category,
        'French Fries and Chocolate Cold Brew',
        'Best Combo fries and Chocolate',
        '35.99',
        '191',
        'combo2.jpg',
        'chocolatecoldfriessaucypotato'
    );
    // const menu15 = await menuData.addMenu(
    //     getallcat[4].category,
    //     'Pancake and Egg and Salad',
    //     'Most bought item of ours Get a little of everything',
    //     '49.99',
    //     '591',
    //     'combo3.jpg',
    //     'saladpancakeeggbestitem'
    // );

    const allmenu = await menuData.getAllMenu();

    const adv1 = await menuData.addAdvertise(
        'Olives Pizza',
        'Specially Chef Curated Olives Pizza glimpse of Italian taste',
        'adv1.png'
    );
    const adv2 = await menuData.addAdvertise(
        'Egg Fun Day',
        'Full EGG MENU Only eggs Day all item will have a part of egg',
        'adv2.jpg'
    );
    const adv3 = await menuData.addAdvertise(
        'Surti Gotala',
        'Special Egg Dishes from Authentic Egg Suchefs',
        'adv3.png'
    );
    const adv4 = await menuData.addAdvertise(
        'Fruit and Toast Only',
        'It fruits and Toast Day only Cleanse yourself with us',
        'adv4.jpg'
    );

    console.log('Done seeding database');
    await db.serverConfig.close();
}

main();
