var breakfastItems = ['Eggs', 'Bacon', 'Toast', 'Bagel', 'Cereal', 'Parfait', 'Yogurt'];
var lunchItems = ['Pb and J', 'Tuna melt', 'Turkey sandwich', 'Ham sandwich', 'Roast beef sandwich', 'Item', 'Another item'];
var dinnerItems = ['Steak', 'Lobster', 'Spagetti', 'Mac n cheese', 'Soup', 'Chili', 'Salmon'];
alert("this is a test");
var sun = [];
var mon = [];
var tues = [];
var wed = [];
var thurs = [];
var fri = [];
var sat = [];

function shuffle(array) {          // thanks stackoverflow
    return array.sort(() => Math.random() - .5);
}

function shuffleItems() {
    sun = [];
    mon = [];
    tues = [];
    wed = [];
    thurs = [];
    fri = [];
    sat = [];
    // generate shuffled array and distribute it
    let b = shuffle(breakfastItems);
    sun.push(b[0]);
    mon.push(b[1]);
    tues.push(b[2]);
    wed.push(b[3]);
    thurs.push(b[4]);
    fri.push(b[5]);
    sat.push(b[6]);
    
    let l = shuffle(lunchItems);
    sun.push(l[0]);
    mon.push(l[1]);
    tues.push(l[2]);
    wed.push(l[3]);
    thurs.push(l[4]);
    fri.push(l[5]);
    sat.push(l[6]);

    let d = shuffle(dinnerItems);
    sun.push(d[0]);
    mon.push(d[1]);
    tues.push(d[2]);
    wed.push(d[3]);
    thurs.push(d[4]);
    fri.push(d[5]);
    sat.push(d[6]);
}

function loadTable() {
    let item = document.getElementsByClassName("grid-container")[0];
    //item.innerHTML = "<tr> <th></th> <th>Sunday</th> <th>Monday</th> <th>Tuesday</th> <th>Wednesday</th> <th>Thursday</th> <th>Friday</th> <th>Saturday</th> </tr>";
    item.innerHTML = '<div class="grid-item"></div>';
    item.innerHTML += '<div class="grid-item">Sunday</div>';
    item.innerHTML += '<div class="grid-item">Monday</div>';
    item.innerHTML += '<div class="grid-item">Tuesday</div>';
    item.innerHTML += '<div class="grid-item">Wednesday</div>';
    item.innerHTML += '<div class="grid-item">Thursday</div>';
    item.innerHTML += '<div class="grid-item">Friday</div>';
    item.innerHTML += '<div class="grid-item">Saturday</div>';

    item.innerHTML += '<div class="grid-item">Breakfast: </div>';
    item.innerHTML += '<div class="grid-item">' + sun[0] + '</div>';
    item.innerHTML += '<div class="grid-item">' + mon[0] + '</div>';
    item.innerHTML += '<div class="grid-item">' + tues[0] + '</div>';
    item.innerHTML += '<div class="grid-item">' + wed[0] + '</div>';
    item.innerHTML += '<div class="grid-item">' + thurs[0] + '</div>';
    item.innerHTML += '<div class="grid-item">' + fri[0] + '</div>';
    item.innerHTML += '<div class="grid-item">' + sat[0] + '</div>';

    item.innerHTML += '<div class="grid-item">Lunch: </div>';
    item.innerHTML += '<div class="grid-item">' + sun[1] + '</div>';
    item.innerHTML += '<div class="grid-item">' + mon[1] + '</div>';
    item.innerHTML += '<div class="grid-item">' + tues[1] + '</div>';
    item.innerHTML += '<div class="grid-item">' + wed[1] + '</div>';
    item.innerHTML += '<div class="grid-item">' + thurs[1] + '</div>';
    item.innerHTML += '<div class="grid-item">' + fri[1] + '</div>';
    item.innerHTML += '<div class="grid-item">' + sat[1] + '</div>';

    item.innerHTML += '<div class="grid-item">Dinner: </div>';
    item.innerHTML += '<div class="grid-item">' + sun[2] + '</div>';
    item.innerHTML += '<div class="grid-item">' + mon[2] + '</div>';
    item.innerHTML += '<div class="grid-item">' + tues[2] + '</div>';
    item.innerHTML += '<div class="grid-item">' + wed[2] + '</div>';
    item.innerHTML += '<div class="grid-item">' + thurs[2] + '</div>';
    item.innerHTML += '<div class="grid-item">' + fri[2] + '</div>';
    item.innerHTML += '<div class="grid-item">' + sat[2] + '</div>';
    //item.innerHTML += "<tr> <th>Breakfast</th> <td>" + sun[0] + "</td>" + " <td>" + mon[0] + "</td>" + "<td>" + tues[0] + "</td>" + "<td>" + wed[0] + "</td>" + "<td>" + thurs[0] + "</td>" + "<td>" + fri[0] + "</td>" + "<td>" + sat[0] + "</td>" + "</tr>";
    //item.innerHTML += "<tr> <th>Lunch</th><td>" + sun[1] + "</td>" + " <td>" + mon[1] + "</td>" + "<td>" + tues[1] + "</td>" + "<td>" + wed[1] + "</td>" + "<td>" + thurs[1] + "</td>" + "<td>" + fri[1] + "</td>" + "<td>" + sat[1] + "</td>" + "</tr>";
    //item.innerHTML += "<tr> <th>Dinner</th><td>" + sun[2] + "</td>" + " <td>" + mon[2] + "</td>" + "<td>" + tues[2] + "</td>" + "<td>" + wed[2] + "</td>" + "<td>" + thurs[2] + "</td>" + "<td>" + fri[2] + "</td>" + "<td>" + sat[2] + "</td>" + "</tr>";
}

document.getElementById("shuffle").onclick = () => {
    shuffleItems();
    loadTable()
};
document.getElementById("add-as-breakfast").onclick = () => {
    breakfastItems.push(document.getElementById("item-text").value);
    document.getElementById("item-text").value = ""
};
document.getElementById("add-as-lunch").onclick = () => {
    lunchItems.push(document.getElementById("item-text").value);
    document.getElementById("item-text").value = ""
};
document.getElementById("add-as-dinner").onclick = () => {
    dinnerItems.push(document.getElementById("item-text"));
    document.getElementById("item-text").value = ""
};
shuffleItems();
loadTable();