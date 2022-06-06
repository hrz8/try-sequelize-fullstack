## Setup

create a file named `sequelize-cli.config.json` in root folder (this file is required if you are want to run sequelize migrations, seeders, etc). adjust the configuration by your own config.

Example:
```json
{
  "development": {
    "username": "postgres",
    "password": "toor",
    "database": "try_sequelize",
    "host": "localhost",
    "port": 5432,
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "toor",
    "database": "try_sequelize",
    "host": "database.sequelize.com",
    "port": 5432,
    "dialect": "postgres"
  }
}
```

add `.env` file with this kind of format:

```
DATABASE_NAME=try_sequelize
DATABASE_USERNAME=root
DATABASE_PASSWORD=somepw
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_TYPE=postgres
```

## How to run

```sh
$ yarn install
$ yarn db:create
$ yarn db:migrate
```
