const clearLine = () => {
    let rowCount = 1;
    outer: for (let y = field.length - 1; y > 0; --y) {
      for (let x = 0; x< field[y].length; ++x) {
        if (!field[y][x]) {
          continue outer;
        }
      }
      const row = field.splice(y, 1)[0].fill(0);
      field.unshift(row);
      ++y;
      scoreCounter += rowCount * 10;
      rowCount *= 2;
      clearLineTone.play();
    }
  }


  const canvas = document.querySelector('#tetris');
const ctx = canvas.getContext('2d');

ctx.scale(20, 20);

const player = {
  pos: { left: 0, top: 0 },
  matrix: null
}

// Show intro screen
const intro = document.querySelector('.intro');


//buttons
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const gameOverEl = document.querySelector('.game-over');

const audio = document.querySelector('#audio');
const clearLineTone = document.querySelector('#clearline');
const collideTone = document.querySelector('#collide');
const gameOverTone = document.querySelector('#gameover');

const showHelpBtn = document.querySelector('#help');
const hideHelpBtn = document.querySelector('#close');
const helpMenu = document.querySelector('.help');

audio.volume = 0.3;
clearLineTone.volume = 0.4;
collideTone.volume = 0.4;
gameOverTone.volume = 0.5

let scoreCounter = 0;
const score = document.querySelector('#score');

const draw = () => {
  score.textContent = scoreCounter;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(field, { left: 0, top: 0 });
  drawMatrix(player.matrix, player.pos);
}

const createMatrix = (width, height) => {
  const matrix = [];
  while (height--) {
    matrix.push(Array(width).fill(0));
  }
  return matrix;
}

const drawMatrix = (matrix, { left, top }) => {
  const colors = ['purple', 'yellow', 'orange', 'blue', 'cyan', 'green', 'red']
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillStyle = colors[value - 1];
        ctx.fillRect(x + left, y + top, 1, 1);
      }
    })
  });
}

const collide = (arena, player) => {
  const [matrix, offset] = [player.matrix, player.pos];
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[i].length; ++j) {
      if (matrix[i][j] &&
        (arena[i + offset.top] &&
          arena[i + offset.top][j + offset.left]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

const field = createMatrix(12, 20);

const drawBlockOnField = (field, block) => {
  const { left, top } = block.pos;
  block.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        field[y + top][x + left] = value;
      }
    })
  })
}

const playerMove = direction => {
  player.pos.left += direction;
  collideTone.play();
  if (collide(field, player)) {
    // collideTone.play();
    player.pos.left -= direction;
  }
}

let dropCounter = 0;
let dropInterval = 1000;
let isPaused = false;
let request;
let lastTime = 0;
let gameOver = false;

const update = (time = 0) => {
  const currTime = time - lastTime;
  lastTime = time;

  dropCounter += currTime;

  if (dropCounter > dropInterval) {
    drop();
  }
  draw();
  if (!isPaused && !gameOver) {
    if (lastTime == 0) {
      setTimeout(startGame, 3000);
      document.querySelector('.cover').style.display = 'flex';
    } else {
      request = requestAnimationFrame(update);
    }
  }
}

const startGame = () => {
  document.querySelector('.cover').style.display = 'none';
  request = requestAnimationFrame(update);
}

const hardDrop = () => {
  while(!collide(field, player)) {
    player.pos.top++;  
  }

  if (collide(field, player)) {
    player.pos.top--;
  }
  collideTone.play();
} 

const drop = () => {
  player.pos.top++;
  if (collide(field, player)) {
    collideTone.play();
    player.pos.top--;
    drawBlockOnField(field, player);
    playerReset();
    clearLine();
  }
  dropCounter = 0;
}

const playerRotate = dir => {
  const positionLeft = player.pos.left;
  let offset = 1;
  rotate(player.matrix, dir);   
  while (collide(field, player)) {
    player.pos.left += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.left = positionLeft;
      return;
    }
  }
}

const rotate = (matrix, dir) => {
  collideTone.play();
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < i; ++j) {
      [
        matrix[j][i],
        matrix[i][j]
      ] = [
          matrix[i][j],
          matrix[j][i]
        ]
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse()
  }
}



pauseButton.disabled = true;
showHelpBtn.disabled = true;
startButton.disabled = true;

const closeIntro = () => {
  intro.style.display = 'none';
  pauseButton.disabled = true;
  audio.play();
  startButton.textContent = 'START';
  startButton.disabled = false;
  showHelpBtn.disabled = false;
}

const startNewGame = () => {
  intro.style.display = 'none';
  pauseButton.disabled = false;
  audio.play();
  field.forEach(row => row.fill(0));
  startButton.textContent = 'Start';
  startButton.disabled = true;
  gameOver = false;
  gameOverEl.style.display = 'none';
  playerReset()
  update()
  draw();
}

const pauseGame = () => {
  audio.pause();
  isPaused = !isPaused;
  const buttonText = isPaused ? 'Resume' : 'Pause';
  pauseButton.textContent = buttonText;
  if (!isPaused) {
    audio.play()
;    setTimeout(startGame, 3000);
    document.querySelector('.cover').style.display = 'flex';
  }
}

const showHelp = () => {
  helpMenu.style.display = 'flex';
  intro.style.display = 'none';
}

const hideHelp = () => {
  helpMenu.style.display = 'none';
}