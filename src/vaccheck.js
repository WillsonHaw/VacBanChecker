// Please set your own key so you don't slaughter mine. Thanks :)
var API_KEY = '12A1D1DE83F9932934EDD6DF2BA00463';
var isGroupsPage = false;
var badgeClass = 'player-vac-status-badge';
var styles = 
'.' + badgeClass + '.dirty{' +
  'color:rgb(255, 73, 73);' +
  'font-weight:500;' +
  'background-color:rgb(255, 73, 73);' +
'}' +

'.' + badgeClass + '.clean{' +
  'background-color:rgb(43, 203, 64);' +
'}' +

// Friend pages
'.friend_block_v2 .' + badgeClass + '{' +
  'display:block;' +
  'overflow:hidden;' +
  'position:absolute;' +
  'top:4px;' +
  'right:-76px;' +
  'width:160px;' +
  'height:8px;' +
  'padding:2px;' +
  'transform:rotate(45deg);' +
  'transition:all 250ms linear;' +
'}' +

'.friend_block_v2:hover .' + badgeClass + '.dirty{' +
  'color:rgb(255, 255, 255);' +
  'height:100%;' +
  'transform:rotate(0);' +
  'top:0;' +
'}' +

// Group styles
'.member_block .' + badgeClass + '{' +
  'display:block;' +
  'overflow:hidden;' +
  'position:absolute;' +
  'top:0;' +
  'right:0;' +
  'width:3px;' +
  'height:100%;' +
  'padding:0px;' +
  'transition:all 250ms linear;' +
'}' +

'.member_block .' + badgeClass + '.dirty:hover{' +
  'color:rgb(255, 255, 255);' +
  'width:100px;' +
  'padding:2px;' +
'}' +

'.member_block{' +
  'overflow:hidden;' +
'}';

function setVACStatus(player) {
  var playerEl = lookup[player.SteamId];
  var span = document.createElement('span');
  span.classList.add(badgeClass);

  if (player.NumberOfVACBans || player.NumberOfGameBans) {
    var inner = '';

    if (player.NumberOfGameBans) {
      inner += '<div>' + player.NumberOfGameBans + ' OW bans</div>';
    }

    if (player.NumberOfVACBans) {
      inner += '<div>' + player.NumberOfVACBans + ' VAC bans</div>';
    }

    inner += '<div>' + player.DaysSinceLastBan + ' days ago</div>';

    span.classList.add('dirty');
    span.innerHTML = inner;
  } else {
    span.classList.add('clean');
  }

  playerEl.appendChild(span);
}

// Javascript does not work well with integers greater than 53 bits precision... So we need
// to do our maths using strings.
function getDigit(x, digitIndex) {
  return (digitIndex >= x.length) ? '0' : x.charAt(x.length - digitIndex - 1);
}

function prefixZeros(strint, zeroCount) {
  var result = strint;
  for (var i = 0; i < zeroCount; i++) {
    result = '0' + result;
  }
  return result;
}

//Only works for positive numbers, which is fine in our use case.
function add(x, y) {
  var maxLength = Math.max(x.length, y.length);
  var result = '';
  var borrow = 0;
  var leadingZeros = 0;

  for (var i = 0; i < maxLength; i++) {
    var lhs = Number(getDigit(x, i));
    var rhs = Number(getDigit(y, i));
    var digit = lhs + rhs + borrow;
    borrow = 0;

    while (digit >= 10) {
      digit -= 10;
      borrow++;
    }

    if (digit === 0) {
      leadingZeros++;
    } else {
      result = String(digit) + prefixZeros(result, leadingZeros);
      leadingZeros = 0;
    }
  }

  if (borrow > 0) {
    result = String(borrow) + result;
  }

  return result;
}

function getId(member) {
  var steam64identifier = '76561197960265728';
  var miniProfileId = member.dataset.miniprofile;
  return add(steam64identifier, miniProfileId);
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
  var endpointRoot = 'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=' + API_KEY + '&steamids=';
  var endpoint = endpointRoot + ids.join(',');

  xmlHttp.onreadystatechange = function() {
    onData(xmlHttp);
  };
  xmlHttp.open('GET', endpoint, true);
  xmlHttp.send();
}

var groupMembers = document.querySelectorAll('#memberList .member_block');
var lookup = {};

isGroupsPage = groupMembers.length > 0;

if (isGroupsPage) {
  Array.from(groupMembers).reduce(function (acc, el) {
    var id = getId(el);
    acc[id] = el;
    return acc;
  }, lookup);
} else {
  var friends = document.querySelectorAll('.selectable.friend_block_v2');
  Array.from(friends).reduce(function (acc, el) {
    acc[el.dataset.steamid] = el;
    return acc;
  }, lookup);
}

var ids = Object.keys(lookup);

while (ids.length > 0) {
  var batch = ids.splice(0, 100);

  makeApiCall(batch);
}

var styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
