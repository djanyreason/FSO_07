This folder contains the Bloglist project which is developed in exercises 7.9-7.21 of Full Stack Open part 7: https://fullstackopen.com/en/part7/exercises_extending_the_bloglist

The app is built starting from code developed in parts 4 and 5 of FSO. The code here is developed based on the code in my repositories FSO_04 and FSO_05.

There are two folders with frontends for this project: /bloglist-frontend-query and /bloglist-frontend-redux. These are completions of exercises 7.10-7.13 with different solutions for state management, the former with React Query and useReducer, the later with Redux. The full app with router and styling as described below is continued with Redux; the Query front-end is not continued past the point of implementing Query and useReducer to manage state on top of the front end developed in FSO_05.

This full-stack web application is built with React, NodeJS, and a MongoDB mongoose database. When no user is logged it, the app displays a login page. When logged in, the page has a navbar at the top showing the logged in user and a logout button, as well as navigation options. The app has the following views:
* login page, when no user is logged in
* list of all blogs, accessed from the navigation bar - this view also contains a button to show a form to add a new blog
* list of all users, accessed from the navigation bar
* individual blog view, accessed by clicking on the blog from the list of all blogs view - this view also includes buttons to add likes to a blog, and a list of comments with the ability to add new comments
* individual user view, accessed by clicking on the user name in the list of all users view - this view shows all blogs added by that user

This project is built using React. Is relies on Redux to manage state, react router to manage routing, and CSS and Bootstrap for styling.
