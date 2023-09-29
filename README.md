# Description

NestJs application with the following features:
* Crud operations
* Swagger
* Saving files
* Authentication via JWT
* Integrated with MySQL

Repository also provide basic docker setup.

# Before running

Create ``.env`` file with:
- Secret for JWT token
- Connection with database
- Images upload directory and maximal file size.

## Installation packages

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## To Do List
* Add exception handling in some places
* Implement Redis