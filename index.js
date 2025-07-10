const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

let board;
let currentPlayer;
let gameActive;

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function startGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleCellClick(index));
    boardElement.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWin()) {
    statusElement.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    statusElement.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}


window.onload = startGame;
