
document.addEventListener("DOMContentLoaded",startBounce);

var bounceItems = {
    items : [],
    width: 800,
    height: 800,

    minItemSize: 20
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

    addItem(new bounceItem(10,10, 70,70, 1,2));
    addItem(new bounceItem(60,100, 80,80, 2,-3));
    addItem(new bounceItem(400,400, 120,120, 3,1));
}
function addItem(newItem){

    //TODO
    //will want to setup a better way then just lineing up the array with the elements
        //Possible improvement is to make an object where the items key match the html elements id

    bounceItems.items.push(newItem);

    let indexId = bounceItems.items.length - 1;
    
    let htmlElement = document.createElement("button");

    htmlElement.className = "aBlob";
    htmlElement.value = indexId;
    htmlElement.id = "item" + indexId;

    document.getElementById("displayArea").appendChild(htmlElement);
    htmlElement.addEventListener("click",itemClicked);
}

function itemClicked(){
    let itemIndex = event.target.value;

    let item = bounceItems.items[itemIndex];

    if (item.width > bounceItems.minItemSize){

        let newSize = Math.floor(item.width * 3 / 4);

        addItem(new bounceItem(item.x,item.y, newSize,newSize, -item.yMovement,item.xMovement));

        item.xMovement = -item.xMovement;
        item.width = newSize;
        item.height = newSize;
    }
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
            item.xMovement = -Math.abs(item.xMovement);
        }
        else if(item.x < 0){
            item.xMovement = Math.abs(item.xMovement);
        }
        
        if(item.y > (bounceItems.height - item.height)){
            item.yMovement = -Math.abs(item.yMovement);
        }
        else if(item.y < 0){
            item.yMovement = Math.abs(item.yMovement);
        }

        item.x += item.xMovement;
        item.y += item.yMovement;
    });

    drawItems();

    setTimeout("moveItems()",30);
}