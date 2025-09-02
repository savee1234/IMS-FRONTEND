# IMS Backend API

Backend API server for the Incident Management System (IMS).

## 🚀 Features

- **RESTful API** with Express.js
- **Database Integration** with Sequelize ORM
- **Security** with Helmet, CORS, and Rate Limiting
- **Logging** with Morgan
- **Environment Configuration** with dotenv

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── models/
│   └── Organization.js      # Organization data model
├── routes/
│   └── masterData.js        # API routes for master data
├── scripts/
│   └── initDb.js           # Database initialization script
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Copy .env.example to .env and update values
   cp .env.example .env
   ```

4. **Initialize database:**
   ```bash
   npm run init-db
   ```

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 44354 (or the port specified in your .env file).

## 📡 API Endpoints

### Base URL: `http://localhost:44354`

#### Organizations

- **GET** `/MasterData/GetSystemOrganization` - Get all organizations
- **POST** `/MasterData/SaveSystemOrganization` - Create new organization
- **PUT** `/MasterData/UpdateSystemOrganization/:id` - Update organization
- **DELETE** `/MasterData/DeleteSystemOrganization/:id` - Delete organization

#### Request/Response Examples

**Get Organizations:**
```bash
GET /MasterData/GetSystemOrganization
```

**Response:**
```json
[
  {
    "ORGANIZATION_ID": "1",
    "ORGANIZATION": "ABC Corporation",
    "ORGANIZATION_TYPE": "Type 1",
    "CREATED_BY": "015777",
    "CREATED_BY_NAME": "Romaine Murcott",
    "CREATED_DTM": "2025-07-17T12:49:20.000Z",
    "ENDED_BY": "",
    "ENDED_BY_NAME": "",
    "END_DTM": null
  }
]
```

**Create Organization:**
```bash
POST /MasterData/SaveSystemOrganization
Content-Type: application/json

{
  "organization": "New Corp",
  "organizationId": "4",
  "organizationType": "Type 2"
}
```

**Response:**
```json
{
  "message": "System Organization Successfully Saved",
  "organization": {
    "ORGANIZATION_ID": "4",
    "ORGANIZATION": "New Corp",
    "ORGANIZATION_TYPE": "Type 2",
    "CREATED_BY": "015777",
    "CREATED_BY_NAME": "Romaine Murcott",
    "CREATED_DTM": "2025-07-17T15:30:00.000Z"
  }
}
```

## 🗄️ Database

The backend uses SQLite with Sequelize ORM. The database file is created at `./database/ims.db`.

### Organization Table Schema

| Field | Type | Description |
|-------|------|-------------|
| ORGANIZATION_ID | STRING(50) | Primary Key - Unique identifier |
| ORGANIZATION | STRING(255) | Organization name |
| ORGANIZATION_TYPE | STRING(100) | Type/category of organization |
| CREATED_BY | STRING(50) | User ID who created the record |
| CREATED_BY_NAME | STRING(255) | Name of user who created the record |
| CREATED_DTM | DATE | Creation date and time |
| ENDED_BY | STRING(50) | User ID who ended the record |
| ENDED_BY_NAME | STRING(255) | Name of user who ended the record |
| END_DTM | DATE | End date and time |

## 🔧 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run init-db` - Initialize database with tables and sample data

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API request throttling
- **Input Validation** - Request data validation
- **Error Handling** - Comprehensive error responses

## 🌍 Environment Variables

Create a `.env` file in the backend directory with:

```env
PORT=44354
NODE_ENV=development
JWT_SECRET=your-secret-key
BCRYPT_ROUNDS=12
DB_PATH=./database/ims.db
CORS_ORIGIN=http://localhost:3000
```

## 📝 Development Notes

- The backend is configured to run on port 44354 to match your frontend API calls
- Sample data is included for testing
- All endpoints include proper error handling and validation
- The database uses soft deletes (records are marked as ended rather than removed)

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling to new endpoints
3. Include validation for all inputs
4. Update this README for new features

## 📞 Support

For issues or questions, please contact the development team.
