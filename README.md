# Cocotón

## Technologies Used

### Core Technologies

- Astro
- TypeScript
- Tailwind CSS

### Backend & Infrastructure

- MongoDB (Database)
- Prisma (ORM)
- Docker
- MinIO (File Storage)

### Development & Tools

- ESLint
- Prettier
- Zod

## System Requirements

- Linux-based operating system (recommended)
- Minimum 6GB RAM
- Intel i5 (recent generation preferred)
- Node v20.18.3
- Npm v11.1.0

## Features

- Create de-yo-pa-tu

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Prisma

`DATABASE_URL`
`DATABASE_ROOT_USERNAME`
`DATABASE_ROOT_PASSWORD`

### App

`PUBLIC_SITE_NAME`
`VITE_PUBLIC_MINIO_API_URL`

### Nodemailer

`SENDER_GMAIL_USER`
`SENDER_GMAIL_PASS`

### JWT

`JWT_SECRET`
`TOKEN_NAME`

### MinIO

`MINIO_ROOT_USER`
`MINIO_ROOT_PASSWORD`
`MINIO_DEPLOY_USER`
`MINIO_DEPLOY_PASSWORD`
`MINIO_API_PORT`
`MINIO_CONSOLE_PORT`
`MINIO_BUCKET_NAME`
`MINIO_REGION`
`MINIO_API_URL`

## Run Locally

Clone the project:

```bash
git clone git@github.com:JsMarenco/cocoton.git
```

Go to the project directory:

```bash
cd cocoton
```

Install dependencies:

```bash
bun run install
```

Generate .env file:

```bash
cp .env.sample .env
```

Generate MongoDB keyfile:

```bash
openssl rand -base64 756 > ./mongo_keyfile
```

Set file permissions

```bash
chmod 400 ./mongo_keyfile
```

Start Docker services for the Development Environment:

```bash
docker compose -p cocoton_development up -d
```

Start Docker services for the Production Environment:

```bash
docker compose -p cocoton_production up -d
```

Configure MongoDB replica set:

```bash
docker exec -it mongo mongosh
```

Activate the replica set:

```bash
rs.initiate({
    _id: "rs0",
    members: [
        { _id: 0, host: "localhost:27017" }
    ]
});
```

Check replica set status:

```bash
rs.status();
```

Switch to db admin:

```bash
use admin
```

Add root user:

```bash
db.createUser({
  user: "DATABASE_ROOT_USERNAME",
  pwd: "DATABASE_ROOT_PASSWORD",
  roles: [ { role: "root", db: "admin" } ]
})
```

For the Development Environment:

```bash
docker compose -p cocoton_development down
```

```bash
docker compose -p cocoton_development up -d
```

For the Production Environment:

```bash
docker compose -p cocoton_production down
```

```bash
docker compose -p cocoton_production up -d
```

Run migrations:

```bash
bun run prisma:migrate
```

Run the server in development mode:

```bash
bun run dev
```

Run the server in production mode:

```bash
bun run build && bun run start
```
