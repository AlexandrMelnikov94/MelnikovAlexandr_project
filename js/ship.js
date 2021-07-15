(function () {

  var fieldWidth = 1200;
  var playerWidth = 100;
  var bulletWidth = 50;
  var area = document.getElementById('field');
  var player = document.getElementById('player');
  var bullet = document.getElementById('bullet');

  var mainPlayer = new Player(player);
  var newBullet = new Bullet(bullet);

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

// Движение
  function movePlayer(e) {
    if (e.keyCode === 37) {
      mainPlayer.speedPlayerX = -10;
    }
    if (e.keyCode === 39) {
      mainPlayer.speedPlayerX = 10;
    }
    if (e.keyCode === 32) {
      newBullet.fireBullet();
    }
  }

  function stopPlayerMove() {
    mainPlayer.speedPlayerX = 0;
  }

  //Стрельба


  function Bullet (bullet) {
    this.speedY = 10;
    this.Update = function () {
      bullet.style.top = bullet.offsetTop - this.speedY + 'px';
    }
    this.createBulletElement = function () {
      bullet = document.createElement('img');
      bullet.src = 'img/bullet.png';
      bullet.id = 'bullet';
      bullet.style.bottom = playerWidth + 'px';
      bullet.style.left = player.style.left;
      return bullet;
    }
    this.fireBullet = function () {
      bullet = this.createBulletElement()
      area.appendChild(bullet);
    }
  }



  //-----------------------------------------------------------------------------------------------------------

  function Start() {
    newBullet.Update();
    mainPlayer.Update();
    RequestAnimationFrame(Start);
  }

  function initGame() {
    RequestAnimationFrame(Start);
  }


  window.onload = initGame;
  window.onkeydown = movePlayer;
  window.onkeyup = stopPlayerMove;

}());