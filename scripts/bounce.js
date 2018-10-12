
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

    //have item resized to fit screen
        //reduce size by a little bit to avoid scroll bars
    bounceItems.width = document.documentElement.clientWidth - 20;
    bounceItems.height = document.documentElement.clientHeight - 20;

    //configure display area to match where the items are restricted to
    area.style.height = bounceItems.height+"px";
    area.style.width = bounceItems.width+"px";

    setupItems()

    drawItems();

    moveItems();
}

function setupItems(){

    let area = document.getElementById("displayArea");

    let reference = (bounceItems.height < bounceItems.width) ? bounceItems.height : bounceItems.width;

    //Add inital items with differing speed combinations to allow for variations it item motions
        //1,2,3 gives 6 possible angles of positive movemnt. 4 directions of these angles gives 24 total motions possible 
    addItem(new bounceItem(10,10, (reference/7),(reference/7), 1,2));
    addItem(new bounceItem(60,100, (reference/6),(reference/6), 2,-3));
    addItem(new bounceItem(400,400, (reference/5),(reference/5), 3,1));
}
function addItem(newItem){

    //TODO
    //will want to setup a better way then just lineing up the array with the elements
        //Possible improvement is to make an object where the items key match the html elements id

    bounceItems.items.push(newItem);

    //obtain the index of this new item by assuming it its the last item added to the array
        //if the push fails somehow or another item is added inbetween these lines your gonna have a bad time..... probably
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

        //give the new items swaped x and y movements of the clicked item to add difference between objects movement
            //and have the y movement inverted to make it seem less predictable
        addItem(new bounceItem(item.x,item.y, newSize,newSize, -item.yMovement,item.xMovement));

        //redirect the clicked item to give it a reaction to the click
        item.xMovement = -item.xMovement;
        item.width = newSize;
        item.height = newSize;

        document.getElementById('blop').play();
    }
}

function drawItems(){

    let theItems = Array.from(document.getElementsByClassName("aBlob"));

    //iterate through all the aBlob class html elements and update based on the corresponding item in the things array
        //this relies alot on the html elements and the things array being kept in lockstep
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

        //check if items are within bounds and if not corret movement so it is in the correct direction
            //does not move the item back in bounds so items would appear to jump outside the bounds for a frame. slow speed and circle shape makes this less apparent
        
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

    //simplistic draw loop to
        //issues will arise if move, draw and click acitions take longer them 30ms to complete
        //if move items is called more than once the whole thing will speed up. so probably dont do that
    setTimeout("moveItems()",30);
}