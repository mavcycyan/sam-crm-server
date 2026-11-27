# sam-crm-server

REST API for a small CRM (orders, stock items and users), built as the backend for an Angular front-end ([sam-crm](https://github.com/mavcycyan/sam-crm)).

## Tech stack
- Node.js, Express
- MongoDB with Mongoose
- Password hashing with bcryptjs
- CORS enabled for the front-end

## API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | register a user |
| POST | `/api/auth/login` | log in |
| PATCH | `/api/auth/update/:id` | update a user |
| DELETE | `/api/auth/delete/:id` | delete a user |
| GET | `/api/list` | stock items |
| GET | `/api/list/:id` | one item |
| POST | `/api/list` | add an item |
| PATCH | `/api/list/:id` | update an item |
| DELETE | `/api/list/:id` | delete an item |
| GET | `/api/orders` | orders |
| GET | `/api/orders/page/:page` | orders, paginated |
| GET | `/api/orders/count` | number of orders |
| GET | `/api/orders/:id` | one order |
| POST | `/api/orders` | add an order |
| PATCH | `/api/orders/:id` | update an order |
| DELETE | `/api/orders/:id` | delete an order |

## Running locally

Requirements: Node.js 20.6+ (for `--env-file`), a MongoDB database (local or MongoDB Atlas).

```bash
npm install
cp .env.example .env    # then set DB_URI
npm run dev             # http://localhost:3500
```

## Notes
Written in 2020–2021 as one of my first Node.js projects. Database credentials are read from environment variables and are not stored in the repository.
