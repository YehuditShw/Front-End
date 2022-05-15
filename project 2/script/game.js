// create matrix
const row = 14;
const column = 21;
let finishTime;
let data = JSON.parse(localStorage.getItem('usersDetails'));
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let maxTime = 1800 / currentUser.level;
let mat = ('0'.repeat(column) + '\n').repeat(row).split('\n').map(line => line.split('').map(a => +a));
//restart variables
let countBall = 120;
let maxBall = 200;
let arr = [];
let time = 0;
let status_ = "start";
let canClick = false;
let len = 1;
let audio = document.getElementById("aud");
let audio2 = document.getElementById("aud2");
// define the random ball
let bigBubble = {
    color: 0,
    x: (column - 1) / 2,
    y: row - 1
}
// currentUser detales
// act the game and 
function start() {
    if (status_ !== "finish" && status_ !== "continue") {
        if (status_ === "start") {
            createTable();
            time = 0;
        }
        if (status_ === "startAgain" || status_ === "start") {
            randomBoard();
            currentUser.score = 0;
            time = 0;
        }
    }
    if (status_ !== "finish") {
        locateBall();

        canClick = true;
    }
 
}
// act the function create table during the whole game 
let intervalId = setInterval(() => {
    let gf = document.getElementsByTagName('table');
    document.body.removeChild(gf[0]);
    createTable();
}, 100);

//
let intervalTime = setInterval(() => {
    let t1 = document.getElementById("time1");
    let t2 = document.getElementById("time2");
    t1.style.height = (100 - len) + 'vh';
    t2.style.height = len + 'vh';
    len++;
}, maxTime);

