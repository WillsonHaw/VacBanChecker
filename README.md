# How to use

1. Drag <a href="javascript:(function(){var e=[].slice.call(document.querySelectorAll(".friendCheckbox2"))
e.forEach(function(e){var a=new XMLHttpRequest,t=e.outerHTML.match("friends\\[(.*?)\\]")[1]
a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE&&200===a.status){var t=JSON.parse(a.responseText)
if(t.players[0].NumberOfVACBans){var n=document.createElement("span")
n.style.display="block",n.style.color="rgb(255, 73, 73)",n.style.fontWeight="bold",n.innerHTML=t.players[0].NumberOfVACBans+" VAC bans "+t.players[0].DaysSinceLastBan+" days ago.",e.parentNode.parentNode.querySelector(".friendSmallText").appendChild(n)}}},a.open("GET","https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=F6F90A461E30D38AB4AE8AADB5AD8658&steamids="+t,!0),a.send()})})();">this link</a> to your bookmarks bar!
2. Navigate to your [friends recently played with](http://steamcommunity.com/profiles/76561197961259240/friends/coplay) page.
3. Click the bookmarklet and it will use the Steam API to get a list of VAC bans for those users on that page.

# Credits

All credits go out to [iEyepawd](http://www.reddit.com/user/iEyepawd) from this [reddit post](http://www.reddit.com/r/GlobalOffensive/comments/348292/i_made_a_userscript_to_easily_show_vac_bans_on/). I merely took what he had and removed the jQuery and made it a bookmarklet.
