# Coders Gate Project
this project is for sharing resources between developers and learn from each other in a hackernews-style experience



## Installation guide

In order to start with this project you have to follow this steps

- git clone https://github.com/Mostafa54225/Coders-Gate.git

- cd Coders-Gate

- create .env file with simmilar variables as in the file .env.sample, with your own values


After that run this commands
```bash
yarn
yarn start
```
OR
```bash
npm install && npm start
```

## Features
- Typescript
- Strong type checking
- Authentication
- Authorization
- Password Hashing
- Cookies
- Error handling
- Validation


## API Docs
> Public Routes

**Auth**
- Signup          - POST        /api/v1/signup
- Signin          - POST        /api/v1/singin
- Logout          - POST        /api/v1/logout

> Private Routes (Authentication required)


**users**
- Get Users       - GET         /api/v1/users
- Get User        - GET         /api/v1/users/:userId

**posts**
- Create Posts    - POST        /api/v1/posts
- Get Posts       - GET         /api/v1/posts
- Get Post        - GET         /api/v1/posts/:postId

**comments**
- Create Comment  - POST        /api/v1/comments/:postId
- Get Comments    - GET         /api/v1/comments/:postId

**likes**
- Create Like     - POST        /api/v1/likes/:postId
- Get Likes       - GET         /api/v1/likes/:postId

> Private Routes (Authentication and Authorization required)

**users**
- Update User     - PATCH       /api/v1/users/:userId

**posts**
- Delete Post     - DELETE      /api/v1/posts/:postId
- Update Post     - PATCH       /api/v1/posts/:postId

**comments**
- Delete Comment     - DELETE      /api/v1/comments/:commentId
- Update Comment     - PATCH       /api/v1/comments/:commentId
