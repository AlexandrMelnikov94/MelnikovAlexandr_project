const scoreStorage = new AjaxStorage();

function saveResult() {
  const playerName = document.getElementById('resultName').value;
  let fHash = {};

  if (playerName) {
    fHash.score = score;
    return scoreStorage.addValue(playerName, fHash);
  } else {
    alert('Ввод отменен!')
  }
}

function showResult() {
  const showScores = scoreStorage.getKeys();
  let resultHTML = '';

  if (showScores.length)
  {
    for (let i = 0; i < showScores.length; i++) {
      let playerName = showScores[i].toLowerCase().trim();
      let getPlayerScore = scoreStorage.getValue(playerName);
        resultHTML += (i + 1) + '. ' + showScores[i] + " " + getPlayerScore.score + '<br>';
    }
  } else {
    resultHTML = 'Таблица пустая.';
  }
  document.getElementById('message').innerHTML = resultHTML;
}