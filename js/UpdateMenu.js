function UpdateMenu(){
    let category=$('#itemCategory').val();
let title=$('#itemTitle').val();
let description=$('#itemDescription').val();
let price=$('#itemPrice').val();
let Calories=$('#itemCalories').val();
let Keyword=$('#itemKeywords').val();
let image=$('#formFile').val();

let string='';
       for(let i=image.lastIndexOf(".");i<image.length;i++){
           string=string+image[i]
       }


if(!category || !category.trim()){
   $('#errordiv').empty();
   $('#errordiv').append('<p>Select a Valid Category<p>');
       $('#errordiv').show();
       return;
}
if(!title || !title.trim()){
$('#errordiv').empty();
   $('#errordiv').append('<p>Provide a Valid title<p>');
       $('#errordiv').show();
       return;
}

if(!description || !description.trim()){
   $('#errordiv').empty();
   $('#errordiv').append('<p>Select a Valid Description for item<p>');
       $('#errordiv').show();
       return;
}
if(!price || !price.trim()){
   $('#errordiv').empty();
   $('#errordiv').append('<p>Select a Valid price for item<p>');
       $('#errordiv').show();
       return;
}
if(!Calories || !Calories.trim()){
   $('#errordiv').empty();
   $('#errordiv').append('<p>Select a Valid Calories for item<p>');
       $('#errordiv').show();
       return;
}
if(!Keyword || !Keyword.trim()){
   $('#errordiv').empty();
   $('#errordiv').append('<p>Select a Valid keyword for item<p>');
       $('#errordiv').show();
       return;
}
let reg = new RegExp('^[0-9]+(\.[0-9]{1,2})?$')
let regnew=new RegExp('/^[a-zA-Z]*$/');
   let titlewithoutspaces = title.replace(/ /g, '');

if(!(/^[a-zA-Z]+$/.test(titlewithoutspaces))){
   $('#errordiv').empty();
   $('#errordiv').append('<p>Select a Valid Title for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters<p>');
       $('#errordiv').show();
       return;
}

let descriptionwithoutspaces=description.replace(/ /g, '');
if(!(/^[a-zA-Z]+$/.test(descriptionwithoutspaces))){
   
   $('#errordiv').empty();
   $('#errordiv').append('<p>Select a Valid Description for item. NO SPECIAL CHARACTERS ONLY Alphabetic Characters<p>');
       $('#errordiv').show();
       return;
}

if(!reg.test(`${price}`)){
 
   $('#errordiv').empty();
   $('#errordiv').append('<p>Select a Valid price for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES. VALUE UPTO TWO DECIMALS ONLY<p>');
       $('#errordiv').show();
       return;
}
if(!reg.test(`${Calories}`)){
   
   $('#errordiv').empty();
   $('#errordiv').append('<p>Select a Valid Calories for item. NO SPECIAL CHARACTERS ONLY NUMBERS OR POINT VALUES. VALUE UPTO TWO DECIMALS ONLY<p>');
       $('#errordiv').show();
       return;
}

let keywordswithoutspaces=Keyword.replace(/ /g, '');
if(!(/^[a-zA-Z]+$/.test(keywordswithoutspaces))){
 
   $('#errordiv').empty();
   $('#errordiv').append('<p>Provide Valid keywords for item. NO SPECIAL CHARACTERS Allowed, USE SPACE TO DISTINGUISH BETWEEN TWO WORDS. For Eg: bestdish spicy tangy<p>');
       $('#errordiv').show();
       return;
}
if(image.length!=0){
if(string == '.JPG' || string == '.jpg' || string == '.PNG' || string == '.png' || string == '.JPEG' || string == '.jpeg'){

}else{
     $('#errordiv').empty();
   $('#errordiv').append('<p>Image should be png,jpg,jpeg only<p>');
       $('#errordiv').show();
       return;

}
}

    let categoryold=$('#itemCategoryold').val();
let titleold=$('#itemTitleold').val();
let descriptionold=$('#itemDescriptionold').val();
let priceold=$('#itemPriceold').val();
let Caloriesold=$('#itemCaloriesold').val();
let Keywordold=$('#itemKeywordsold').val();
if(image){
} else{
if(category==categoryold && title==titleold && description==descriptionold && priceold==price && Calories==Caloriesold && keywordswithoutspaces==Keywordold) {
    $('#errordiv').empty();
   $('#errordiv').append('<p>All Values are Same. NO UPdate provided</p>');
       $('#errordiv').show();
       return;
}
}


document.getElementById("MenuUpdateForm").submit();
   }