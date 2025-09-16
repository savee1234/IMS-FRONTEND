# IMS Backend

Simple Node.js backend for Incident Management System login functionality.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up MongoDB:
- Install MongoDB locally or use MongoDB Atlas
- Update MONGODB_URI in .env file

3. Seed database with default users:
```bash
node scripts/seedUsers.js
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

- GET /Login/login - Login endpoint info
- POST /Login/login - Authenticate user
- GET /Login/logout - Logout user

## Default Users

- Username: admin, Password: admin123
- Username: user, Password: user123

Server runs on http://localhost:44354