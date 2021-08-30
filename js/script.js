var scoreStorage = new AjaxStorage();

function saveResult() {
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
  var showScores = scoreStorage.getKeys();
  var resultHTML = '';

  if (showScores.length)
  {
    for (var i = 0; i < showScores.length; i++) {
      var playerName = showScores[i].toLowerCase().trim();
      var getPlayerScore = scoreStorage.getValue(playerName);
        resultHTML += (i + 1) + '. ' + showScores[i] + " " + getPlayerScore.score + '<br>';
    }
  } else {
    resultHTML = 'Таблица пустая.';
  }
  document.getElementById('message').innerHTML = resultHTML;
}