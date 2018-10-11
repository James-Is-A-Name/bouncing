
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
}


function drawItems(){
    let area = document.getElementById("displayArea");

    area.innerHTML = "<div class=\"aBlob\">Test</div>";
}