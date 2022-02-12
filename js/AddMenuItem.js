function AddMenuItem() {
    let category = $('#itemCategory').val();
    let title = $('#itemTitle').val();
    let description = $('#itemDescription').val();
    let price = $('#itemPrice').val();
    let Calories = $('#itemCalories').val();
    let Keyword = $('#itemKeywords').val();
    let menuFile = $('#formFile').val();

    let string = '';
    for (let i = menuFile.lastIndexOf('.'); i < menuFile.length; i++) {
        string = string + menuFile[i];
    }

    if (!category || !category.trim()) {
        $('#errordiv').show();
        $('#errordiv').empty();
        $('#errordiv').append('<p>Select a Valid Category<p>');
        $('#errordiv').show();
        return;
    }
    if (!title || !title.trim()) {
        $('#errordiv').empty();
        $('#errordiv').append('<p>Provide a Valid title<p>');
        $('#errordiv').show();
        return;
    }

    if (!description || !description.trim()) {
        $('#errordiv').empty();
        $('#errordiv').append('<p>Select a Valid Description for item<p>');
        $('#errordiv').show();
        return;
    }
    if (!price || !price.trim()) {
        $('#errordiv').empty();
        $('#errordiv').append('<p>Select a Valid price for item<p>');
        $('#errordiv').show();
        return;
    }
    if (!Calories || !Calories.trim()) {
        $('#errordiv').empty();
        $('#errordiv').append('<p>Select a Valid Calories for item<p>');
        $('#errordiv').show();
        return;
    }
    if (!Keyword || !Keyword.trim()) {
        $('#errordiv').empty();
        $('#errordiv').append('<p>Select a Valid keyword for item<p>');
        $('#errordiv').show();
        return;
    }
    if (!menuFile || !menuFile.trim()) {
        $('#errordiv').empty();
        $('#errordiv').append('<p>Select a Valid image for item<p>');
        $('#errordiv').show();

        return;
    }
    let reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$');

    let titlewithoutspaces = title.replace(/ /g, '');

    if (!/^[a-zA-Z]+$/.test(titlewithoutspaces)) {
        $('#errordiv').empty();
        $('#errordiv').append(
            '<p>Select a Valid Title for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters<p>'
        );
        $('#errordiv').show();
        return;
    }

    let descriptionwithoutspaces = description.replace(/ /g, '');
    if (!/^[a-zA-Z]+$/.test(descriptionwithoutspaces)) {
        $('#errordiv').empty();
        $('#errordiv').append(
            '<p>Select a Valid Description for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters<p>'
        );
        $('#errordiv').show();
        return;
    }

    if (!reg.test(`${price}`)) {
        $('#errordiv').empty();
        $('#errordiv').append(
            '<p>Select a Valid price for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES. VALUE SHOULD BE UPTO TWO DECIMALS ONLY<p>'
        );
        $('#errordiv').show();
        return;
    }
    if (!reg.test(`${Calories}`)) {
        $('#errordiv').empty();
        $('#errordiv').append(
            '<p>Select a Valid Calories for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES<p>'
        );
        $('#errordiv').show();
        return;
    }
    let keywordswithoutspaces = Keyword.replace(/ /g, '');
    if (!/^[a-zA-Z]+$/.test(keywordswithoutspaces)) {
        $('#errordiv').empty();
        $('#errordiv').append(
            '<p>Provide Valid keywords for item. NO SPECIAL CHARACTERS Allowed, USE SPACE TO DISTINGUISH BETWEEN TWO WORDS. For Eg: bestdish spicy tangy<p>'
        );
        $('#errordiv').show();
        return;
    }

    if (
        string == '.JPG' ||
        string == '.jpg' ||
        string == '.PNG' ||
        string == '.png' ||
        string == '.JPEG' ||
        string == '.jpeg'
    ) {
    } else {
        $('#errordiv').empty();
        $('#errordiv').append('<p>Image should be png,jpg,jpeg only<p>');
        $('#errordiv').show();
        return;
    }

    document.getElementById('MenuAddForm').submit();
}
