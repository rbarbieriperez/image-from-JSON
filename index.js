'use strict';

//Variables
const _MainSection_ = document.getElementById("main-section");
const _SHOWIMAGEBTN_ = document.getElementById("show-image");
const _Message_ = document.createElement("p");
const _ImageElement_ = document.createElement("img");
_Message_.setAttribute("id","text");


//Functions




function getImage(){
    ShowLoadingMessage()
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => AppendImage(JSONtoString(data)))
        .finally(DeleteMessage())
}


function JSONtoString(JSONgetted){
    let JSONarr = []
    return Object.values(JSONgetted)[0]; //Returns an array with all the object's values
}


function AppendImage(image){
    _MainSection_.appendChild(_ImageElement_);
    _ImageElement_.src = image;
    _ImageElement_.style.width = "50%";
    _ImageElement_.style.height = "50%";
    _ImageElement_.style.display = "block";
    _ImageElement_.style.marginLeft = "auto";
    _ImageElement_.style.marginRight = "auto";
    _ImageElement_.style.marginTop = "5%";
}

function RemoveImage (){
    _ImageElement_.src = "";
    _ImageElement_.style = null;
}


_SHOWIMAGEBTN_.addEventListener("click", () => {
    RemoveImage();
    getImage();
        
})





function ShowLoadingMessage (){
    let successTextNode = document.createTextNode("Loading");
    _Message_.parentElement == _MainSection_ ? DeleteMessage() : null;
    _Message_.innerHTML = "";
    _Message_.appendChild(successTextNode);
    _MainSection_.appendChild(_Message_)

}

function ShowErrorMessage(){
    let ErrorTextNode = document.createTextNode("Ha ocurrido un error al cargar la imágen :( inténtalo de nuevo :D");
    _Message_.parentElement == _MainSection_ ? DeleteMessage() : null;
    _Message_.innerHTML = "";
    _Message_.appendChild(ErrorTextNode);
    _MainSection_.appendChild(_Message_)
}


function DeleteMessage(){
    setTimeout(() =>{
        _MainSection_.removeChild(_Message_);
    },1000)
    
}
