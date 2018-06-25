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

## Printscreens

- Landing page, user must log in using google account.

![iu1](https://user-images.githubusercontent.com/20528688/41877120-86bae2fa-78a6-11e8-9af1-c0090d29287c.png)

- Ranking page, where the player's points are showed.

![iu2](https://user-images.githubusercontent.com/20528688/41877121-86e18e6e-78a6-11e8-8b88-8717a5ea97e0.png)

- Statistics modal, simple but efficient to demontrate how many users and how much $ is in game!

![iu3](https://user-images.githubusercontent.com/20528688/41877123-87323094-78a6-11e8-95c3-78faf2859d99.png)

- Personal profile page, where the player can see/insert their games. The players can see the other players profile only after the stage is completed (all players send the guesses).

![iu4](https://user-images.githubusercontent.com/20528688/41877125-87777514-78a6-11e8-9cf7-89838ab62999.png)

- Match modal, to insert the match guesses.

![iu5](https://user-images.githubusercontent.com/20528688/41877126-879b4426-78a6-11e8-9a28-71c14c39519a.png)

- Admin page, where the admin can inform the official match results. Each time a match is updated, the ranking is calculated again.

![iu6](https://user-images.githubusercontent.com/20528688/41877127-87c293aa-78a6-11e8-8ff4-0b8183db6499.png)
