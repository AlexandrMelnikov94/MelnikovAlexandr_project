(function () {

  var fieldWidth = 1200;
  var playerWidth = 100;
  var player = document.getElementById('player');

  var mainPlayer = new Player(player);

  var RequestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||

    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  function Player(player) {
    this.speedPlayerX = 0;
    player.style.left = fieldWidth / 2 - playerWidth / 2 + 'px';
    this.Update = function () {
      player.style.left = player.offsetLeft + this.speedPlayerX + 'px';
      if (player.offsetLeft <= 0) {
        player.style.left = '0px';
      } else if (player.offsetLeft >= fieldWidth - playerWidth) {
        player.style.left = fieldWidth - playerWidth + 'px';
      }
    }
  }

  function movePlayer(e) {
    if (e.keyCode === 37) {
      mainPlayer.speedPlayerX = -10;
    }
    if (e.keyCode === 39) {
      mainPlayer.speedPlayerX = 10;
    }
  }

  function stopPlayerMove() {
    mainPlayer.speedPlayerX = 0;
  }

  //-----------------------------------------------------------------------------------------------------------

  function Start() {
    mainPlayer.Update ();
    RequestAnimationFrame(Start);
  }

  function initGame() {
    RequestAnimationFrame(Start);
  }

  window.onload = initGame;
  window.onkeydown = movePlayer;
  window.onkeyup = stopPlayerMove;
}());