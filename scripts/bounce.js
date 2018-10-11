
document.addEventListener("DOMContentLoaded",startBounce);

var bounceItems = {
    items : [],
    width: 800,
    height: 800
}

function startBounce(){
    let area = document.getElementById("displayArea");

    area.style.height = bounceItems.height+"px";
    area.style.width = bounceItems.width+"px";

    drawItems();
    moveItem();
}


function drawItems(){
    let area = document.getElementById("displayArea");

    area.innerHTML = "<div class=\"aBlob\" id=\"item1\">Test</div>";
}

function moveItem(){
    let theItem = document.getElementById("item1");

    theItem.style.left = "10px";
    theItem.style.top = "10px";

}