# bigball
Bigball - React app to have fun with friends !!! Try to figure out the games results from the 2018 World Cup in Russia !!!

Web app developed in React, Redux and Nodejs. Database used is a MongoDb instance in mLab.com. Authentication with Google!

## Pre-requirements

- Google Plus API (create one in google console developers) - Don't forget to register the authorized callback url (http://localhost:3000/auth/google/callback and http://localhost:5000/auth/google/callback)
- MongoDb instance (we recommend an instance in mLab.com) - create an user and password for your database

## How to run locally

- Clone the repository
- Create a dev.js file inside config folder. This file has the same strucuture than prod.js, however you will use your google and mongodb info. The cookie hash can be anyone you wish!
- run npm install (or npm i) in root folder and in client folder
- run npm run dev (to run node and react at same time)
- your app will run in localhost:3000, before you log in, seed your database with a POST in http://localhost:5000/api/worldcup/seed
- Log in with google account and enjoy your app. You should go in the database to change your admin flag!
- Just it !!! 
