window.onhashchange = SwitchToStateFromURLHash;
let SPAStateH = {};

function SwitchToStateFromURLHash() {
  const URLHash = window.location.hash;
  const StateJSON = decodeURIComponent(URLHash.substr(1));

  if (StateJSON !== "")
    SPAStateH = JSON.parse(StateJSON);
  else
    SPAStateH = {pagename: 'Main'};
  console.log()

  console.log('Новое состояние приложения:');
  console.log(SPAStateH);

  let PageHTML = "";

  switch (SPAStateH.pagename) {
    case 'Main':
      PageHTML +=
        "<div id=\"menu\">\n" +
        "    <h2>Space shooter</h2>" +
        "    <button  onclick=\"startGame()\">Start</button>\n" +
        "    <button onclick=\"SwitchToAboutPage()\">About</button>\n" +
        "    <button onclick=\"SwitchToRules()\">Rules</button>\n" +
        "    <button onclick=\"SwitchToRecords()\">Records</button>\n" +
        "  </div>";
      break;
    case 'Rules':
      PageHTML +=
        "<div id=\"rules\">\n" +
        "<p>You need to destroy enemy ships.<br>" +
        "1. Control the spaceship with your mouse.<br>" +
        "2. Click the left mouse button to shoot<br>" +
        "<br>Good luck!!!</p>\n" +
        "<button onclick =\"SwitchToMainPage()\">To main</button>" +
        "  </div>";
      break;
    case 'About':
      PageHTML +=
        "<div id=\"about\">\n" +
        "<p>Hello, my name is Sasha. <br>This is my first JavaScript project.</p>\n" +
        "<button onclick =\"SwitchToMainPage()\">To main</button>";
      break;
    case 'Records':
      PageHTML +=
        "<div id=\"records\">\n" +
        "<h2>Highscore</h2>\n" +
        "<button onclick =\"SwitchToMainPage()\">To main</button>" +
        "<button onclick =\"showResult()\">Show</button>" +
        "<div id= \"message\">\n";
      break;
  }
  document.getElementById('menu').innerHTML = PageHTML;
}

function SwitchToState(NewStateH) {
  location.hash = encodeURIComponent(JSON.stringify(NewStateH));
}

function SwitchToMainPage() {
  SwitchToState({pagename: 'Main'});
}

function SwitchToRules() {
  SwitchToState({pagename: 'Rules'});
}

function SwitchToAboutPage() {
  SwitchToState({pagename: 'About'});
}

function SwitchToRecords() {
  SwitchToState({pagename: 'Records'});
}

SwitchToStateFromURLHash();