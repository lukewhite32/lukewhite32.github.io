

function load(jsonFile) {
    for (let x = 0; x < jsonFile.length; x ++) {
        var mydata = jsonFile[x];
        if (mydata.title != undefined) {
            let toc = document.getElementById("table-of-contents");
            let elem = document.createElement("div");
            elem.innerHTML = '<div class="index-title"><p>' + mydata.title + '</p></div>';

            toc.appendChild(elem);
        }
        else {
            let toc = document.getElementById("table-of-contents");
            let elem = document.createElement("div");
            elem.innerHTML = `<div class="index" id=` + mydata.name + ` onclick="changeContent('${mydata.content}', '${mydata.name}');"><p>` + mydata.name + `</a></div>`;

            toc.appendChild(elem);
        }
    }
}

fetch('http://127.0.0.1/allposts.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        load(json);
    });