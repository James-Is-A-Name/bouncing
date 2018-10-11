
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

    //TODO FIX HOW THIS IS DONE

    area.innerHTML = ""

    //will want to change these numbers to less arbitrary
    bounceItems.items.push(new bounceItem(10,10));

    //this assignment is not the best
    let indexId = bounceItems.items.length - 1;

    //will want to setup a better way then just lineing up the array with the elements
    area.innerHTML += "<div class=\"aBlob\" value=\""+indexId+"\" id=\"item"+indexId+"\">Test</div>";

    
    //repeat of the above for inital testing
    bounceItems.items.push(new bounceItem(50,50));
    indexId = bounceItems.items.length - 1;
    area.innerHTML += "<div class=\"aBlob\" value=\""+indexId+"\" id=\"item"+indexId+"\">Test</div>";
}

function drawItems(){

    let theItems = Array.from(document.getElementsByClassName("aBlob"));

    theItems.forEach((htmlItem) => {

        //I feel i have done something wrong since i need to use value twice
        let index = htmlItem.attributes.value.value;

        htmlItem.style.left = bounceItems.items[index].x + "px";
        htmlItem.style.top = bounceItems.items[index].y + "px";
    });
}

function moveItems(){
    
    bounceItems.items.forEach((item) => {
        item.x += 1;
        item.y += 1;
    });

    drawItems();

    setTimeout("moveItems()",30);
}