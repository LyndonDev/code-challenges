# Company XYZ Front-end Developer Take Home Test - Build a simple Reddit app

A note from Lyndon -- Just for shits 'n giggles I made different implementations using either Redux, Redux Thunk, class component with Redux Thunk, or Context API. Making different implementations wasn't a requirement of the challenge.

---

## Challenge Description

### Greetings!

Hi, and welcome to the Company XYZ front-end developer take home test! The idea of this take home test isn't to take up a ton of your time but rather to give you an enjoyable task to work on for an hour or so in a more natural coding environment without someone watching you code over your shoulder. No worries if you run into anything you're not familiar with, this is an open book exam! Feel free to look up whatever you need to. We'll be reading your code to get to know how you think and so we can get to know you as a developer so write something you'll be happy with, comment wherever you think needs clarification, and show us what you can do!

### The Task

Create a Reddit viewer with favorites functionality. Reddit, for those not familiar, is kind of like a newspaper, described as the front-page of the internet. It aggregates and sorts user contributions and displays them as a list that you can see on www.reddit.com. We'll be accessing this content via Reddit's API.

Don't worry too much about styling and css, we're mainly evaluating you on your Javascript/React/Software Engineering skills. Just make sure everything makes sense and that the functionality you're creating is clear to the end user.

#### Fetch the data
  - Fetch the content to display from the reddit front page API endpoint `https://www.reddit.com/.json` with the native asynchronous Javascript `fetch` API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  - To get at the data, call the `json()` method in the response of the fetch call
  - You can also view the structure of the returned data by visiting `www.reddit.com/.json` in any browser, it is recommended to view this with a JSON viewer extension (I use the JSONView chrome extension) or plugging it into an online JSON viewer like http://jsonviewer.stack.hu/

#### Display a sortable list of the front page
  - Relevant properties in the 'data' property of each data list item:
    - `title`: represents the title of the post
    - `ups`: represents the number of upvotes a post got
    - `id`: a unique identifier for the post
    - `url`: the link to the content of that post
  - Implement the 'Posts' list in `Posts.jsx`. This list will display the posts from the front page fetched with the api above. Feel free to change the code in `Posts.jsx` however you see fit.
  - Display a list of the titles returned and next to the title, display the number of upvotes the post received
  - Each title should be a clickable link that redirects you to the content of the post
  - Make this list sortable by with a dropdown toggle with 3 options:
    - `hot`: the original order in which the list was returned
    - `descending`: order by highest number of upvotes at the top of the list
    - `ascending`:  order by lowest number of upvotes at the top of the list

#### Add to favorites/Remove from favorites
  - Implement the 'favorites' list in `Favorites.jsx`, feel free to change the code in there however you see fit
  - Add a favorites button with `<span>★</span>` to each item of your 'Posts' list
  - When that star is clicked, add it to this newly created 'Favorites' list
  - Add a remove from favorites button with <span>X</span> to each item of your 'Favorites' list
  - When that X is clicked, remove this list item from the 'Favorites' list

#### Undo/Redo functionality for add and remove
  - Add undo and redo buttons at the top of the page
  - These buttons should mimic the functionality of the backwards and forwards buttons on your browser, applied to the adding and removal of items to favorites.
  - Think carefully through the different behaviors that these buttons might need to handle.

#### Display custom subreddit
  *** For those unfamiliar, a subreddit displays posts like the front page, but about a particular topic
  - Add some way of allowing user input to display a specific subreddit under the 'Posts' list
  - The API endpoint for fetching data for a particular subreddit is `https://www.reddit.com/r/${subreddit}.json`, e.g. `https://www.reddit.com/r/funny.json`, the data format returned should be the same as that returned from the front page endpoint
  - If a user submits nothing, display posts from the front page as you did in step 1
  - All of the previous behavior for the 'Posts' list should still work as before
