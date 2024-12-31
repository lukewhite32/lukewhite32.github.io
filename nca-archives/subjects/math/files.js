/*
Here is where all of the file data goes:
*/

const ninthData = [
    `{
        "name": "Biology: Practice Worksheet",
        "date": "10/14",
        "url": "ninth/Persian-Wars.png",
        "isText": false
    }`,
    `{
        "name": "Biology: Practice on Atoms",
        "date": "11/14",
        "url": "ninth/Persian-Wars.png",
        "isText": false
    }`
];

const tenthData = [
    `{
        "name": "European Wars",
        "date": "05/14",
        "url": "tenth/Persian-Wars.html",
        "isText": false
    }`
];
const eleventhData = [
    `{
        "name": "Persian Wars",
        "date": "05/14",
        "url": "eleventh/Persian-Wars.html",
        "isText": false
    }`
];
const twelfthData = [
    `{
        "name": "Persian Wars",
        "date": "05/14",
        "url": "twelfth/Persian-Wars.html",
        "isText": false
    }`
];
class DataPiece {
    constructor(name, date, url) {
        this.name = name;
        this.date = date;
        this.url = url;
    }
}

function queryData(filterDate, filterName, filterGrade) {
    var ret = [];
    var data;
    var isFilteringName = filterName != undefined;
    var isFilteringDate = filterDate != undefined;

    if (filterGrade == "ninth") {
        data = ninthData;
    }
    else if (filterGrade == "tenth") {
        data = tenthData;
    }
    else if (filterGrade == "eleventh") {
        data = eleventhData;
    }
    else {
        data = twelfthData;
    }
    for (let x = 0; x < data.length; x ++) {
        let isValid = false;
        var d = JSON.parse(data[x]);
        let dataPiece = new DataPiece(d.name, d.date, d.url);
        if (isFilteringName) {
            isValid = (d.name.includes(filterName.substring(0, 1).toLowerCase() + ((filterName.length == 1) ? "" : filterName.substring(1, filterName.length))) || d.name.includes(filterName.substring(0, 1).toUpperCase() + ((filterName.length == 1) ? "" : filterName.substring(1, filterName.length))));
        }
        else {
            isValid = true;
        }
        if (isFilteringDate) {
            if (filterDate == d.date) {
                if (isValid) {
                    ret.push(dataPiece);
                }
            }
        }
        else {
            if (isValid) {
                ret.push(dataPiece);
            }
        }
    }
    return ret;
}

function search() {

    let qDate = undefined;
    let qName = undefined;
    let qGrade = document.getElementById("search-grade").value;

    if (document.getElementById("search-date").value != ""){
        let t = document.getElementById("search-date").value.split("-");
        qDate = t[0] + t[1];
    }
    if (document.getElementById("search-name").value != ""){
        qName = document.getElementById("search-name").value;
    }

    var div = document.getElementById("queried-content");
    var results = queryData(qDate, qName, qGrade);
    div.innerHTML = `<p style="border-bottom: 2px solid black; margin-top: 15px;">Results</p>`;

    div.innerHTML += "<h3><b>Showing " + results.length.toString() + " results</b></h3>";

    results.forEach(element => {
        console.log("ELEMENT:");
        console.log(element.name);
        console.log(element.date);
        console.log(element.url);

        let newElem = document.createElement("div");
        newElem.innerHTML = `<p class="query"><a href="` + element.url + `">` + element.name + `: ` + element.date + `</p>`;
        div.appendChild(newElem);

    });
}

search();

document.getElementById("search-name").addEventListener("input", (event) => {
    search();
  });