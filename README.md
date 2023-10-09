# TicKitz

It's a tickitz backend. learning base project from pijarcamp.  
Author : Rizqi Pratama

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

### Database

This Project is configured to use postgreSQL. The Scheme available at :  
``docs/database/tickitz.sql``

### Apis Collection

The Api documentation is using postman. the collection file available at :  
 ``docs/api-collection/tickitz-api.postman_collection.json``

## Routing Table and Role Auth

 **Endpoint Name**    | **auth** | **Method** | **Endpoint URI**         | **body** | **params** | **query**
----------------------|:--------:|:----------:|--------------------------|:--------:|:----------:|:---------:
 cineams list         |    no    |     GET    | /cinemas                 |    no    |     no     |     no
 cinema detail        |    no    |     GET    | /cinemas/:id             |    no    |     yes    |     no
 add cinema           |   admin  |    POST    | /cinemas                 |    yes   |     no     |     no
 update cinema        |   admin  |     PUT    | /cinemas/:id             |    yes   |     yes    |     no
 delete cinema        |   admin  |   DELETE   | /cinemas/:id             |    no    |     yes    |     no
 list movies & search |    no    |     GET    | /movies?search=%&year=%  |    no    |     no     |    yes
 detail movies        |    no    |     GET    | /movies/:id              |    no    |     yes    |     no
 add movie            |   admin  |    POST    | /movies                  |    yes   |     no     |     no
 add movie by imdb id |   admin  |    POST    | /movies/imdb             |    yes   |     no     |     no
 update movie         |   admin  |     PUT    | /movies/:id              |    yes   |     yes    |     no
 delete movie         |   admin  |   DELETE   | /movies/:id              |    no    |     yes    |     no
 list users           |   admin  |     GET    | /users                   |    no    |     no     |     no
 detail user          |    yes   |     GET    | /users/me                |    no    |     no     |     no
 login                |    no    |    POST    | /users/login             |    yes   |     no     |     no
 register             |    no    |    POST    | /users/register          |    yes   |     no     |     no
 update user          |    yes   |    POST    | /users/edit              |    yes   |     no     |     no
 update email user    |    yes   |    POST    | /users/edit/email        |    yes   |     no     |     no
 update password user |    yes   |    POST    | /users/edit/password     |    yes   |     no     |     no

## Dependencies

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
