# VacBanChecker
VanBanChecker provides an easy and handy way to check which player has been banned by Valve Anti-Cheat (VAC). 
[VAC]( https://support.steampowered.com/kb_article.php?p_faqid=370#vacgames) is an automated system used to detect cheats installed on a user’s computer. To maintain the integrity of games on Steam, users banned by VAC are banned from playing certain games.

Use VacBanChecker to help you find out if there is a cheater on your team!


## How to Use
(See the next section for **visual instructions**)

1. Open and view the raw code for [vaccheck.min.js](https://raw.githubusercontent.com/WillsonHaw/VacBanChecker/master/dist/vaccheck.min.js).
2. Select all the raw code (`Ctrl + A`).
3. Copy all the selected raw code (`Ctrl + C`, or right-click and select `Copy`).
4. Bookmark this page.
5. Edit the URL of the bookmark by right-clicking the new bookmark and selecting `Edit`. In the **URL** or **Location** field, paste the contents of [vaccheck.min.js](https://raw.githubusercontent.com/WillsonHaw/VacBanChecker/master/dist/vaccheck.min.js) that are copied in the step 3. You can change the **Name** field of the bookmark too, such as "Vac Checker"!
6. Navigate to [your friend's Recently Played With](http://steamcommunity.com/my/friends/coplay) page on [Steam](https://steamcommunity.com/). (You could probably bookmark that too! :wink:)
7. Click the bookmarklet and it will use the Steam API to get a list of VAC bans for those users on that page.

Pro Tip:
This bookmarklet also works under the other tabs on that page, including the "All Friends" tab! And it also works on your friend's friends list! Just go to their profile page, click "Friends" on the right panel, and use the bookmarklet to see their friend's vac bans!

### How to Install: Visual Instructions

![Instructions](https://raw.githubusercontent.com/WillsonHaw/VacBanChecker/master/docs/instructions.gif)

# Changelog

### v1.0.1 - May 9th 2015

Updated API key

### v1.0.0 - May 1st 2015

Added groups support! To use, visit a group page, click on "View All" under the group members section, and run the bookmarklet to see who in the group has been VAC/OW banned!

# Credits

Credits go out to [iEyepawd](http://www.reddit.com/user/iEyepawd) from this [reddit post](http://www.reddit.com/r/GlobalOffensive/comments/348292/i_made_a_userscript_to_easily_show_vac_bans_on/). His idea inspired me to write a version that can be easily used as a bookmarklet.
