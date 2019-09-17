

const rows = 8;
const columns = 8;
const size = rows * columns;
let grid = [];


function generateNewGrid() {
  grid = [];
  for (var r = 0; r < rows; r++) {
    grid[r] = [];
    for (var c = 0; c < columns; c++) {
      grid[r][c] = 0;
    }
  }
}

generateNewGrid();


const words = ["DIANA", "ARIA", "CASA", "NAVE"];

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function canWordFitIn(currentValue, index, array) {
  return typeof currentValue == 'number';
}

function checkCell(direction, grid, row, col, word) {
  const cell = (direction == "lr") ? grid[row][col] : grid[col][row];
  const isEmpty = (cell == 0);
  const isWord = (typeof cell == "string");
  const currentWord = word || undefined;
  // console.log("checking: ", cell, " width:",  currentWord, " isEmpty?", isEmpty, " isWord?", isWord)
  if (isEmpty) { 
    return true;
  } else if(isWord) {
    if (currentWord == cell){
      return true;
    }else{
      return false;
    }
  }
}


function setWord(direction, row, col, word) {
  if (direction == "lr") {
    return grid[row][col] = word;
  }else if (direction == "tb") {
    return grid[col][row] = word;
  }
}

words.forEach(function(word) {
  let wordFitInGrid = false;

  if (word.length > rows || word.length > columns) return;
  
  restart:
  while (!wordFitInGrid)
  {
    // Select a random position on the 2D grid
    let col = getRandomNumber(columns);
    let row = getRandomNumber(rows);
    
    isSpaceEnough = ((rows - col) + 1) > word.length;
    // isCellAvailable = grid[row].every(canWordFitIn)
    direction = (Math.random() >= 0.5 ? "lr" : "tb");

    if(isSpaceEnough) {
      for (var i = 0; i < word.length; i++) {
        const nextPosition = col + i;
        const check = checkCell(direction, grid, row, nextPosition, word[i]);

        if (check) {
          setWord(direction, row, nextPosition, word[i]);
        } else {
          continue restart;
        }
        
        if (i == word.length -1 ) {
          wordFitInGrid = true;
        }
      }
    }
  }
  
});


let print = "";
grid.forEach(function(rows){
  rows.forEach(function(columns) {
    let letter = (typeof columns == 'number') ? "0" : columns;
    print += letter + " ";
  });
  print += "\n"
});


console.log(print);
