# Project Structure Documentation

## Directory Layout

### `/frontend`
React/Next.js frontend application
- **components/**: Reusable UI components
- **pages/**: Application pages/routes
- **styles/**: CSS/SCSS files
- **utils/**: Helper functions and utilities
- **hooks/**: Custom React hooks
- **context/**: React Context for state management
- **public/**: Static assets

### `/backend`
Node.js/Express API server
- **routes/**: API endpoints
- **controllers/**: Business logic
- **models/**: Database schemas
- **middleware/**: Express middleware
- **utils/**: Helper utilities
- **config/**: Configuration files
- **tests/**: API tests

### `/mobile`
Mobile application (React Native / Flutter)
- **src/**: Source code
- **screens/**: App screens
- **components/**: Reusable components
- **navigation/**: App navigation

### `/docs`
Documentation files
- **API.md**: API documentation
- **SETUP.md**: Setup and installation guide
- **ARCHITECTURE.md**: System architecture
- **DATABASE.md**: Database schema

## File Naming Conventions

- **React Components**: PascalCase (e.g., `UserProfile.jsx`)
- **Utilities**: camelCase (e.g., `apiClient.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)
- **Styles**: camelCase (e.g., `header.module.css`)

## Database Structure

### Collections/Tables

#### Users
```json
{
  "_id": "ObjectId",
  "email": "string",
  "password": "hashed_string",
  "firstName": "string",
  "lastName": "string",
  "role": "student|instructor|consultant|admin",
  "createdAt": "date"
}
```

#### Courses
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "type": "ielts|pte|visa",
  "instructor": "ObjectId",
  "price": "number",
  "duration": "string",
  "createdAt": "date"
}
```

#### Enrollments
```json
{
  "_id": "ObjectId",
  "user": "ObjectId",
  "course": "ObjectId",
  "progress": "number",
  "status": "active|completed|paused",
  "enrolledAt": "date"
}
```

#### Tests/Exams
```json
{
  "_id": "ObjectId",
  "name": "string",
  "type": "ielts|pte",
  "questions": "array",
  "duration": "number",
  "passingScore": "number"
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments` - Get user enrollments
- `GET /api/enrollments/:id` - Get enrollment details
- `PUT /api/enrollments/:id` - Update enrollment progress

### Tests
- `GET /api/tests` - List available tests
- `GET /api/tests/:id` - Get test details
- `POST /api/tests/:id/submit` - Submit test answers
- `GET /api/tests/:id/results` - Get test results

## Environment Variables

Create `.env.local` file:

```
# Frontend
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development

# Backend
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/ielts
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# AWS/Cloud (if using)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
```
