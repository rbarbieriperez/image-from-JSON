'use strict';

//Variables
const _MainSection_ = document.getElementById("main-section");
const _SHOWIMAGEBTN_ = document.getElementById("show-image");
const _Message_ = document.createElement("p");
const _ImageElement_ = document.createElement("img");
_Message_.setAttribute("id","text");
let request = new XMLHttpRequest;


//Functions




function getImage(){
    request.open("GET", "https://dog.ceo/api/breeds/image/random");
    request.send();
    request.onload = function(){
        if (request.status === 200){
            AppendImage(JSONtoString(request.response));
        }
    }
}


function JSONtoString(JSONgetted){
    //alert(JSON.stringify(JSONgetted))
    let JSONarr = []
    JSONarr = JSON.parse(JSONgetted);

    return Object.values(JSONarr)[0]; //Returns an array with all the object's values
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

const ShowImagePromise = new Promise((success,reject) => {
    _SHOWIMAGEBTN_.addEventListener("click", () => {
        RemoveImage();
        getImage();
        success();
        ShowImagePromise
            .then(() => ShowLoadingMessage())
            .finally(DeleteMessage());
            
    })
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
