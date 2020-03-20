const createTetrimonos = type => {
    if (type == 'T') {
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]
    } else  if (type == 'O') {
      return [
        [2, 2],
        [2, 2]
      ]
    } else  if (type == 'L') {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3]
      ]
    } else  if (type == 'J') {
      return [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0]
      ]
    } else  if (type == 'I') {
      return [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0]
      ]
    } else  if (type == 'S') {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
      ]
    } else  if (type == 'Z') {
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
      ]
    }
  }
  
  const finalScore = document.querySelector('#finalScore');
  
  const playerReset = () => {
    const pieces = "ijlostz".toUpperCase();
    player.matrix = createTetrimonos(pieces[Math.floor(Math.random() * pieces.length)]);
    player.pos.top = 0;
    player.pos.left = (Math.floor(field[0].length / 2)) - (Math.floor(player.matrix[0].length / 2));
    if (collide(field, player)) {
      gameOverTone.play();
      audio.pause();
      scoreCounter = 0;
      startButton.textContent = 'Restart';
      startButton.disabled = false;
      gameOver = true;
      gameOverEl.style.display = 'flex';
      finalScore.textContent = `Score: ${scoreCounter}`;
    }
  }
  
  
  