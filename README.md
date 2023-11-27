## Getting Started

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

```
Run docker-compose up -d to start the Postgres server in the Docker container.

To create the migration files, run the command npx prisma migrate dev --name init.

After generating the migration files, use the command npx prisma db seed to add the test user to the database.
```
