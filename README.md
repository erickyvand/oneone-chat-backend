[![Build Status](https://www.travis-ci.com/erickyvand/oneone-chat-backend.svg?branch=main)](https://www.travis-ci.com/erickyvand/oneone-chat-backend)
[![Coverage Status](https://coveralls.io/repos/github/erickyvand/oneone-chat-backend/badge.svg?branch=main)](https://coveralls.io/github/erickyvand/oneone-chat-backend?branch=main)

# One to One Chat API

The backend of the real time chat application.

- Click [oneone-chat](https://oneone-chat.herokuapp.com/) to test the API live on Heroku.

## Endpoints

### Signup

- /POST `/api/auth/signup`: Signup a user
- This endpoint returns 3 types of responses status `CREATED`, `BAD_REQUEST`, `CONFLIT`

![Created](./src/assets/signup-success.png 'Created')

![Conflict](./src/assets/signup-conflict.png 'Conflict')

![Bad-Request](./src/assets/signup-bad-request.png 'Bad Reques')
