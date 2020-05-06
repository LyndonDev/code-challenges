# Company XYZ Frontend Challenge

## Challenge Description

Attached is a sample layout along with a wireframe of the Company XYZ front page. Your assignment is to transform this mock-up into a functioning web page.

You can write the assignment with a modern framework of your choice. We are looking for overall code structure, use of ES6, and JavaScript/HTML/CSS best practices. We must be able to run and view the project locally, and all requirements below must be met. The assignment should not take more than 4 hours.

Below are the technical requirements for this assignment:

1. The background along with game icons are part of a background media carousel. Below is the requirement for timing of content rotation:
    * Images: images along with the game icon *should rotate* every 10 seconds
    * Videos: videos should play to the end before rotating (along with the game icon)
    * The carousel is expected to be able to handle any of these content:
        * Multiple videos (with variable lengths)
        * Single video
        * Multiple images
        * Single image
        * Combination of videos and images
2. Videos are all hosted on YouTube.
3. Use images/videos provided in the html attached.
4. The top navigation should be dynamically populated; navigation anchor data should come from anchors `<about-navigation-anchor>` embedded in each `<about-section>`. Keep in mind that the order in which each `<about-navigation-anchor>` gets initialized is not guaranteed. The ordering of each anchor in top navigation should be preserved. NOTE: The top navigation can be seen near the center of the top section in the wireframe, which reads: "Great PC Games ... Download Now"
5. The page must be fully functional in latest versions of Edge, Firefox and Chrome
6. Bonus 1: Pause carousel videos when out of the viewport, the video should resume when video is back in viewport
7. Bonus 2: Make the page responsive

This is what should happen when the page loads:

* All three sections will load as per mock up and 3 media carousels will start rotating / looping individually (unless they have only 1 image).
* At the same time, as soon as the page loads, the navigation will be populated.
* When the user clicks any link in the navigation, the page scrolls to that section of the page.
* To go back to the top, the user has to scroll back up.

Have fun, and please submit a .zip file with any source files that we need to run your assignment.
