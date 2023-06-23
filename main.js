const gameHtml =         
`<h1 style="font-family: monospace; font-size: 3em; color: red;">Games</h1>
<button style="
    background-color: rgb(8, 163, 163); 
    border: 0; 
    font-size: 2em; 
    color: white; 
    width: 200px;
    height: 200px;
    margin-right: 70%;
    " 
    onclick="window.location.href='games/tictactoe'">Tic-Tac-Toe</button>
`
const foodHtml = `
<h1>Food app</h1>
<p>A food app developed for my sister.</p>
<div><button style="
    background-color: darkred;
    color: white;
    border: 0;
    width: 200px;
    height: 100px;
    font-size: 1.8em;
    "
    onclick="window.location.href = 'food-app';">Click here</button>
</div>
`

const homeHtml = `
<h1>Welcome to my site!</h1>
<p>Just another Github site! Nothing unusual, maybe just a few games here and there.</p>
<h2>UNDER DEVELOPMENT</h2>
`

class MultiPageManager {
    constructor(mainPage, onColor, offColor) {
        this.mainPage = mainPage;
        this.options = [];
        this.activePage = 0;
        this.onColor = onColor;
        this.offColor = offColor;
    }
    updatePage() {
        this.mainPage.innerHTML = this.options[this.activePage].html;
        this.mainPage.style.backgroundColor = this.options[this.activePage].backColor;
        this.options[this.activePage].buttonObj.style.backgroundColor = this.onColor;
        this.options[this.activePage].buttonObj.style.color = this.offColor;

        this.options.forEach(option => {
            if (option != this.options[this.activePage]) {
                option.buttonObj.style.backgroundColor = this.offColor;
                option.buttonObj.style.color = this.onColor;
            }
        });
    }
    addOption(_name, _html, _buttonObj, _backColor = "white") {
        _buttonObj.onmouseover = () => {
            _buttonObj.style.backgroundColor = this.onColor;
            _buttonObj.style.color = this.offColor;
        };
        _buttonObj.onmouseleave = () => {
            _buttonObj.style.backgroundColor = this.offColor;
            _buttonObj.style.color = this.onColor;
        }
        this.options.push({
            name: _name,
            buttonObj: _buttonObj,
            html: _html,
            backColor: _backColor
        });
    }
    changeOption(_name) {
        this.options.forEach(option => {
            option.buttonObj.onmouseover = () => {
                option.buttonObj.style.backgroundColor = this.onColor;
                option.buttonObj.style.color = this.offColor
            }
            option.buttonObj.onmouseleave = () => {
                option.buttonObj.style.backgroundColor = this.offColor;
                option.buttonObj.style.color = this.onColor
            }
        });

        for (let x = 0; x < this.options.length; x ++) {
            if (this.options[x].name == _name) {
                this.activePage = x;
                this.options[x].buttonObj.onmouseleave = () => {};
            }
        }
        this.updatePage();
    }
};

var manager = new MultiPageManager(document.getElementById("main-page"), "white", "darkred");

manager.addOption("home", homeHtml, document.getElementById("home"));
manager.addOption("food", foodHtml, document.getElementById("foodapp"));
manager.addOption("game", gameHtml, document.getElementById("games"), "black");

document.getElementById("home").onclick = () => {
    manager.changeOption("home");
};

document.getElementById("foodapp").onclick = () => {
    manager.changeOption("food");
};

document.getElementById("games").onclick = () => {
    manager.changeOption("game");
};
manager.changeOption("home");