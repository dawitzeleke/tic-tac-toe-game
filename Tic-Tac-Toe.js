const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const resetBtn = document.querySelector('#resetBtn');
const Tie = document.getElementById('Tie');
const oWins = document.getElementById('owins');
const xWins= document.getElementById('xwins');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
initializeGame();
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    resetBtn.addEventListener("click", resetGame);
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `Player ${currentPlayer} wins!`
        statusText.style.color = 'green';
        running = false;
        if (currentPlayer === 'X') {
            let newvalue = parseInt(xWins.innerHTML) + 1;
            xWins.innerHTML = newvalue;
        }
        else if (currentPlayer=== 'O') {
            let newvalue = parseInt(oWins.innerHTML) + 1;
            oWins.innerHTML = newvalue;
        }
        
    }

    else if(!options.includes("")){
        statusText.textContent = `it's a Draw!`;
        statusText.style.color = 'yellow';
        let newvalue = parseInt(Tie.innerHTML) + 1;
        Tie.innerHTML = newvalue;
        running = false;
    }

    else{
        changePlayer();
    }

}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    statusText.style.color = 'white';
    running = true;
}
function resetGame(){
    restartGame()
    xWins.innerHTML = 0;
    oWins.innerHTML = 0;
    Tie.innerHTML= 0;
}