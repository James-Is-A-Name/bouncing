
document.addEventListener("DOMContentLoaded",startBounce);

var bounceItems = {
    items : [],
    width: 400,
    height: 400
}


class bounceItem{
    constructor(x,y,width,height,xMovement,yMovement){
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.xMovement = xMovement;
        this.yMovement = yMovement;
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

    area.innerHTML = ""

    addItem(new bounceItem(10,10, 40,40, 1,1));
    addItem(new bounceItem(60,100, 50,50, 1,-1));
}
function addItem(newItem){

    //TODO fix this 

    //will want to change these numbers to less arbitrary
    bounceItems.items.push(newItem);

    //this assignment is not the best
    let indexId = bounceItems.items.length - 1;
    
    //will want to setup a better way then just lineing up the array with the elements
        //for one probably will want to change to using create element and append functions
    let area = document.getElementById("displayArea");
    area.innerHTML += "<div class=\"aBlob\" value=\""+indexId+"\" id=\"item"+indexId+"\">Test</div>";

}

function drawItems(){

    let theItems = Array.from(document.getElementsByClassName("aBlob"));

    theItems.forEach((htmlItem) => {

        //I feel i have done something wrong since i need to use value twice
        let index = htmlItem.attributes.value.value;

        htmlItem.style.left = bounceItems.items[index].x + "px";
        htmlItem.style.top = bounceItems.items[index].y + "px";

        //This might be being over called. wont change each movement
        htmlItem.style.width = bounceItems.items[index].width + "px";
        htmlItem.style.height = bounceItems.items[index].height + "px";
    });
}

function moveItems(){
    
    bounceItems.items.forEach((item) => {

        if(item.x > (bounceItems.width - item.width)){
            item.xMovement = -1;
        }
        else if(item.x < 0){
            item.xMovement = 1;
        }
        
        if(item.y > (bounceItems.height - item.height)){
            item.yMovement = -1;
        }
        else if(item.y < 0){
            item.yMovement = 1;
        }

        item.x += item.xMovement;
        item.y += item.yMovement;
    });

    drawItems();

    setTimeout("moveItems()",30);
}