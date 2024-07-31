# Truck-Monitoring - RESTfull API

## Entity Relationship Diagram

![ERD](./erd.png)

## Technologies

- `Node.js`
- `Typescript`
- `Javascript`
- `Express`
- `JSON Web Token (JWT)`
- `Bcrypt`
- `Vitest`
- `Zod`
- `PostgreSql`

## Installation

```bash
# clone project
$ git clone https://github.com/CiceroEduardo84/Truck-Monitoring-API.git

# install dependencies
$ npm install

# run api
$ npm run dev
```

## Environment Variables

```ini
PORT=""
SECRET_TOKEN=""
EXPIRESIN_TOKEN=""
KEY_TOKEN=""
CLIENT_SIDE=""

#Database
PGUSER=""
PGPASSWORD=""
PGHOST=""
PGPORT=""
PGDATABASE=""

ADMIN_EMAIL=""
ADMIN_PASSWORD=""
```

## Routes

| Functionality | Method   | Endpoint          | Description                               |
| ------------- | -------- | ----------------- | ----------------------------------------- |
| Auth          | `POST`   | /login            | Start the user session                    |
|               | `POST`   | /logout           | Close the user session                    |
| User          | `GET`    | /user             | Return user informations                  |
|               | `POST`   | /user             | Create a new user(admin)                  |
|               | `GET`    | /users            | Return **\*User Pagination** users(admin) |
|               | `PUT`    | /user/:id         | Update an existing user(admin)            |
|               | `DELETE` | /user/:id         | Remove an existing user(admin)            |
| Type Vehicle  | `GET`    | /typevehicles     | Return type vehicle information           |
|               | `POST`   | /typevehicles     | Create a new type(admin)                  |
|               | `PUT`    | /typevehicles/:id | Update an existing type(admin)            |
|               | `DELETE` | /typevehicles/:id | Remove an existing type(admin)            |
| Vehicle       | `POST`   | /vehicle          | Add a new vehicle                         |
|               | `GET`    | /vehicle          | Return **\*Vehicle Pagination** vehicle   |
|               | `PUT`    | /vehicle/:id      | Update an existing vehicle                |
|               | `DELETE` | /vehicle/:id      | Remove an existing vehicle(admin)         |

**\*User Pagination parameters**

- `limit:` Number of items per page.
- `offset:` Offset index.
- `filter:` Filter options `"admin"` , `"porter"` , `"dispatcher"`, `"all"`.
- Query example: `"/tasks?limit=10&offset=0&filter=all"`.

**\*Vehicle Pagination parameters**

- `limit:` Number of items per page.
- `offset:` Offset index.
- `filter:` Filter options `"awaiting"`, `"enter"`, `"loading"`, `"finished"`, `"all"`.
- Query example: `"/tasks?limit=10&offset=0&filter=all"`.

## Links

- [Deploy]()
- [Front Repository]()
