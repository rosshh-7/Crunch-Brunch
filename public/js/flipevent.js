function flip(event){
    var element = event.currentTarget;
    var main_card = element.parentElement.parentElement.parentElement;
    if (main_card.className === "cardbox") {
        if(main_card.style.transform == "rotateY(180deg)") {
            main_card.style.transform = "rotateY(0deg)";
        }
        else {
            main_card.style.transform = "rotateY(180deg)";
        }
    }
                
    var frontHeight = $('.mycard').outerHeight();
    var backHeight = $('.mycard1').outerHeight();

    if (frontHeight > backHeight) {
        $('.mycard1').height(frontHeight);
    }
    else if (frontHeight > backHeight) {
        $('.mycard').height(backHeight);
    }
};