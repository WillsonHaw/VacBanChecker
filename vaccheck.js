javascript:(function(){
    var friends = [].slice.call(document.querySelectorAll('.friendCheckbox2'));

    friends.forEach(function(friend) {
        var xmlhttp = new XMLHttpRequest();
        var id = friend.outerHTML.match('friends\\[(.*?)\\]')[1];

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200) {
                var data = JSON.parse(xmlhttp.responseText);
                var span = document.createElement('span');
                span.style.fontWeight = 'bold';
                span.style.display = 'block';
                friend.parentNode.parentNode.querySelector('.friendSmallText').appendChild(span);
                if (data.players[0].NumberOfVACBans) {
                    span.style.color = 'rgb(255, 73, 73)';
                    span.innerHTML = data.players[0].NumberOfVACBans + ' VAC bans ' + data.players[0].DaysSinceLastBan + ' days ago.';
                }else{
                    span.style.color = 'rgb(43, 203, 64)';
                    span.innerHTML = 'No VAC Bans for this player.';
                }
            }
        };

        xmlhttp.open('GET', 'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=F6F90A461E30D38AB4AE8AADB5AD8658&steamids=' + id, true);
        xmlhttp.send();
    });
})();
