[![Build Status](https://www.travis-ci.com/erickyvand/oneone-chat-backend.svg?branch=main)](https://www.travis-ci.com/erickyvand/oneone-chat-backend)
[![Coverage Status](https://coveralls.io/repos/github/erickyvand/oneone-chat-backend/badge.svg?branch=main)](https://coveralls.io/github/erickyvand/oneone-chat-backend?branch=main)

# One to One Chat API

The backend of the real time chat application.

- Click [oneone-chat](https://oneone-chat.herokuapp.com/) to test the API live on Heroku.

# Get started locally

In order to test this application locally you must have:

- NodeJs
- Postgres

How to start?

- Open terminal on your computer
- Clone this respos `git clone https://github.com/erickyvand/oneone-chat-backend.git`
- cd to the project directory
- Run `npm install` to install all dependences
- Run `npm run dev:server` to start the server

## Endpoints

### Signup

- /POST `/api/auth/signup`: Signup a user
- This endpoint returns 3 types of responses status `CREATED`, `BAD_REQUEST`, `CONFLIT`

![Created](./src/assets/signup-success.png 'Created')

![Conflict](./src/assets/signup-conflict.png 'Conflict')

![Bad-Request](./src/assets/signup-bad-request.png 'Bad Reques')

### Login

- /POST `/api/auth/login`: Login a user
- This endpoint returns 3 types of responses status `OK`, `UNAUTHORIZED`, `BAD_REQUEST`

![Ok](./src/assets/success-login.png 'Ok')

![Unauthorized](./src/assets/unauthorized-login.png 'Unauthorized')

![Bad-Request](./src/assets/bad-request-login.png 'Bad-Request')

### Create a message

- /POST `/api/messages`: Create a chat message

![set-authorization](./src/assets/set-authorization.png 'Forbiden')

![invalid-token](./src/assets/invali-token.png 'Unthorized')

![success](./src/assets/created-message.png 'Success')

# Technologies used

- NodeJs
- Postgres
- Socket.io

# Contributor

- Iragena Eric (Ericky Vand)
