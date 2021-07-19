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

mouseX = w / 2 - 50;

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
  mouseX = event.clientX - 50;
  player.style.left = Math.floor(mouseX / 20) * 20 + 10 + 'px';
}

window.addEventListener('mousemove', mousemove);

function shoot() {
  var bullet = document.createElement('img');
  bullet.src = 'img/bullet.png';
  bullet.className = 'bullets';
  bullet.style.top = h - 100 + 'px';
  bullet.style.left = player.getBoundingClientRect().x + 32 + 'px';

  setTimeout(function () {
    bullet.remove();
  }, 2000)
  game.appendChild(bullet);
}