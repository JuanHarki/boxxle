import {levels} from "./levels.js";

let mainaudio = new Audio();
let audio = new Audio();
mainaudio.src = "music.mp3";
audio.src = "secret.mp3"
function init(levelNum){
  level = levels[levelNum]
  if (rightLevel(level)) {
    window.requestAnimationFrame(animation)
  } else {
    console.log("bad level : it does not contains exactly 1 player, or contains no boxes")
    console.log(level)
    init(0)
  }
}
let level
let thisLevel = 0;
init(0)
function animation() {
  let board = createBoard(level)
  document.getElementById("game-container").innerHTML = ""
  document.body.appendChild(board)
  const gameContainer = document.getElementById('game-container');
  gameContainer.appendChild(board);
  window.requestAnimationFrame(animation)
}
function rightLevel(level) {
  let nbPlayers = 0;
  let nbBoxes = 0;
  let lineLength
  for (let i = 0; i < level.length; i++) {
    if (i > 0 && level[i].length !== lineLength) {
      return false
    }
    for (let j = 0; j < level[i].length; j++) {
      if (level[i][j] === 2) {nbBoxes++}
      if (level[i][j] === 3) {nbPlayers++}
    }
    lineLength = level[i].length
  }
  return (nbPlayers === 1 && nbBoxes > 0)
}
function createBoard(level) {
  const board = document.createElement('div');
  board.className = 'board';
  level.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'row';
    row.forEach(cell => {
      const cellEl = document.createElement('div');
      cellEl.className = 'cell';
      if (cell === 1) {
        cellEl.classList.add('wall');
      }
      if (cell === 2 || cell === 5) {
        cellEl.classList.add('box');
      }
      if (cell === 3 || cell === 6) {
        cellEl.classList.add('player');
      }
      if (cell === 4) {
        cellEl.classList.add('target')
      }
      if (cell === 5 || cell === 6) {
        cellEl.classList.add('on-target');
      }
      if (cell === 0) {
        cellEl.classList.add('empty');
      }
      rowEl.appendChild(cellEl);
    });
    board.appendChild(rowEl);
  });
  return board;
}
function playerPosition(level) {
  let position = {row: -1, col: -1};
  for (let i = 0; i < level.length; i++) {
    if (level[i].includes(3) || level[i].includes(6)) {
      position.row = i;
      position.col = level[i].indexOf(3) !== -1 ? level[i].indexOf(3) : level[i].indexOf(6);
      break;
    }
  }
  return position;
}
document.addEventListener('keydown', (event) => {
  let pos = playerPosition(level);
  let playerRow = pos.row;
  let playerCol = pos.col;
  let playerCell = level[playerRow][playerCol];
  if (event.key === 'ArrowRight') {
    if (playerRow+1 < level.length) {
      let nextCell = level[playerRow+1][playerCol]
      if (nextCell !== 1) {
        if (nextCell === 2 || nextCell === 5) {
          if (playerRow+2 < level.length) {
            let nextNextCell = level[playerRow+2][playerCol]
            if (nextNextCell !== 1 && nextNextCell !== 2 && nextNextCell !== 5) {
              if (playerCell === 6) {
                level[playerRow][playerCol] = 4;
              } else {
                level[playerRow][playerCol] = 0;
              }
              if (nextCell === 5) {
                level[playerRow+1][playerCol] = 6;
              } else {
                level[playerRow+1][playerCol] = 3;
              }
              if (nextNextCell === 4) {
                level[playerRow+2][playerCol] = 5;
              } else {
                level[playerRow+2][playerCol] = 2;
              }
            }
          }
        } else {
          if (playerCell === 6) {
            level[playerRow][playerCol] = 4;
          } else {
            level[playerRow][playerCol] = 0;
          }
          if (nextCell === 4) {
            level[playerRow+1][playerCol] = 6;
          } else {
            level[playerRow+1][playerCol] = 3;
          }
        }
      }
    }
  } else if (event.key === 'ArrowLeft') {
    if (playerRow-1 >= 0) {
      let nextCell = level[playerRow-1][playerCol]
      if (nextCell !== 1) {
        if (nextCell === 2 || nextCell === 5) {
          if (playerRow-2 >= 0) {
            let nextNextCell = level[playerRow-2][playerCol]
            if (nextNextCell !== 1 && nextNextCell !== 2 && nextNextCell !== 5) {
              if (playerCell === 6) {
                level[playerRow][playerCol] = 4;
              } else {
                level[playerRow][playerCol] = 0;
              }
              if (nextCell === 5) {
                level[playerRow-1][playerCol] = 6;
              } else {
                level[playerRow-1][playerCol] = 3;
              }
              if (nextNextCell === 4) {
                level[playerRow-2][playerCol] = 5;
              } else {
                level[playerRow-2][playerCol] = 2;
              }
            }
          }
        } else {
          if (playerCell === 6) {
            level[playerRow][playerCol] = 4;
          } else {
            level[playerRow][playerCol] = 0;
          }
          if (nextCell === 4) {
            level[playerRow-1][playerCol] = 6;
          } else {
            level[playerRow-1][playerCol] = 3;
          }
        }
      }
    }
  } else if (event.key === 'ArrowDown') {
    if (playerCol+1 < level.length) {
      let nextCell = level[playerRow][playerCol+1]
      if (nextCell !== 1) {
        if (nextCell === 2 || nextCell === 5) {
          if (playerCol+2 < level.length) {
            let nextNextCell = level[playerRow][playerCol+2]
            if (nextNextCell !== 1 && nextNextCell !== 2 && nextNextCell !== 5) {
              if (playerCell === 6) {
                level[playerRow][playerCol] = 4;
              } else {
                level[playerRow][playerCol] = 0;
              }
              if (nextCell === 5) {
                level[playerRow][playerCol+1] = 6;
              } else {
                level[playerRow][playerCol+1] = 3;
              }
              if (nextNextCell === 4) {
                level[playerRow][playerCol+2] = 5;
              } else {
                level[playerRow][playerCol+2] = 2;
              }
            }
          }
        } else {
          if (playerCell === 6) {
            level[playerRow][playerCol] = 4;
          } else {
            level[playerRow][playerCol] = 0;
          }
          if (nextCell === 4) {
            level[playerRow][playerCol+1] = 6;
          } else {
            level[playerRow][playerCol+1] = 3;
          }
        }
      }
    }
  } else if (event.key === 'ArrowUp') {
    if (playerCol-1 >= 0) {
      let nextCell = level[playerRow][playerCol - 1]
      if (nextCell !== 1) {
        if (nextCell === 2 || nextCell === 5) {
          if (playerCol - 2 >= 0) {
            let nextNextCell = level[playerRow][playerCol - 2]
            if (nextNextCell !== 1 && nextNextCell !== 2 && nextNextCell !== 5) {
              if (playerCell === 6) {
                level[playerRow][playerCol] = 4;
              } else {
                level[playerRow][playerCol] = 0;
              }
              if (nextCell === 5) {
                level[playerRow][playerCol - 1] = 6;
              } else {
                level[playerRow][playerCol - 1] = 3;
              }
              if (nextNextCell === 4) {
                level[playerRow][playerCol - 2] = 5;
              } else {
                level[playerRow][playerCol - 2] = 2;
              }
            }
          }
        } else {
          if (playerCell === 6) {
            level[playerRow][playerCol] = 4;
          } else {
            level[playerRow][playerCol] = 0;
          }
          if (nextCell === 4) {
            level[playerRow][playerCol - 1] = 6;
          } else {
            level[playerRow][playerCol - 1] = 3;
          }
        }
      }
    }
  }
  if (checkWin(level)) {
    if (thisLevel < levels.length-1) {
      thisLevel++
      audio.play();
    } else {
      thisLevel = 0
    }
    init(thisLevel)
  }
})
document.getElementById("retry-button").addEventListener('click', () => {
  init(thisLevel)
});
function checkWin(level) {
  for (let i = 0; i < level.length; i++) {
    if (level[i].includes(2)) {return false}
  }
  return true;
}
document.getElementById('music-button').addEventListener('click', () => {
  mainaudio.play();
})