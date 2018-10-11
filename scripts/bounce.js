
document.addEventListener("DOMContentLoaded",startBounce);

var bounceItems = {
    items : [],
    width: 800,
    height: 800
}


class bounceItem{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function startBounce(){
    let area = document.getElementById("displayArea");

    area.style.height = bounceItems.height+"px";
    area.style.width = bounceItems.width+"px";

    setupItems()

    drawItems();

    moveItems();
}

function setupItems(){

    let area = document.getElementById("displayArea");

    //will want to change these numbers to less arbitrary
    bounceItems.items.push(new bounceItem(10,10));

    //this assignment is not the best
    let indexId = bounceItems.items.length;

    area.innerHTML = "<div class=\"aBlob\" id=\"item"+(indexId-1)+"\">Test</div>";
}

function drawItems(){

    //will take on some of what is being done in moveItems
}

function moveItems(){

    let theItem = document.getElementById("item0");
    
    bounceItems.items[0].x += 1;
    bounceItems.items[0].y += 1;

    theItem.style.left = bounceItems.items[0].x + "px";
    theItem.style.top = bounceItems.items[0].y + "px";

    setTimeout("moveItems()",30);
}