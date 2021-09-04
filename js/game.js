let score = 0;

// Функция рандома
function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function startGame() {

  document.getElementById('menu').style.display = 'none';
  document.getElementById('player').style.display = 'block';


  const player = document.getElementById('player');
  const game = document.getElementById('game');

  let shooting;
  const shootTimeout = 200;
  document.getElementById('score').innerHTML = '0';

  const backgroundSound = new Audio('audio/backgroundsound.mp3');
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
  const mousedown = function () {
    shoot()
    if (!shooting) {
      shooting = setInterval(shoot, shootTimeout);
    }
  }
  window.addEventListener('mousedown', mousedown);

  const mouseup = function () {
    clearInterval(shooting);
    shooting = NaN;
  }
  window.addEventListener('mouseup', mouseup);

  const mousemove = function (event) {
    mouseX = event.clientX - 64;
    player.style.left = mouseX + 7 + 'px';
  }

  window.addEventListener('mousemove', mousemove);

//Стрельба
  function shoot() {

    const shootSound = new Audio('audio/laser-blast-descend_gy7c5deo.mp3');
    shootSound.play();

    const bullet = document.createElement('img');
    bullet.src = 'img/bullet.png';
    bullet.className = 'bullets';
    bullet.style.top = h - 100 + 'px';
    bullet.style.left = player.getBoundingClientRect().x + 32 + 'px';

    setTimeout(function () {
      bullet.remove();
    }, 2000);
    game.appendChild(bullet);
  }

//Враги
  function createEnemy() {
    const enemy = document.createElement('img');
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
  enemyCreateTimer = setInterval(createEnemy, 500);

  function killEnemy() {
    const bullets = document.getElementsByClassName('bullets');
    const enemies = document.getElementsByClassName('enemies');

    for (let enemyCounter = 0; enemyCounter < enemies.length; enemyCounter++) {
      if (enemies[enemyCounter].getBoundingClientRect().top > h - 50) {
        endGame();
      }
      for (let bulletCounter = 0; bulletCounter < bullets.length; bulletCounter++) {
        if (bullets[bulletCounter] && enemies[enemyCounter]) {
          const bullet = bullets[bulletCounter].getBoundingClientRect();
          const enemy = enemies[enemyCounter].getBoundingClientRect();
          if (bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            const explosionSound = new Audio('audio/explosion.mp3');
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

  function explosion(x, y) {
    const explosion = document.createElement('img');
    explosion.className = 'explosion';

    explosion.style.left = x - 10 + 'px';
    explosion.style.top = y - 10 + 'px';

    explosion.src = 'img/explosion.png';
    game.appendChild(explosion);

    setTimeout(function () {
      explosion.remove()
    }, 500)

  }

  function reload() {
    document.location.reload();
  }

  function endGame() {
    document.getElementById('player').style.display = 'none';
    document.getElementById('end-score').style.display = 'flex';
    document.getElementById('end-score').innerHTML = 'Your score: ' + score;

    const endScoreName = document.getElementById('end-score').appendChild(document.createElement('p'));
    endScoreName.id = 'result-text';
    endScoreName.innerText = 'Enter your name';

    const endScoreNameInput = document.getElementById('end-score').appendChild(document.createElement('input'));
    endScoreNameInput.id = 'resultName';

    const massage = document.getElementById('end-score').appendChild(document.createElement('p'));
    massage.id = 'message';

    const saveResultButton = document.getElementById('end-score').appendChild(document.createElement('button'));
    saveResultButton.id = 'save';
    saveResultButton.innerText = 'Save';
    saveResultButton.onclick = saveGame;

    const endScoreResult = document.getElementById('end-score').appendChild(document.createElement('button'));
    endScoreResult.id = 'button-restart';
    endScoreResult.innerText = 'Restart';
    endScoreResult.onclick = restartGame;

    const toMain = document.getElementById('end-score').appendChild(document.createElement('button'));
    toMain.id = 'tomain';
    toMain.innerText = 'To Main';
    toMain.onclick = reload;

    const enemyCounter = document.getElementsByClassName('enemies');
    for (let i = 0; i < enemyCounter.length; i++) {
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