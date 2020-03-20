document.addEventListener('keydown', e => {
    if (e.keyCode == 37) {
      playerMove(-1);
    } else if (e.keyCode == 39) {
      playerMove(1);
    } else if (e.keyCode == 40) {
      drop();
    } else if (e.keyCode == 38 || e.keyCode == 88) {
      playerRotate(1);
    } else if (e.keyCode == 17 || e.keyCode == 90) {
      playerRotate(-1);
    } else if (e.keyCode == 67 || e.keyCode == 16) {
      isPaused = true;
    } else if (e.keyCode == 32) {
      hardDrop();
    } else if (e.keyCode == 27 || e.keyCode == 112) {
      pauseGame();
    }
  })
  
  document.addEventListener('keyup', e => {
    if (e.keyCode == 67 || e.keyCode == 16) {
      isPaused = false;
      requestAnimationFrame(update);
    }
  })