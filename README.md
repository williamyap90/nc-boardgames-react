# Northcoders Board Games

## Table of contents

- [Description](#description)
- [Links](#Links)
- [Using NC Board Games](#using-northcoders-board-games)
- [Running the project locally](#running-the-project-locally)
- [Technologies](#technologies)

## Description

Northcoders Board Games is a social games content rating, and discussion website which interacts with a RESTful backend API I created previously.

This project is a React application built using JavaScript. Using Axios to make API calls to my Northcoders Boardgames API and React Router to render the app's different components. The app was created with JSX styled with CSS.

## Links

Front End:

- A working example of the website hosted on [Netlify](https://nc-boardgames.netlify.app/)
- [GitHub link](https://github.com/williamyap90/nc-boardgames-react)

Back End:

- API hosted on [Heroku](https://nc-boardgames.herokuapp.com/api/.)
- [GitHub link](https://github.com/williamyap90/nc-boardgames-api)

## Using Northcoders Board Games

### Functionality

The default user signed into the application is 'cooljmessy'. Should you wish to view any page as an anonymous user, select the Logout navigation item.

In the users page you can log in as another user which will allow posting & deleting as the chosen user.

Northcoders Board Games has game reviews which are divided into categories.

Users can either view a list of all reviews on the home page or view a page of all the categories which will lead to a list of related reviews.

Reviews can be sorted by

- ID
- Title
- Date
- Votes

Users can view individual reviews and can rate them by up or down voting.

Users can also view the comments belonging to a review.

Users can vote on comments, post a new comment and can delete their own comments.

## Running the project locally

To install NC Board Games locally, follow these steps:

1. Ensure you have the following installed:
   - Node.js (download [here](https://nodejs.org/en/))
2. Fork and clone the repo

```
    git clone <repo-url>
```

3. Open the repo and install dependencies:

```
    npm install
```

4. Change directory into the React project folder

```
    cd nc-boardgames
```

5. Run start script

```
    npm run start
```

If successful, your browser should open http://localhost:3000.

## Technologies

- [Node.js](https://nodejs.org/en/) v14.17.4 LTS
- [React.js](https://reactjs.org/) v17.0.2
- [Axios](https://axios-http.com/) v0.21.1
- [Semantic UI](https://semantic-ui.com/) (component library framework)
