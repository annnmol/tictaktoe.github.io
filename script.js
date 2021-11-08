console.log("hello")

let audioTurn = new Audio("./images/ting.mp3")
let audioOver = new Audio("./images/wingame.mp3")
let turn = "X";
isgameover = false;
let gif = document.querySelector('.gif')
let gif2 = document.querySelector('.gif2')
let turnInfo = document.querySelector('.turninfo')
let line = document.querySelector('.line')
let linesecond = document.querySelector('.line2')

let leftplayercount = document.querySelector('.leftplayer')
let rightplayercount = document.querySelector('.rightplayer')
let container=document.querySelector('.container')
let lc = 0;
let rc = 0;

// using media query for winning line
var mq = window.matchMedia( "(max-width: 850px)" );


// console.log(turn)



function changeTurn() {
    if (turn === "X") {
        console.log("true")
        turn = "0"
        return turn
    } else {
        console.log("false")
        turn = "X"
        return turn
    }

}

function checkWin() {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        //0-1-2 value are for check same input
        //3-4-5 values are for winning line displayed on desktop
        //6-7-8 values are for winning line displayed on mobile screen

        [0, 1, 2, 0, 5, 0, 0, 14, 0],
        [0, 3, 6, -10, 15, 90, -30, 45, 90],
        [0, 4, 8, 0, 15, 45, 0, 45, 45],
        [1, 4, 7, 0, 15, 90, 0, 45, 90],
        [2, 5, 8, 10, 15, 90, 30, 45, 90],
        [2, 4, 6, 0, 15, 135, 0, 45, 135],
        [3, 4, 5, 0, 15, 0, 0, 44, 0],
        [6, 7, 8, 0, 25, 0, 0, 74, 0],
    ]

    wins.forEach(e => {
        if ((boxtexts[e[0]].innerHTML === boxtexts[e[1]].innerHTML) && (boxtexts[e[1]].innerHTML === boxtexts[e[2]].innerHTML) && (boxtexts[e[0]].innerHTML === boxtexts[e[2]].innerHTML) && (boxtexts[e[1]].innerHTML !== '')) {
            audioOver.play();
            isgameover = true
            let winInfo = document.querySelector('.turninfo')
            winInfo.innerHTML = " " + boxtexts[e[0]].innerHTML + " player wins";
            container.classList.add("containeranimation")

            if (mq.matches) {
                // window width is at less than 850px
                line.style.transform = `translate(${e[6]}vw,${e[7]}vw) rotate(${e[8]}deg)`
            line.style.width = '90vw';
            }
            else {
                // window width is greater than 850px
                line.style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
            line.style.width = '30vw';
            }
            

            if (boxtexts[e[0]].innerHTML === 'X') {
                lc += 1;
                gif.style.width = '20vw';
                leftplayercount.innerHTML = "X Player Wins: " + lc;
            } else {

                rc += 1;
                rightplayercount.innerHTML = "0 Player Wins: " + rc;
                gif2.style.width = '20vw';
            }


        }

    })

}



let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.boxtext')
    element.addEventListener('click', () => {
        if (boxText.innerHTML === '') {
            // console.log("success")
            boxText.innerHTML = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (isgameover == false) {

                turnInfo.innerHTML = "Turn for " + turn;
            }
        }
    })
})


let reset = document.querySelector('.reset')
reset.addEventListener('click', () => {

    //reload entire page
    // location.reload();
    // window.location = window.location

    let boxtexts = document.querySelectorAll('.boxtext')
    Array.from(boxtexts).forEach(element => {
        container.classList.remove("containeranimation")
        element.innerHTML = ""
        line.style.width = '0';
        gif.style.width = '0';
        gif2.style.width = '0';
        turn = "X";
        isgameover = false;
        turnInfo.innerHTML = "Turn for " + turn;

    })
})