javascript:(function(){
    function getId(friend) {
        var elements = [].slice.call(friend.querySelectorAll(
            '.linkFriend_online, .linkFriend_offline, .friendCheckbox2, .friendCheckbox'));
        var id;

        elements.forEach(function(element) {
            if (!id) {
                var matches = element.href
                    ? element.href.match(/profiles\/(\d*)/)
                    : element.name.match(/friends\[(\d*)\]/);

                if (matches) {
                    id = matches[1];
                }
            }
        });

        return id;
    }

    var friends = [].slice.call(document.querySelectorAll('.friendHolder, .friendBlock'));
    var lookup = {};
    friends.forEach(function(friend) {
        var id = getId(friend);
        if (!lookup[id]) {
            lookup[id] = [];
        }
        lookup[id].push(friend);
    });

    function setVacation(id, numberOfBans, daysSinceLastBan) {
        var friendElements = lookup[id];

        friendElements.forEach(function(friend) {
            var span = document.createElement('span');
            span.style.fontWeight = 'bold';
            span.style.display = 'block';

            if (numberOfBans) {
                span.style.color = 'rgb(255, 73, 73)';
                span.innerHTML = numberOfBans + ' VAC bans ' + daysSinceLastBan + ' days ago.';
            } else {
                span.style.color = 'rgb(43, 203, 64)';
                span.innerHTML = 'No VAC Bans for this player.';
            }

            friend.querySelector('.friendSmallText').appendChild(span);
        });
    }

    function onData(xmlHttp) {
        if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {
            var data = JSON.parse(xmlHttp.responseText);
            data.players.forEach(function(player) {
                setVacation(player.SteamId, player.NumberOfVACBans, player.DaysSinceLastBan);
            });
        }
    }

    function makeApiCall(ids) {
        var xmlHttp = new XMLHttpRequest();
        //API only allows 100 steam ids at once.
        var endpointRoot = 'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=F6F90A461E30D38AB4AE8AADB5AD8658&steamids=';
        var endpoint = endpointRoot + ids.join('/');

        xmlHttp.onreadystatechange = function() { onData(xmlHttp); };
        xmlHttp.open('GET', endpoint, true);
        xmlHttp.send();
    }

    var ids = Object.keys(lookup);

    while (ids.length > 0) {
        var batch = ids.splice(0, 100);
        makeApiCall(batch);
    }
})();