// rand the ball of the mat 
function randomBoard() {
    let count = 0;
    for (let i = 0; i < row && count < countBall; ++i) {
        for (let j = i; j < column - i && count < countBall; ++j) {
            mat[i][j] = randBall();
            ++count;
        }
    }
}
// create the html table
function createTable() {
    table = '<table>'
    for (let i = 0; i < row; ++i) {
        let tr = '<tr>'
        for (let j = 0; j < column; ++j) {
            if (mat[i][j]) {
                let td = `<td><img src="../images/${mat[i][j]}.png" />  </td>`;
                tr += td;
            }
            else {
                let td = `<td></td>`;
                tr += td;
            }
        }
        tr += '</tr>';
        table += tr;
    }
    table += '</table>';
    document.body.innerHTML += table;
    let points_ = document.getElementById("points");
    points_.innerHTML = `<p> ${currentUser.score}</p>`
    points_.classList = "animation";
    points_.classList = "";

}
// stoper
const setTime = setInterval(() => {
    time++;
}, 1000);
//locate the random ball
function locateBall() {
    mat[bigBubble.y][bigBubble.x] = randBall();
}
//rand ball
function randBall() {

    return Math.floor(Math.random() * 6) + 1;
}
// bomb the the balls
function bomb(color) {
    for (let j = 0; j < arr.length; ++j) {

        findBallsToBomb(arr[j], color);
    }
    if (arr.length > 1) {
        countBall -= arr.length;
        ++countBall;
        currentUser.score += arr.length;
        up();
    }
    else {
        countBall++;
    }

    arr.length = 0;
    return "";
}
//take the balls up afer bomb
function up() {
    let flag = 1;
    while (flag) {
        flag = 0;
        for (let i = 0; i < column; ++i) {
            for (let j = 0; j < row; ++j) {
                if (!mat[j][i] && mat[j + 1][i]) {
                    mat[j][i] = mat[j + 1][i];
                    mat[j + 1][i] = 0;
                    flag = 1;
                }
            }
        }
    }
}
function status() {
    bigBubble.x = (column - 1) / 2;
    bigBubble.y = row - 1;
    if (time > maxTime / 10 - 1 || countBall >= maxBall) {
        countBall = 120;
        currentUser.games++;
        if (currentUser.score > currentUser.bestScore)
            currentUser.bestScore = currentUser.score;
        finishTime = time;
        if (finishTime < currentUser.bestTime) {
            currentUser.bestTime = finishTime;
        }
        status_ = "game over";
        fail();
        return "game over";
    }
    if (countBall <= 0) {
        ++currentUser.level;
        finishTime = time;
        if (finishTime < currentUser.bestTime) {
            currentUser.bestTime = finishTime;
        }
        countBall = 120;
        countActions = 0;
        currentUser.games++;
        currentUser.wins++;
        status_ = "next level";
        if (currentUser.score > currentUser.bestScore)
            currentUser.bestScore = currentUser.score;
        if (finishTime < currentUser.bestTime)
            currentUser.bestTime = finishTime;

        win();
        return "next level";
    }
    return "continue";
}
// get the user input
document.addEventListener('keydown', (event) => {
    if (canClick) {
        switch (event.keyCode) {
            case 37:
                moveLeft();
                break;
            case 38:
                audio.play();
                moveUp();
                break;
            case 39:
                moveRight();
                break;
        }
    }
});
//move the big Ball left
function moveLeft() {

    if (bigBubble.x > 0) {

        [mat[bigBubble.y][bigBubble.x], mat[bigBubble.y][bigBubble.x - 1]] = [mat[bigBubble.y][bigBubble.x - 1], mat[bigBubble.y][bigBubble.x]];
        bigBubble.x--;
    }
}
//move the big Ball right
function moveRight() {
    if (bigBubble.x < column - 1) {
        [mat[bigBubble.y][bigBubble.x], mat[bigBubble.y][bigBubble.x + 1]] = [mat[bigBubble.y][bigBubble.x + 1], mat[bigBubble.y][bigBubble.x]];
        bigBubble.x++;
    }
}
//move the big Ball up
function moveUp() {
    canClick = false;

    for (let i = (row - 1); i > 0 && !mat[bigBubble.y - 1][bigBubble.x]; --i) {
        mat[bigBubble.y - 1][bigBubble.x] = mat[bigBubble.y][bigBubble.x];
        mat[bigBubble.y][bigBubble.x] = 0;
        --bigBubble.y;
    }
    arr.push({ x: bigBubble.x, y: bigBubble.y });

    let func = bomb(mat[bigBubble.y][bigBubble.x])

    status_ = status();
    if (status_ !== "finish" && status_ !== "next level" && status_ !== "game over")
        start();
}
// chek which balls to bomb and bomb
function findBallsToBomb(location, color) {
    if (!maxTop(location)) {

        if (mat[location.y - 1][location.x] === color) {
            arr.push({ x: location.x, y: (location.y - 1) });
            mat[location.y - 1][location.x] = 0;
            mat[bigBubble.y][bigBubble.x] = 0;
            audio2.play();
        }


        if (!maxRight(location) && mat[location.y - 1][location.x + 1] === color) {
            arr.push({ x: (location.x + 1), y: (location.y - 1) });
            mat[location.y - 1][location.x + 1] = 0;
            mat[bigBubble.y][bigBubble.x] = 0;
            audio2.play();
        }

        if (!maxLeft(location) && mat[location.y - 1][location.x - 1] === color) {
            arr.push({ x: (location.x - 1), y: (location.y - 1) });
            mat[location.y - 1][location.x - 1] = 0;
            mat[bigBubble.y][bigBubble.x] = 0;
            audio2.play();
        }

    }
    if (!maxButtom(location)) {
        if (mat[location.y + 1][location.x] === color) {

            arr.push({ x: location.x, y: (location.y + 1) });
            mat[location.y + 1][location.x] = 0;
            mat[bigBubble.y][bigBubble.x] = 0;
            audio2.play();
        }


        if (!maxRight(location) && mat[location.y + 1][location.x + 1] === color) {
            arr.push({ x: (location.x + 1), y: (location.y + 1) });
            mat[location.y + 1][location.x + 1] = 0;
            mat[bigBubble.y][bigBubble.x] = 0;
            audio2.play();
        }


        if (!maxLeft(location) && mat[location.y + 1][location.x - 1] === color) {
            arr.push({ x: (location.x - 1), y: (location.y + 1) });
            mat[location.y + 1][location.x - 1] = 0;
            mat[bigBubble.y][bigBubble.x] = 0;
            audio2.play();


        }
    }

    if (!maxRight(location) && mat[location.y][location.x + 1] === color) {
        arr.push({ x: (location.x + 1), y: (location.y) });
        mat[location.y][location.x + 1] = 0;
        mat[bigBubble.y][bigBubble.x] = 0;
        audio2.play();
    }

    if (!maxLeft(location) && mat[location.y][location.x - 1] === color) {

        arr.push({ x: (location.x - 1), y: (location.y) });
        mat[location.y][location.x - 1] = 0;
        mat[bigBubble.y][bigBubble.x] = 0;
        audio2.play();
    }
}

