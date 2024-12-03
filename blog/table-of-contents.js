var posts = [
    `{
        "title": "Table Of Contents"
    }`,
    `{
        "name": "Home",
        "link": "index.html"
    }`,
    `{
        "title": "Calculator"
    }`,
    `{
        "name": "Broken Calculator... Kinda",
        "link": "broken-calculator.html"
    }`
]

function load() {
    for (let x = 0; x < posts.length; x ++) {
        var mydata = JSON.parse(posts[x]);
        if (mydata.title != undefined) {
            let toc = document.getElementById("table-of-contents");
            let elem = document.createElement("div");
            elem.innerHTML = '<div class="index-title"><p>' + mydata.title + '</p></div>';

            toc.appendChild(elem);
        }
        else {
            let toc = document.getElementById("table-of-contents");
            let elem = document.createElement("div");
            elem.innerHTML = `<div class="index" onclick="window.location.href = '` + mydata.link + `'"><p>` + mydata.name + `</a></div>`;
            if (mydata.name == blogName) {
                elem.style.backgroundColor = "rgb(165, 165, 165)";
            }

            toc.appendChild(elem);
        }
        
    }
}

load();