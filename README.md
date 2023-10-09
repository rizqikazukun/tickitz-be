# TicKitz

It's a tickitz backend. learning base project from pijarcamp.  
Author : Rizqi Pratama

## Tech Stack

 **Dependencies**  | **Formatter**          | **devTools**
-------------------|:----------------------:|--------------
 express           | Eslint                 | nodemon
 postgres          | Prettier               |
 bcrypt            | Eslint Plugin Prettier |
 jsonwebtoken      |                        |
 cors              |                        |
 helmet            |                        |
 dotenv            |                        |
 joi

### Database

This Project is configured to use postgreSQL. The Scheme available at :  
``docs/database/tickitz.sql``

### Apis Collection

The Api documentation is using postman. the collection file available at :  
 ``docs/api-collection/tickitz-api.postman_collection.json``

## How to run

```bash
# Setup the db using postgres
# Configure the dot env

# install the dependency and devDependency
npm install  

# run 
npm run start

# run dev
npm run dev

```

## Configuration

Create a .env file on the root of project to setting database and other necessary configuration.

```BASH
# NODE_ENV development | production
# if detected production this env will not readed.
# Priorities : OS_ENV > DOT_ENV
NODE_ENV=

# Application Setting
APP_PORT=

# Application Database
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

# API Key for https://www.omdbapi.com/
OMDb_API_KEY=
```
