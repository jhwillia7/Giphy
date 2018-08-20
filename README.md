# Giphy

# GifTastic

### Overview

In this application, I use the GIPHY API to make a dynamic web page that populates with gifs of your choice. I utilize JavaScript and jQuery to change the HTML of your site.

I have chosen an NBA theme for my site.  I have created an array of Before you can make any part of our site work, you need to create an array of strings that contains a list of teams you can choose from.

The application takes these topics in this array and create buttons in my HTML.
   
When you click on a team button, the application grabs 10 static, non-animated gif images from the GIPHY API and place them on the page.

When the you click one of the still GIPHY images, the gif animates. If you click the gif again, it stops playing.

Under every gif, I display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step.

I also include a form on the page that takes the value you input in a boxand adds it into the `topics` array. Then I make a function call that takes each topic in the array remakes the buttons on the page.

- - -

The app is fully mobile responsive.

I also allow users to request additional gifs to be added to the page.
   * Each request adds 10 gifs to the page, I do not overwrite the existing gifs.



