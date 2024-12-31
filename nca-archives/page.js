// This is for dynamically scaling the page

function scaleDown() {
    document.getElementById("table-of-contents").style.display = "none";
    document.getElementById("images").style.display = "none";
    document.getElementById("toc-hamburger").style.display = "block";

    document.getElementById("main").style.marginLeft = "10%";
    document.getElementById("main").style.marginRight = "10%";

    document.getElementById("top-header").style.paddingTop = "12px";
}

function scaleUp() {
    document.getElementById("table-of-contents").style.display = "inline";
    document.getElementById("images").style.display = "block";
    document.getElementById("toc-hamburger").style.display = "none";

    document.getElementById("main").style.marginLeft = "15%";
    document.getElementById("main").style.marginRight = "15%";

    document.getElementById("top-header").style.paddingTop = "35px";
}

function expandFullScreenToc() {
    document.getElementById("table-of-contents").style.display = "block";
    document.getElementById("table-of-contents").style.width = "100%";

    document.getElementById("toc-hamburger").style.display = "none";
    document.getElementById("toc-close").style.display = "block";
}

function shrinkFullScreenToc() {
    document.getElementById("toc-hamburger").style.display = "block";
    document.getElementById("table-of-contents").style.display = "none";
    document.getElementById("table-of-contents").style.width = "15%";
    document.getElementById("toc-close").style.display = "none";
}

if (document.documentElement.clientWidth < 930) {
    scaleDown();
}
else {
    scaleUp();
}


window.addEventListener("resize", () => {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    
    if (w < 930) {
        scaleDown();
    }
    else {
        scaleUp();
    }
});


var hamburgerIsTriggered = false;
document.getElementById("toc-hamburger").onclick = () => {
    expandFullScreenToc();
}

document.getElementById("toc-close").onclick = () => {
    shrinkFullScreenToc();
}