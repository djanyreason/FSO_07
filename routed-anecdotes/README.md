This folder contains the Routed Anecdotes project which is developed in exercises 7.1-7.6 of Full Stack Open part 7: 
* https://fullstackopen.com/en/part7/react_router#exercises-7-1-7-3
* https://fullstackopen.com/en/part7/custom_hooks#exercises-7-4-7-8

The app is built starting from code in the following repository: https://github.com/fullstack-hy2020/routed-anecdotes

This web app displays a list of software engineering anecdotes. The initial list of anecdotes are hardcoded.

The app has navigation between various views:
* list of all anecdotes, accessed by a link towards the top of the page
* creation of a new anecdote, accessed by a link towards the top of the page
* an "About" page, accessed by a link towards the top of the page
* an anecdote detailed view, accessed by clicking on the anecdote from the list page

This project is built using React. It relies on React Router to handle navigation between views. It also uses a custom hook useField to facilitate the creation of new anecdotes (defined in /src/hooks/index.js)
