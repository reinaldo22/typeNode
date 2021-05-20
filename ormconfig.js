console.log('process.env.DATABASE_URL :>>', process.env.DATABASE_URL)
module.exports = {
   "type": "postgres",
    "host": "ec2-54-145-224-156.compute-1.amazonaws.com",
    "port": 5432,
    "username": "iqbkxkptgwpknv",
    "password": "6ff9946eb39fe9f2b6104049a712d97733d8c5a02ce3e8c104d197021d170098",
    "database": "df28r7qlm981ml",


   "url":process.env.DATABASE_URL,
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