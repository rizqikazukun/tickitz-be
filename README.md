# TicKitz

It's a tickitz Backend

## Todos

### Movies Apis

- [x] Add Movie
- [x] Get Movies
- [x] Get Detail Movie
- [x] Update Movie
- [x] Delete Movie

### Cinemas Apis

- [x] Add Cinema
- [x] Get Cinema
- [x] Get Detail Cinema
- [x] Delete Cinema
- [x] Update Cinema

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
