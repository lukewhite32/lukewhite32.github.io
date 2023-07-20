const WEBSOCKET_URL = "";

var allBreakfastItems = [];
var allLunchItems = [];
var allDinnerItems = [];

var activeBreakfastItems = ["tea", "matcha", "orange", "oolong", "camomine"];
var activeLunchItems = [];
var activeDinnerItems = [];

function getMonthAsStr() {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[new Date().getMonth() + 1]
}

selectedDate = new Date().getDay();   /* sun = 0, mon = 1, tues = 2, ... sat = 6 */
document.getElementById("current-date").innerText = "" + getMonthAsStr() + " " + new Date().getDate() + ", " + new Date().getFullYear();

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

updateSelected();