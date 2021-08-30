var score = 0;

function startGame() {

  document.getElementById('menu').style.display = 'none';
  document.getElementById('player').style.display = 'block';


  var player = document.getElementById('player');
  var game = document.getElementById('game');

  var shooting;
  var shootTimeout = 200;
  document.getElementById('score').innerHTML = '0';

  let backgroundSound = new Audio('audio/backgroundsound.mp3');
  backgroundSound.play();
  backgroundSound.loop = true;

  function init() {
    w = window.innerWidth;
    h = window.innerHeight;

    player.style.top = h - 128 + 'px';
    player.style.left = w / 2 - 50 + 'px';
  }

  init();

// Работа с мышкой
  var mousedown = function () {
    shoot()
    if (!shooting) {
      shooting = setInterval(shoot, shootTimeout);
    }
  }
  window.addEventListener('mousedown', mousedown);

  var mouseup = function () {
    clearInterval(shooting);
    shooting = NaN;
  }
  window.addEventListener('mouseup', mouseup);

  var mousemove = function (event) {
    mouseX = event.clientX - 64;
    player.style.left = mouseX + 7 + 'px';
  }

  window.addEventListener('mousemove', mousemove);

//Стрельба
  function shoot() {

    let shootSound = new Audio('audio/laser-blast-descend_gy7c5deo.mp3');
    shootSound.play();

    var bullet = document.createElement('img');
    bullet.src = 'img/bullet.png';
    bullet.className = 'bullets';
    bullet.style.top = h - 100 + 'px';
    bullet.style.left = player.getBoundingClientRect().x + 32 + 'px';

    setTimeout(function () {
      bullet.remove();
    }, 2000);
    game.appendChild(bullet);
  }

// Функция рандома
  function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

//Враги
  function createEnemy() {
    var enemy = document.createElement('img');
    enemy.src = 'img/enemy.png';
    enemy.className = 'enemies';
    enemy.style.top = 0 + 'px';
    enemy.style.left = randomValue(100, w - 100) + 'px';
    enemy.style.transition = 10 + 's';
    game.appendChild(enemy);
    setTimeout(function () {
      enemy.style.top = h + 'px';
    }, 10);
    setTimeout(function () {
      enemy.remove();
    }, 10000);
  }

  createEnemy();
  enemyCreateTimer = setInterval(createEnemy, 1000);


  function killEnemy() {
    var bullets = document.getElementsByClassName('bullets');
    var enemies = document.getElementsByClassName('enemies');

    for (var enemyCounter = 0; enemyCounter < enemies.length; enemyCounter++) {
      if (enemies[enemyCounter].getBoundingClientRect().top > h - 50) {
        endGame();
      }
      for (var bulletCounter = 0; bulletCounter < bullets.length; bulletCounter++) {
        if (bullets[bulletCounter] && enemies[enemyCounter]) {
          var bullet = bullets[bulletCounter].getBoundingClientRect();
          var enemy = enemies[enemyCounter].getBoundingClientRect();
          if (bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            let explosionSound = new Audio('audio/explosion.mp3');
            explosionSound.play();
            bullets[bulletCounter].remove();
            enemies[enemyCounter].remove();

            score++;

            document.getElementById('score').innerHTML = score;

            explosion(enemy.x, enemy.y);
          }
        }
      }
    }
  }
  hitInterval = setInterval(killEnemy, 0);

  function explosion(x,y) {
    var explosion = document.createElement('img');
    explosion.className = 'explosion';

    explosion.style.left = x - 10 + 'px';
    explosion.style.top = y - 10 + 'px';

    explosion.src = 'img/explosion.png';
    game.appendChild(explosion);

    setTimeout(function () {
      explosion.remove()
    }, 500)

  }

  function endGame() {
    document.getElementById('player').style.display = 'none';
    document.getElementById('end-score').style.display = 'flex';
    document.getElementById('end-score').innerHTML = 'Your score: ' + score;
    let endScoreResult = document.getElementById('end-score').appendChild(document.createElement('button'));
    endScoreResult.id = 'button-restart';
    endScoreResult.innerText = 'Restart';
    endScoreResult.onclick = restartGame;

    let endScoreName = document.getElementById('end-score').appendChild(document.createElement('p'));
    endScoreName.id = 'result-text';
    endScoreName.innerText = 'Enter your name';

    let endScoreNameInput = document.getElementById('end-score').appendChild(document.createElement('input'));
    endScoreNameInput.id = 'resultName';
    endScoreNameInput.value = 'rrrrr';

    let saveResultButton = document.getElementById('end-score').appendChild(document.createElement('button'));
    saveResultButton.id = 'save';
    saveResultButton.innerText = 'Save';
    saveResultButton.onclick = saveGame;

    var enemyCounter = document.getElementsByClassName('enemies');
    for (var i = 0; i < enemyCounter.length; i++) {
      enemyCounter[i].style.display = 'none';
    }
    backgroundSound.pause();
    clearInterval(enemyCreateTimer);
    clearInterval(shooting);
    clearInterval(hitInterval);
    window.removeEventListener('mousedown', mousedown);
    window.removeEventListener('mousemove', mousemove);
  }

  function restartGame() {
    score = 0;
    startGame();
    document.getElementById('end-score').style.display = 'none';
  }

  function saveGame() {
    document.getElementById('resultName').value;
    saveResult();
  }

}
