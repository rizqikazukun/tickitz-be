# TicKitz Web Backend

![logo](./docs/pictures/logo.png)

It's a tickitz backend. learning base project from pijarcamp. This a movie cinema ticketing app, you can see current month movie show, and upcoming movie on next month.

Developer : Rizqi Pratama  
Tech Stack : Javascript, Express, PostgreSQL  
Backend URL : <https://tickitz-backend.vercel.app>

## Table Of Content

- [TicKitz Web Backend](#tickitz-web-backend)
  - [Table Of Content](#table-of-content)
  - [How to run](#how-to-run)
  - [Configuration](#configuration)
    - [Database](#database)
  - [Api Collection](#api-collection)
    - [Login Api](#login-api)
    - [Detail Profile Api](#detail-profile-api)
  - [Routing Table and Role Auth](#routing-table-and-role-auth)
  - [Dependencies](#dependencies)
  - [Releated Project](#releated-project)

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

> Please use PostgreSQL version 15, equal or less. because newest version not support by plugin that used by existing database schema. It will be fixed soon.

## Api Collection

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://documenter.getpostman.com/view/31887036/2s9YkoeMvT)

The Api documentation is using postman. the collection file available at folder ``docs/api-collection/`` or you can just click run in postman button above.

> Some api's need a Bearer Token to access, you can add to the section bellow. you can acquire the token from login by using this collection.

![Alt text](./docs/pictures/auth.png)

### Login Api

This api we use to login into the application.

> **This is an example how to use the Login Api.**  
> Make a ``POST`` Request to ``{{url}}/users/login`` with body json

```json
{
    "email": "input-your-email@example.com",
    "password": "good-password"
}
```

> If success you will acquire response

```json
{
    "success": true,
    "message": "login success",
    "accessToken": "HERE_IS_YOUR_TOKEN"
}
```

> After you getting the token, then put the token into Authorization.  
> And select the Bearer Token for the Auth Type.

### Detail Profile Api

This api is we use to get our detail info, but this api is protected by auth.  You have lo put the token from login before continue to access the protected api.

> **Then let make a request to protected api**  
> Make a ``GET`` Request to ``{{url}}/users/me``

> If you has a correctly set the Bearer Token it will return.

```json
{
    "status": 200,
    "message": "OK",
    "data": [
        {
            "first_name": "Sikamaru",
            "last_name": "Nara",
            "phone_number": null,
            "email": "input-your-email@example.com",
            "role": "user",
            "photo_profile": null,
            "uid": "9932e67d-a7d3-4b09-abfd-ea8ef1e6e1ab"
        }
    ]
}
```

> If Not

```json
{
    "status": 401,
    "message": "Unautorize"
}
```

## Routing Table and Role Auth

For public is not allowed accesing writeable to the database. need admin role to change.

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

## Releated Project

- [✨ Tickitz Api Collection](https://documenter.getpostman.com/view/31887036/2s9YkoeMvT)
- [✨ TicKitz Web Backend](https://github.com/rizqikazukun/tickitz-be)
- [✨ TicKitz Web Frontend](https://github.com/rizqikazukun/tickitz-fe)
