function AddAdvertise(){
    let Title=$('#advertiseTitle').val();
               let Description=$('#advertiseDescription').val();
 let image=$('#formFile').val()

let string='';
 for(let i=image.lastIndexOf(".");i<image.length;i++){
     string=string+image[i]
 }

if(!Title || !Title.trim()){
$('#errordiv').show();
$('#errordiv').empty();
$('#errordiv').append('<p>Provide a Valid Title<p>');
 $('#errordiv').show();
 return;
}

if(!Description || !Description.trim()){
$('#errordiv').show();
$('#errordiv').empty();
$('#errordiv').append('<p>Provide a Valid Description<p>');
 $('#errordiv').show();
 return;
}

if(!image || !image.trim()){
$('#errordiv').empty();
$('#errordiv').append('<p>Provide a Valid image<p>');
 $('#errordiv').show();
 return;
}

let titlewithoutspaces = Title.replace(/ /g, '');

if(!(/^[a-zA-Z]+$/.test(titlewithoutspaces))){
$('#errordiv').empty();
$('#errordiv').append('<p>Provide a Valid Title for Advertise. NO SPECIAL CHARACTERS ONLY Alphabetic Characters<p>');
 $('#errordiv').show();
 return;
}
let descrptionwithoutspaces = Description.replace(/ /g, '');

if(!(/^[a-zA-Z]+$/.test(descrptionwithoutspaces))){
$('#errordiv').empty();
$('#errordiv').append('<p>Provide a Valid Description for Advertise. NO SPECIAL CHARACTERS ONLY Alphabetic Characters<p>');
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
document.getElementById("advertiseForm").submit();

}