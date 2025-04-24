var posts = [    // Can't figure out how to read from a darn json file
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
    }`,
    `{
        "title": "FTC 2024-2025"
    }`,
    `{
        "name": "New Code Structure!",
        "link": "new-code-structure.html"
    }`,
    `{
        "name": "Season End",
        "link": "Season-Recap.html"
    }`,
    `{
        "title": "General FTC"
    }`,
    `{
        "name": "Plans for Trailblazer",
        "link": "Plans-for-Trailblazer.html"
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