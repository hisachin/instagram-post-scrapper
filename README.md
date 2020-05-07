# instagram-post-scrapper
## instagram-post-scrapper RESTFUL api for scrapping instagram post data
A minimal, secure RESTFUL api for NodeJS. This project includes user login, access control of objects, and encrypted hashing of passwords right out of the box! Just delete the example model, add your own, and run!

## Installation
1.Clone the repo by using git clone.
2.Run **npm install** on the cloned directory. 

## Running the software

### In Local
Run **npm start**

### In Production
I would recommend looking at the pm2 module for running on a production server.

## API Endpoints
POST http://localhost:3010/api/scrape creates object with fields url=INSTAGRAM_PUBLIC_URL
DELETE http://localhost:3010/api/scrape/urlId // deletes object with Mongo id ":id"
