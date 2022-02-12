function AddCategory(){
    let category=$('#itemCategory').val();
    let image=$('#formFile').val()
    
    let string='';
    for(let i=image.lastIndexOf(".");i<image.length;i++){
        string=string+image[i]
    }
    


   if(!category || !category.trim()){
 $('#errordiv').show();
$('#errordiv').empty();
$('#errordiv').append('<p>Select a Valid Category<p>');
    $('#errordiv').show();
    return;
}
if(!image || !image.trim()){
$('#errordiv').empty();
$('#errordiv').append('<p>Provide a Valid image<p>');
    $('#errordiv').show();
    return;
}

let categorywithoutspaces = category.replace(/ /g, '');

if(!(/^[a-zA-Z]+$/.test(categorywithoutspaces))){
$('#errordiv').empty();
$('#errordiv').append('<p>Provide a Valid Title for Menu. NO SPECIAL CHARACTERS ONLY Alphabetic Characters<p>');
    $('#errordiv').show();
    return;
}
if(string == '.JPG' || string == '.jpg' || string == '.PNG' || string == '.png' || string == '.JPEG' || string == '.jpeg'){

}else{
  $('#errordiv').empty();
$('#errordiv').append('<p>Image should be png,jpg,jpeg only<p>');
    $('#errordiv').show();
    return;

}

document.getElementById("categoryForm").submit();

}