const dbConnection = require('./mongoConnection');
const getCollectionFn = (collection) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

/* Now, you can list your collections here: */
module.exports = {
    reviews: getCollectionFn('reviews'),
    users: getCollectionFn('users'),
    category: getCollectionFn('category'),
    menu: getCollectionFn('menu'),
    cart: getCollectionFn('cart'),
    advertise: getCollectionFn('advertise'),
    order: getCollectionFn('order'),
    favourite: getCollectionFn('favourite')
};
