var badgeClass = 'player-vac-status-badge';
var styles = 
'.player-vac-status-badge {' +
'  display: block;' +
'  overflow: hidden;' +
'  position: absolute;' +
'  top: 4px;' +
'  right: -76px;' +
'  width: 160px;' +
'  height: 8px;' +
'  padding: 2px;' +
'  transform: rotate(45deg);' +
'  transition: all 250ms linear;' +
'}' +
'' +
'.player-vac-status-badge.dirty {' +
'  color: rgb(255, 73, 73);' +
'  font-weight: 500;' +
'  background-color: rgb(255, 73, 73);' +
'}' +
'' +
'.player-vac-status-badge.clean {' +
'  background-color: rgb(43, 203, 64);' +
'}' +
'' +
'.friend_block_v2.persona:hover .player-vac-status-badge.dirty {' +
'  color: rgb(255, 255, 255);' +
'  height: 100%;' +
'  transform: rotate(0);' +
'  top: 0;' +
'}';

function setVACStatus(player) {
  var playerEl = lookup[player.SteamId];
  var span = document.createElement('span');
  span.classList.add(badgeClass);

  if (player.NumberOfVACBans || player.NumberOfGameBans) {
    span.classList.add('dirty');

    if (player.NumberOfGameBans) {
      var gameBan = document.createElement('div');
      gameBan.innerHTML = player.NumberOfGameBans + ' OW bans';
      span.appendChild(gameBan);
    }

    if (player.NumberOfVACBans) {
      var vacBan = document.createElement('div');
      vacBan.innerHTML = player.NumberOfVACBans + ' VAC bans';
      span.appendChild(vacBan);
    }

    var daysSince = document.createElement('div');
    daysSince.innerHTML = player.DaysSinceLastBan + ' days ago';
    span.appendChild(daysSince);
  } else {
    span.classList.add('clean');
  }

  playerEl.appendChild(span);
}

function onData(xmlHttp) {
  if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {
    var data = JSON.parse(xmlHttp.responseText);
    data.players.forEach(setVACStatus);
  }
}

function makeApiCall(ids) {
  var xmlHttp = new XMLHttpRequest();
  //API only allows 100 steam ids at once.
  var endpointRoot = 'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=12A1D1DE83F9932934EDD6DF2BA00463&steamids=';
  var endpoint = endpointRoot + ids.join(',');

  xmlHttp.onreadystatechange = function() {
    onData(xmlHttp);
  };
  xmlHttp.open('GET', endpoint, true);
  xmlHttp.send();
}

var friends = document.querySelectorAll('.selectable.friend_block_v2');
var lookup = Array.from(friends).reduce(function (acc, el) {
  acc[el.dataset.steamid] = el;
  return acc;
}, {});
var ids = Object.keys(lookup);

while (ids.length > 0) {
  var batch = ids.splice(0, 100);

  makeApiCall(batch);
}

var styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
