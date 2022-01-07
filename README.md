# 5e Balance Helper
#### Video Demo:  https://youtu.be/OOiyK1e9Imw
#### Description:

##### WARNING !!!!

Lines 71 and 97 of app.py both use absolute paths to the traits databse. You may require to change them in order for those two URLs to work.

##### What the page is and does

In Dungeons and Dragons 5th Edition, one of the players, the Dungeon Master, is the one
in charge of creating a world for the other players to explore in-character.

It is a very challenging role, and even though 5th Edition has simplified the system a lot, 
it is still hard for Dungeon Masters around the world to create balanced monsters for the party of characters
to fight.

The thing is, there are rules for monster creation and tweaking in the 5th Edition Dungeon Master's Guide,
but a lot of people either don't use them because of how tedious they can be or directly don't know of their existence,
so I thought a web page dedicated to easing all this math work with some additional features could prove really useful,
and given that no other similar page exists already, I have decided to fill that niche myself with this web.


If you don't know anything about D&D 5e this _might_ get a little confusing, but I hope you can still understand the
inner workings of this page, as it is still just simple math with fancy names.

So, to figure out the Challenge Rating (the number used to measure how powerful a monster is) 
of a monster, we need to get both its Defensive CR and its Offensive CR, and then get the average.
The math to get both of these can be found on the Dungeon Master's Guide page 274 (https://prnt.sc/1qk14wk).

To get a monster's Defensive CR, we take the monster's Hit Points (how much damage it can endure) and check the thresholds 
provided in the DMG. Then, if its Armor Class (how hard it is to hit) differs from the amount noted, modify it by 1 for 
every 2 points it is higher or lower than it should.

Note that I skipped the resistances and vulnerabilities in this process, that part is not very reliable.
Instead, the web simply displays variations of the CR assuming the party dealt only those types of damage, and uses it when calculating
the simulated 1v1s.

And now, to get its Offensive CR, the method is quite similar, but using its average damage per round (DPR) and its attack bonus 
(which affects how likely the monster is to hit a certain AC). The DPR is not a direct input; I have created a table dedicated to the 
monster's attacks, each with their own values (number and size of dice, damage bonus, times the attack is made, and the attack's type), 
which the web then does some math on and adds the average damage to the total DPR.


After this, the web displays the recommended stats for the monster, which I consider a very important aspect of the page,
since a lot of new DMs just set the monster's stats without any base, just on what they think is approximately balanced.


As an extra, I have incorporated a table that allows the user to add traits to the monster, and inform them of the effect these would have
on its CR. I also consider this a most helpful tool, as not only a lot of people don't know about this table (from the DMG's page 280),
but the original table does not include the trait's description, so this is something that can`t be found anywhere else that I know of.

The table is based on a SQLite database named "traits", and each time the user adds a trait the page
loads a list of the names, and only when the user selects a trait does it actually load the entire thing, though I will discuss the code further later.


Further into the page there is a table dedicated to the input of each of the party's member's stats, although this part is more optional.

Every party member has the same number of stats the monster did, but this time only the martial classes have attack inputs, as casters
have spells that sadly can't be accounted for in any way, and a name input to help with clarity in the outputs.


Should at least one of the Player Character's HP be set, three things will be calculated and then displayed; a simulation of how,
based on averages, the PC would do against the monster on his own; information about the chances the PC and the monster have of hitting each other and
the PC's average DPR, and lastly alerts if the monster could down or kill the PC in one round, being "very likely" 65-100%, "likely" 50%-65% and "rolling 
good enough" 0-50% of its maximum damage (a crit in D&D 5th Edition means that the number of dice is doubled).

Note that the percetnages ised for calculating alerts are of the maximum damage, which is not the same as how likely
it is to happen. The math behind all of this get complicated, so I decided to keep it simple.

And finally, on the top right corner of the web, there is a button named "Tips & Info" that hides every other element on the page and shows some information
about the page itself, as well as some extra balancing tips, an explanation about why spells can't be accounted for in the page, and a list
of the sources I got the information from.


##### Technical aspects

All the files that I created are inside the "env" folder (app.py, helpers.py and everything inside the "static" and the "templates" folders).

The helpers.py file contains the functions that I later used on app.py, which is the main Flask file.

The "templates" folder contains both the HTML code of the page and the "traits" database, which consists of only one table
with the same name that contains the data of all the traits for the "traits" section of the page.

The "static" folder is divided into CSS and javascript code, although there is only one CSS file, and the javascript folder
contains the main js code in form2.js, jquery and some libraries that I ended up not using.

I am not sure if the jquery file is completely necessary as I had some trouble importing it and used several methods, but just in case I
haven't deleted it. The same goes for the libraries folder, as I didn't end up using any of them, but still don't want to delete them just in case.


For the main CR calculations I decided to make an Ajax request to /CR (at first I posted the info and then loaded a new page, but 
I quickly realized how inconvenient this was), but, for the rest of the web (except for the traits table, as
it is based on a database), I found it more convenient to use DOM, as this was much more simple and easier to change for me.

The main function, that calculates the monster's CR and groups every other main calculation by doing sim1v1() for every PC, is doo(), 
but by far the function that took the most complex function of all and the one that took the most time to fully develop was sim1v1(), 
as it calculates a LOT of things for all 3 minor outputs tabs.

Most of the page works based on javascript tables, as I found them to be flexible and a nice way to display and dynamically add inputs,
and I would say the biggest challenge in coding this website was working with tables that were being constantly modified, especially 
as someone with as little javascript experience as me.

Because of the abundance of tables, most of the functions either add or remove elements from a table but, simple as this may sound, 
adding elements to a single row independently or creating new rows if there were none required more code than expected, especially because of
having to create elements using DOM instead of adding snippets, as I initially did.



##### UI

I am not a creative person, but I know how important the UI is, so creating a good UI has been quite the challenge for me.

Initially, my idea was to separate both the "party" and "monster" sections, alternating between the two with big buttons on the top side of the screen 
with an image of a party and a monster in the background respectively, but after some reconsideration and feedback from my friends I decided to
leave it as it is now, and I am very glad I did. Not only did the previous version kind of ruin the whole aesthetic of the page, but it was also quite
annoying to have to click a button every time you wanted to change a value of the other section.

With this layout, everything is cleaner and has a more coherent theme and color palette, and the party section is more clearly left as a side feature.

The only thing I think my web lacks in UI is feedback, but I have tried some options and
none of them looked good, so I'd rather leave it as it is.

Bootstrap has been useful mainly to make inputs look good, or at least decent. Default buttons, selects and inputs are really
ugly, so being able to make it look at least nice with so little code has been quite helpful.

I'd say the weakest thing about my web's visual design is the lack of feedback, but all the ideas I have tried to improve this
did not help and made the page look worse, so for now I would rather leave it as it is.