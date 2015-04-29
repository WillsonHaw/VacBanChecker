javascript:(function(){
    var friends = [].slice.call(document.querySelectorAll('.friendCheckbox2'));

    friends.forEach(function(friend) {
        var xmlhttp = new XMLHttpRequest();
        var id = friend.outerHTML.match('friends\\[(.*?)\\]')[1];

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200) {
                var data = JSON.parse(xmlhttp.responseText);
                if (data.players[0].NumberOfVACBans) {
                    var span = document.createElement('span');
                    span.style.display = 'block';
                    span.style.color = 'rgb(255, 73, 73)';
                    span.style.fontWeight = 'bold';
                    span.innerHTML = data.players[0].NumberOfVACBans + ' VAC bans ' + data.players[0].DaysSinceLastBan + ' days ago.';
                    friend.parentNode.parentNode.querySelector('.friendSmallText').appendChild(span);
                }else{
                    var span = document.createElement('span');
                    span.style.display = 'block';
                    span.style.color = 'rgb(43, 203, 64)';
                    span.style.fontWeight = 'bold';
                    span.innerHTML = 'No VAC Bans for this player.';
                    friend.parentNode.parentNode.querySelector('.friendSmallText').appendChild(span);
                }
            }
        };

        xmlhttp.open('GET', 'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=F6F90A461E30D38AB4AE8AADB5AD8658&steamids=' + id, true);
        xmlhttp.send();
    });
})();
