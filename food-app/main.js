var ISTESTING = false;

var webSock = 0;
if (ISTESTING) {
    webSock = new WebSocket("ws://localhost:54321");
}
else {
    webSock = new WebSocket("wss://swaous.asuscomm.com/pookie/foodapp/foods");
}

var lastMessage = "";

var breakfastItems = [];
var lunchItems = [];
var dinnerItems = [];

var allBreakfast = [];
var allLunch = [];
var allDinner = [];

var hasLoggedIn = false;
var isUpdatedItems = false;

var invalidCharacters = [';', ':'];

function shuffle(array) {          // thanks stackoverflow
    return array.sort(() => Math.random() - .5);
}

webSock.addEventListener("message", (message) => {
    lastMessage = message.data;
});

function loadTable() {
    let table = document.getElementsByClassName("grid-container")[0];
    let removeBreakfast = document.getElementById("breakfast-optgroup");
    let removeLunch = document.getElementById("lunch-optgroup");
    let removeDinner = document.getElementById("dinner-optgroup");
    removeBreakfast.innerHTML = "";
    removeLunch.innerHTML = "";
    removeDinner.innerHTML = "";
    //item.innerHTML = "<tr> <th></th> <th>Sunday</th> <th>Monday</th> <th>Tuesday</th> <th>Wednesday</th> <th>Thursday</th> <th>Friday</th> <th>Saturday</th> </tr>";
    table.innerHTML = '<div class="grid-item"></div>';
    table.innerHTML += '<div class="grid-item">Sunday</div>';
    table.innerHTML += '<div class="grid-item">Monday</div>';
    table.innerHTML += '<div class="grid-item">Tuesday</div>';
    table.innerHTML += '<div class="grid-item">Wednesday</div>';
    table.innerHTML += '<div class="grid-item">Thursday</div>';
    table.innerHTML += '<div class="grid-item">Friday</div>';
    table.innerHTML += '<div class="grid-item">Saturday</div>';

    table.innerHTML += '<div class="grid-item">Breakfast: </div>';

    for (let x = 0; x < 7; x ++) {
        table.innerHTML += '<div class="grid-item">' + breakfastItems[x] + '</div>';
        let item = document.createElement('option');
        item.value = "b:" + breakfastItems[x];
        item.innerText = breakfastItems[x];
        removeBreakfast.appendChild(item);
    }

    table.innerHTML += '<div class="grid-item">Lunch: </div>';

    for (let x = 0; x < 7; x ++) {
        table.innerHTML += '<div class="grid-item">' + lunchItems[x] + '</div>';
        let item = document.createElement('option');
        item.value = "l:" + lunchItems[x];
        item.innerText = lunchItems[x];
        removeLunch.appendChild(item);
    }

    table.innerHTML += '<div class="grid-item">Dinner: </div>';

    for (var x = 0; x < 7; x ++) {
        table.innerHTML += '<div class="grid-item">' + dinnerItems[x] + '</div>';
        let item = document.createElement('option');
        item.value = "d:" + dinnerItems[x];
        item.innerText = dinnerItems[x];
        removeDinner.appendChild(item);
    }
    //item.innerHTML += "<tr> <th>Breakfast</th> <td>" + sun[0] + "</td>" + " <td>" + mon[0] + "</td>" + "<td>" + tues[0] + "</td>" + "<td>" + wed[0] + "</td>" + "<td>" + thurs[0] + "</td>" + "<td>" + fri[0] + "</td>" + "<td>" + sat[0] + "</td>" + "</tr>";
    //item.innerHTML += "<tr> <th>Lunch</th><td>" + sun[1] + "</td>" + " <td>" + mon[1] + "</td>" + "<td>" + tues[1] + "</td>" + "<td>" + wed[1] + "</td>" + "<td>" + thurs[1] + "</td>" + "<td>" + fri[1] + "</td>" + "<td>" + sat[1] + "</td>" + "</tr>";
    //item.innerHTML += "<tr> <th>Dinner</th><td>" + sun[2] + "</td>" + " <td>" + mon[2] + "</td>" + "<td>" + tues[2] + "</td>" + "<td>" + wed[2] + "</td>" + "<td>" + thurs[2] + "</td>" + "<td>" + fri[2] + "</td>" + "<td>" + sat[2] + "</td>" + "</tr>";
}

setInterval(function () {
    if (webSock.readyState == WebSocket.CLOSED) {
        window.location.href = "no-conn";
    }
    if (!isUpdatedItems) {
        webSock.send("getAll");
        if (lastMessage[0] == 'A') {
            allBreakfast = [];
            allLunch = [];
            allDinner = [];
            let items = lastMessage.split(";");
            for (let x = 1; x < items.length; x ++) {
                if (items[x][0] == 'b') {
                    allBreakfast.push(items[x].split(":")[1]);
                }
                else if (items[x][0] == 'l') {
                    allLunch.push(items[x].split(":")[1]);
                }
                else if (items[x][0] == 'd') {
                    allDinner.push(items[x].split(":")[1]);
                }
            }
            isUpdatedItems = true;
        }
    }
    else {
        if (hasLoggedIn) {
            webSock.send("get");
        }
    }
    let items = lastMessage.split("\n"); 
    items.splice(21);
    if (items.length != 1) {
        let newBreakfast = [];
        let newLunch = [];
        let newDinner = [];
        for (let x = 0; x < 7; x ++) {
            newBreakfast.push(items[x].split(":")[1]);
        }
        for (let x = 7; x < 14; x ++) {
            newLunch.push(items[x].split(":")[1]);
        }
        for (let x = 14; x < 21; x ++) {
            newDinner.push(items[x].split(":")[1]);
        }
        if ((breakfastItems != newBreakfast) || (lunchItems != newLunch) || (dinnerItems != newDinner)) {
            breakfastItems = newBreakfast;
            lunchItems = newLunch;
            dinnerItems = newDinner;
            loadTable();
        }
    }
}, 1000);

var loginInterval = 0;

function checkForLogin(data) {
    if (hasLoggedIn) {
        return;
    }
    webSock.send("up:" + data);
    if (lastMessage[0] + lastMessage[1] == "up" && (!hasLoggedIn)) {
        if (lastMessage.split(":")[1] == "1") {
            document.getElementById("everything").style.display = "block";
            document.getElementById("login").style.display = "none";
            document.getElementById("login").style.position = "absolute";
            hasLoggedIn = true;
            document.title = "Food app - Items";
        }
        else {
            clearInterval(loginInterval);
            alert("Username or password not correct. Please try again.");
        }
    }
}

document.getElementById("login-button").onclick = () => {
    loginInterval = setInterval(function () {
        checkForLogin(document.getElementById("login-username").value + document.getElementById("login-password").value);
    }, 50);
}

document.getElementById("shuffle").onclick = () => {
    webSock.send("shuffle");
    loadTable();
};
document.getElementById("add-as-breakfast").onclick = () => {
    webSock.send("a;b:" + document.getElementById("item-text").value);
    document.getElementById("item-text").value = ""
};
document.getElementById("add-as-lunch").onclick = () => {
    webSock.send("a;l:" + document.getElementById("item-text").value);
    document.getElementById("item-text").value = ""
};
document.getElementById("add-as-dinner").onclick = () => {
    webSock.send("a;d:" + document.getElementById("item-text").value);
    document.getElementById("item-text").value = ""
};
document.getElementById("remove-button").onclick = () => {
    webSock.send("r;" + document.getElementById("remove-select").value);
}
loadTable();