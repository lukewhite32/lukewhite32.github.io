const WEBSOCKET_URL = "wss://swaous.asuscomm.com/pookie/foodapp/foods";
const webSock = new WebSocket(WEBSOCKET_URL);

var allBreakfastItems = [];
var allLunchItems = [];
var allDinnerItems = [];

var activeBreakfastItems = [];
var activeLunchItems = [];
var activeDinnerItems = [];

var lastMessage = "";
webSock.addEventListener("message", function (c) {
    lastMessage = c.data;
});

setInterval(function () {
    if (webSock.readyState == WebSocket.CLOSED) {
        document.getElementById("connect-status").innerText = "Loading...";
    }
    else {
        if (lastMessage == "up:1") {
            document.cookie = "user=ella;";
            document.getElementById("main-content").style.display = "block";
            document.getElementById("login").style.display = "none";
        }
        else if (lastMessage == "up:0") {
            document.cookie = "user=none;";
            document.getElementById("login-status").innerText = "Invalid username or password";
        }
        activeBreakfastItems = [];
        activeLunchItems = [];
        activeDinnerItems = [];
        document.getElementById("connect-status").innerText = "";
        webSock.send("get");
        if (lastMessage.split(";")[0] == "get") {
            lastMessage = lastMessage.split(";").pop();
            lastMessage.split("\n").forEach(item => {
                if (item[0] == "b") {
                    activeBreakfastItems.push(item.split(":")[1]);
                }
                else if (item[0] == "l") {
                    activeLunchItems.push(item.split(":")[1]);
                }
                else if (item[0] == "d") {
                    activeDinnerItems.push(item.split(":")[1]);
                }
            });
        }
        updateSelected();
    }
    
}, 100);
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var days = [31, 31, 28, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function getMonthAsStr() {
    return months[new Date().getMonth()]
}

function getDayCountOfMon(m) {
    return days[months.indexOf(m)]
}

function getWeekRange() {
    let date = new Date();
    let m = getMonthAsStr();
    let d = (date.getDate() - date.getDay())
    if (d < 1) {
        m = months[months.indexOf(m)-1];
        d = getDayCountOfMon(m) + d;
    }
    let ret = (m + " " + d + " - ") + getMonthAsStr() + " " + (date.getDate() - date.getDay() + 7) + ", " + date.getFullYear();

    return ret;
}

document.getElementById("weekrange").innerText = getWeekRange();

selectedDate = new Date().getDay();   /* sun = 0, mon = 1, tues = 2, ... sat = 6 */

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function updateSelected() {
    var foodList = document.getElementById("food-list");

    for (let x = 0; x < 7; x ++) {
        if (selectedDate == x) {
            foodList.innerHTML = "<h2>Items</h2><div id='food-items-container'>"
            document.getElementById("" + x).style.border = "3px solid black";
            
            let breakfastText = document.createElement('pre');
            breakfastText.innerText = "Breakfast:   ";

            if (activeBreakfastItems[x] != undefined) {
                breakfastText.innerText += activeBreakfastItems[x];
            }
            foodList.appendChild(breakfastText);
    
            let lunchText = document.createElement('pre');
            lunchText.innerText = "Lunch:   ";

            if (activeLunchItems[x] != undefined) {
                lunchText.innerText += activeLunchItems[x];
            }
            foodList.appendChild(lunchText);

            let dinnerText = document.createElement('pre');
            dinnerText.innerText = "Dinner:   ";

            if (activeDinnerItems[x] != undefined) {
                dinnerText.innerText += activeDinnerItems[x];
            }
            foodList.appendChild(dinnerText);
        }
    }
}

document.getElementById("login-button").onclick = () => {
    let user = document.getElementById("login-username").value;
    let pass = document.getElementById("login-password").value;
    if (!(!user || !pass)) {
        webSock.send("up:" + user + pass);
    }
}

if (getCookie("user") == "ella") {
    document.getElementById("login").style.display = "none";
    document.getElementById("main-content").style.display = "block";
} 

updateSelected();