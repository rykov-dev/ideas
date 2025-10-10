# Ideas

A simple idea board to publish ideas and upvote favorites.

[Demo site](https://rykov-dev.github.io/ideas/)

## Tech Stack
- Frontend: React + Vite
- Backend: Express (TypeScript)
- Database: PostgreSQL

## Prerequisites
- Node.js 18+
- Yarn or npm
- PostgreSQL 14+

## Install
```
yarn
# or
npm install
```

## Configuration
Database defaults (for local dev):
- user: `dev`
- password: `devpassword`
- database: `ideas`
- host: `localhost`

You can change these in scripts and backend config/environment if needed.

## Database Setup
Initialize tables and seed example data:
```
npm run setup
npm run seed
```

Manual database creation (optional):

```bash
sudo -u postgres createuser dev
sudo -u postgres createdb ideas
sudo -u postgres psql -d ideas
```

In psql:

```sql
ALTER USER dev WITH ENCRYPTED PASSWORD 'devpassword';
GRANT ALL PRIVILEGES ON DATABASE ideas TO dev;
GRANT ALL ON SCHEMA public TO dev;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dev;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO dev;
```

## Run in Development
Run backend and frontend in parallel:
```
npm run dev
```
- Backend: http://127.0.0.1:3000
- Frontend (Vite): http://127.0.0.1:5173
- Vite proxies API calls from `/api/v1/*` to the backend

Run separately if needed:
```
npm run dev:back
npm run dev:front
```

## Build
```
npm run build
```
Outputs:
- Backend JS: `build/server`
- Frontend static: `build/front`

## Scripts
- `setup`: create database tables
- `seed`: fill database with sample ideas and votes
- `dev`: run backend and frontend

- `build`: build backend or frontend
