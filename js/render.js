window.onhashchange = SwitchToStateFromURLHash;
var SPAStateH = {};

function SwitchToStateFromURLHash() {
  var URLHash = window.location.hash;
  var StateJSON = decodeURIComponent(URLHash.substr(1));

  if (StateJSON !== "")
    SPAStateH = JSON.parse(StateJSON);
  else
    SPAStateH = {pagename: 'Main'};
  console.log()

  console.log('Новое состояние приложения:');
  console.log(SPAStateH);

  var PageHTML = "";

  switch (SPAStateH.pagename) {
    case 'Main':
      PageHTML +=
        "<div id=\"menu\">\n" +
        "    <button  onclick=\"startGame()\">Start</button>\n" +
        "    <button onclick=\"SwitchToAboutPage()\">About</button>\n" +
        "    <button onclick=\"SwitchToRules()\">Rules</button>\n" +
        "    <button onclick=\"SwitchToRecords()\">Records</button>\n" +
        "  </div>";
      break;
    case 'Rules':
      PageHTML +=
        "<div id=\"rules\">\n" +
        "<p>Здесь будут правила игры</p>\n" +
        "<button onclick =\"SwitchToMainPage()\"> На главную</button>" +
        "  </div>";
      break;
    case 'About':
      PageHTML +=
        "<div id=\"about\">\n" +
        "<p>Здесь будет информация о нас</p>\n" +
        "<button onclick =\"SwitchToMainPage()\"> На главную</button>";
      break;
    case 'Records':
      PageHTML +=
        "<div id=\"records\">\n" +
        "<p>Здесь будут рекорды</p>\n" +
        "<button onclick =\"SwitchToMainPage()\"> На главную</button>" +
      "<button onclick =\"showResult()\"> Показать</button>" +
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