This folder contains the Ultimate Hooks project which is developed in exercise 7.8 of Full Stack Open part 7: https://fullstackopen.com/en/part7/custom_hooks#exercises-7-4-7-8

The app is built starting from code in the following repository: https://github.com/fullstack-hy2020/ultimate-hooks

This web app connects to a back-end server (implemented through json-server and a local db.json file). It displays two database collections, and allows for addition of new entries for both - one a list of text notes, and the other a set of pairs of people with phone numbers.

This project is built using React. The functionality for both database collections are implemented using the same custom hook, useResource, which is intended to handle communications with the server in a manner specifically generic to work with both databases despite them having different numbers of fields. The useResource hook is defined in /src/App.jsx - it uses Axios for communications with the server.
