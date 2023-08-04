const webSock = new WebSocket("wss://swaous.asuscomm.com/pookie/foodapp/foods");
var allBreakfast = [];
var allLunch = [];
var allDinner = [];
var lastMessage = "";
webSock.addEventListener('message', function (e) {
    lastMessage = e.data;
});

function removeWhiteSpace(str) {
    let ret = "";
    alert(str);
    Array.from(str).forEach(char => {
        if (char == " ") {
            ret += "-"
        }
        else {
            ret += char;
        }
    });
    return ret;
}

setInterval(function () {
    webSock.send("getAll");
    if (lastMessage[0] == "A") {
        allBreakfast = [];
        allLunch = [];
        allDinner = [];
        let buffer = lastMessage.split("A;")[1];
        buffer = buffer.split(";")
        buffer.forEach(item => {
            alert(item);
            if (item[0] == "b") {
                allBreakfast.push(item.split(":")[1]);
            }
            else if (item[0] == "l") {
                allLunch.push(item.split(":")[1]);
            }
            else {
                allDinner.push(item.split(":")[1]);
            }
        });
    }
    let select = document.getElementById("item-select")
    select.innerHTML = "<optgroup label='Breakfast'>";
    allBreakfast.forEach(element => {
        select.innerHTML += "<option value='" + removeWhiteSpace(element) + "'>" + element + "</option>";
    });
    select.innerHTML += "</optgroup><optgroup label='Lunch'>";
    allLunch.forEach(element => {
        select.innerHTML += "<option value='" + removeWhiteSpace(element) + "'>" + element + "</option>";
    });
    select.innerHTML += "</optgroup><optgroup label='Dinner'>";
    allDinner.forEach(element => {
        select.innerHTML += "<option value='" + removeWhiteSpace(element) + "'>" + element + "</option>";
    });
    select.innerHTML += "</optgroup>";
}, 100);