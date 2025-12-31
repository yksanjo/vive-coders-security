# Deployment Guide

## Backend

### Using Docker

```bash
cd backend
docker build -t vive-coders-security-backend .
docker run -p 3001:3001 vive-coders-security-backend
```

### Using Docker Compose

```bash
docker-compose up
```

### Manual Deployment

```bash
cd backend
npm install
npm run build
npm run migrate
npm start
```

## Dashboard

### Using Docker

```bash
cd dashboard
docker build -t vive-coders-security-dashboard .
docker run -p 3000:3000 vive-coders-security-dashboard
```

### Manual Deployment

```bash
cd dashboard
npm install
npm run build
npm start
```

## Environment Variables

See `.env.example` files in each directory for required environment variables.

## Database Setup

1. Create PostgreSQL database
2. Run migrations:
   ```bash
   cd backend
   npm run migrate
   ```

## Production Considerations

- Use environment variables for all secrets
- Enable HTTPS
- Set up proper CORS
- Use a production database
- Enable rate limiting
- Set up monitoring and logging

