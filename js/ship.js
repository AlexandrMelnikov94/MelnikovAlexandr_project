var player = document.getElementById('player');
var game = document.getElementById('game');

var shooting;
var shootTimeout = 300;

function init() {
  w = window.innerWidth;
  h = window.innerHeight;

  player.style.top = h - 128 + 'px';
  player.style.left = w/2 - 50 + 'px';
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
  var enemy  = document.createElement('img');
  enemy.src = 'img/enemy.png';
  enemy.className = 'enemies';
  enemy.style.top = 0 + 'px';
  enemy.style.left = randomValue(0 , w) + 'px';
  enemy.style.transition = 10 +'s';
  game.appendChild(enemy);
  setTimeout(function () {
    enemy.style.top = h + 'px';
  },10);
  setTimeout(function () {
    enemy.remove();
  }, 10000);
}

createEnemy();
enemyCreateTimer = setInterval(createEnemy, 3000);