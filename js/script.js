
var scoreStorage = new AjaxStorage();

function saveResult() {
  console.log(document.getElementById('resultName').value)
  var playerName = document.getElementById('resultName').value;
  var fHash = {};

  if (playerName) {
    fHash.score = score;
    return scoreStorage.addValue(playerName, fHash);
  } else {
    alert('Ввод отменен!')
  }
}

function showResult() {
  var showMenuInfo = scoreStorage.getKeys();
  var resultHTML = '';

  if (showMenuInfo.length)
  {
    for (var i = 0; i < showMenuInfo.length; i++) {
      var playerName = showMenuInfo[i].toLowerCase().trim();
      var getPlayerScore = scoreStorage.getValue(playerName);
      resultHTML += (i + 1) + '. ' + showMenuInfo[i] + " " + getPlayerScore.score + '<br>';
    }
  } else {
    resultHTML = 'Таблица пустая.';
  }
  document.getElementById('message').innerHTML = resultHTML;
}