//check if the locate is valid
function maxTop(location) {
    return (location.y === 0);
}
function maxRight(location) {
    return (location.x === (column - 1));
}
function maxLeft(location) {
    return (location.x === 0);
}
function maxButtom(location) {
    return (location.y === (row - 1));
}
function startAgain() {
    console.log("try again")
    let myModal = document.getElementById("myModal");
    myModal.style.display = 'none';

}
function fail() {
    let modal = document.getElementById('myModal');
    modal.style.display = 'block';

    canClick = false;
    let button = document.getElementById("newGame");
    let points = document.getElementById("yourPoints");
    points.innerHTML = `<p>scores: ${currentUser.score}</p>`;
    let bestPoint = document.getElementById("bestPoint");
    bestPoint.innerHTML = `<p>best scores:${currentUser.bestScore}<br></p>`;
    let time = document.getElementById("thisTime");
    console.log(finishTime);
    time.innerHTML = `<p>time:0${Math.floor(finishTime/60)}:${finishTime%60}<br></p>`;
    let bestTime = document.getElementById("bestTime");
    bestTime.innerHTML = `<p>your best time:${Math.floor(currentUser.bestTime/60)}:${currentUser.bestTime%60}<br></p>`;
    let games = document.getElementById("numOfGames");
    games.innerHTML = `<p>games:${currentUser.games}<br></p>`;
    let win = document.getElementById("wins");
    win.innerHTML = `<p>games you won:${currentUser.wins}</p>`;
    endGame();
}

function win() {

    let button_ = document.getElementById("newGame");
    button_.addEventListener('click', () => {
        let myModal = document.getElementById("myModal");
        myModal.style.display = 'none';
        status_ = "startAgain";
        start();

    });
    let modal = document.getElementById('myModal');
    modal.style.display = 'block';
    canClick = false;
    let button = document.getElementById("newGame");
    button.innerHTML = `<p> next level</p>`;
    let points = document.getElementById("yourPoints");
    points.innerHTML = `<p>scores:${currentUser.score}<br></p>`;
    let bestPoint = document.getElementById("bestPoint");
    bestPoint.innerHTML = `<p>best scores:${currentUser.bestScore}<br></p>`;
    let time = document.getElementById("thisTime");
    time.innerHTML = `<p>time:${Math.floor(finishTime/60)}:${finishTime%60}<br></p>`;
    let bestTime = document.getElementById("bestTime");
    bestTime.innerHTML = `<p>your best time: ${Math.floor(currentUser.bestScore/60)}:${currentUser.bestScore%60}<br></p>`;
    let games = document.getElementById("numOfGames");
    games.innerHTML = `<p>games${currentUser.games}<br></p>`;
    let win = document.getElementById("wins");
    win.innerHTML = `<p>games you won: ${currentUser.wins}</p>`;
    endGame();
}
const endGame = () => {
    let index = JSON.parse(localStorage.getItem('index'));
    data.pop(data[index]);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    data.push(currentUser)
    localStorage.setItem('usersDetails', JSON.stringify(data))
}
window.addEventListener(resizeBy, (event) => refresh);

function refresh() {
    let gf = document.getElementsByTagName('table');
    document.body.removeChild(gf[0]);
    createTable();
}