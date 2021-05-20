module.exports = {
   "type": "postgres",
    "host": "ec2-107-22-245-82.compute-1.amazonaws.com",
    "port": 5432,
    "username": "nhnadhpetkevpx",
    "password": "2a2c69886377dd9fc6619ef5f08cbdd795451d4dbadba49e5c2d131165e58a2e",
    "database": "dbgoiekp2vseuo",
    "database": "dbgoiekp2vseuo",
   "ssl": {
      "rejectUnauthorized": false
   },
    "entities": [
       "dist/src/models/*.js"
    ],
    "migrations": [
       "dist/src/database/migrations/*.js"
    ],
    "cli":{
       "entitiesDir":"src/models",
       "migrationsDir":"src/database/migrations",
       "subscribersDir":"src/subscibers"
    }
 }