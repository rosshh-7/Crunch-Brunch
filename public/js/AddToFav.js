function AddToFavourites(event) {
    event.preventDefault();

    let element = event.currentTarget;
    let idd = element.id;
    let length = idd.length;
    let newid = idd.slice(0, length - 3);

    var requestConfig = {
        method: 'POST',
        url: '/favourites',
        contentType: 'application/json',
        data: JSON.stringify({
            itemId: newid,
        }),
    };

    $.ajax(requestConfig).then(function (responseMessage) {
        if (responseMessage.success == true) {
            $('#errordiv').hide();
            $('#liveToast1').toast({
                animation: true,
                autohide: true,
                delay: 3000,
            });
            $('#liveToast1').toast('show');
        } else if (responseMessage.success == 522) {
            $('#errordiv').hide();
            $('#liveToast2').toast({
                animation: true,
                autohide: true,
                delay: 3000,
            });
            $('#liveToast2').toast('show');
        } else if (responseMessage.success == 523) {
            $('#errordiv').hide();
            alert('system error cannot update');
        } else if (responseMessage.success == false) {
            $('#errordiv').hide();
            window.location.replace(
                'http://localhost:3000/login?error=' + responseMessage.success
            );
        } else {
            // window.location.replace("http://localhost:3000/login?error="+responseMessage.success);

            $('#error').text(responseMessage.success);
            $('#errordiv').show();
        }
        //                alert("Data Saved: " + msg);
    });
}

function reduce(event) {
    let element = event.currentTarget;
    let idd = element.id;
    let newvalue;
    let string1 = '';
    for (let i = 0; i < idd.length - 2; i++) {
        string1 = string1 + idd[i];
    }
    let currentvalue = $(`.${string1}34`).val();
    if (currentvalue == 1) {
        newvalue = 1;
    } else {
        newvalue = currentvalue - 1;
        $(`.${string1}34`).val(newvalue);
    }
    var requestConfig = {
        method: 'POST',
        url: '/cart/update',
        contentType: 'application/json',
        data: JSON.stringify({
            updateid: string1,
            quantity: newvalue,
        }),
    };

    $.ajax(requestConfig).then(function (responseMessage) {
        if (responseMessage.success) {
            location.reload(true); // the value “true” ensures that the current page is fully loaded ignoring the “cache”.
        } else {
            location.reload(true); // the value “true” ensures that the current page is fully loaded ignoring the “cache”.
        }
        //                    $('#counter').text(responseMessage.count)
        //                  } else {
        //                        window.location.replace("http://localhost:3000/login?error=1");

        //}
        //                alert("Data Saved: " + msg);
    });
}

function increase(event) {
    let element = event.currentTarget;
    let idd = element.id;
    let string1 = '';
    for (let i = 0; i < idd.length - 2; i++) {
        string1 = string1 + idd[i];
    }
    let currentvalue = $(`.${string1}34`).val();
    let newvalue = parseInt(currentvalue) + parseInt(1);

    $(`.${string1}34`).val(newvalue);

    var requestConfig = {
        method: 'POST',
        url: '/cart/update',
        contentType: 'application/json',
        data: JSON.stringify({
            updateid: string1,
            quantity: newvalue,
        }),
    };

    $.ajax(requestConfig).then(function (responseMessage) {
        //console.log(responseMessage)
        if (responseMessage.success) {
            location.reload(true); // the value “true” ensures that the current page is fully loaded ignoring the “cache”.
        } else {
            location.reload(true); // the value “true” ensures that the current page is fully loaded ignoring the “cache”.
        }
    });
}
function AddToCart(event) {
    event.preventDefault();
    let element = event.currentTarget;

    let idd = element.id;
    let quantity = $(`.${idd}45`).val();
    let price = $(`#${idd}${idd}${idd}`).text();

    price = price.replace('$', '');
    price = price.replace(' ', '');

    var requestConfig = {
        method: 'POST',
        url: '/cart',
        contentType: 'application/json',
        data: JSON.stringify({
            itemId: idd,
            quantity: quantity,
            price: price,
        }),
    };

    $.ajax(requestConfig).then(function (responseMessage) {
        if (responseMessage.success) {
            $('#counter').text(responseMessage.count);
        } else {
            window.location.replace('http://localhost:3000/login?error=1');
        }
        //                alert("Data Saved: " + msg);
    });
}
