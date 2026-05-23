# Setup and Installation Guide

## Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher (or yarn/pnpm)
- **Git**: Latest version
- **MongoDB** or **PostgreSQL**: Latest version
- **Code Editor**: VS Code recommended

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/soldiers740/ielts.git
cd ielts
```

### 2. Setup Frontend

```bash
cd frontend
npm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your values
```

**Frontend .env.local**:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

### 3. Setup Backend

```bash
cd ../backend
npm install

# Create environment file
cp .env.example .env

# Update .env with your values
```

**Backend .env**:
```
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/ielts
JWT_SECRET=your_secret_key_here_change_this
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### 4. Setup Database

#### MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install locally from https://www.mongodb.com/try/download/community
```

#### PostgreSQL

```bash
# Using Docker
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password --name postgres postgres:latest

# Or install locally from https://www.postgresql.org/download/
```

### 5. Run Development Servers

**Terminal 1 - Frontend**:
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

**Terminal 2 - Backend**:
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

## Docker Setup (Optional)

Create `docker-compose.yml` in root directory:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=mongodb://mongodb:27017/ielts
      - NODE_ENV=development
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000

volumes:
  mongodb_data:
```

Run all services:
```bash
docker-compose up
```

## Verification

After setup, verify everything is working:

1. Frontend: http://localhost:3000
2. Backend API: http://localhost:5000/api/health
3. Check browser console for errors
4. Check terminal logs for issues

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:5000 | xargs kill -9  # Backend
```

### Database Connection Error
- Ensure MongoDB/PostgreSQL is running
- Check DATABASE_URL in .env
- Verify network connectivity

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand system design
2. Check [API.md](API.md) for API documentation
3. Review [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for code organization
4. Create your first feature branch

## Support

For issues or questions, please:
1. Check existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the team at support@ielts-visa.com
