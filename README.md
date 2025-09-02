# Incident Management System (IMS)

A comprehensive system for managing incidents, organizations, and system configurations.

## 🏗️ Project Structure

This project is organized into two main directories:

```
IMS-FRONTEND/
├── frontend/           # React.js frontend application
│   ├── src/           # Source code
│   ├── public/        # Public assets
│   └── package.json   # Frontend dependencies
├── backend/           # Node.js/Express backend API
│   ├── config/        # Configuration files
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── scripts/       # Database scripts
│   └── package.json   # Backend dependencies
└── README.md          # This file
```

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm start
```
Frontend will run on: http://localhost:3000

### Backend
```bash
cd backend
npm install
npm run init-db    # Initialize database
npm run dev        # Start development server
```
Backend will run on: http://localhost:44354

## 📱 Frontend Features

- **Configuration Module** with multiple tabs:
  - Onboard Medium
  - Organization (NEW!)
  - Organizations Contact Persons
  - Customer Contact Info
  - Solutions & Projects
  - Roster Shift Periods
  - Escalation Rules
  - Operation Availability

- **Organization Management**:
  - Add new organizations
  - View organization list
  - Edit/Delete organizations
  - Form validation and error handling

## 🔧 Backend Features

- **RESTful API** with Express.js
- **Database Integration** with Sequelize ORM
- **Security** with Helmet, CORS, and Rate Limiting
- **Master Data Endpoints**:
  - GET `/MasterData/GetSystemOrganization`
  - POST `/MasterData/SaveSystemOrganization`
  - PUT `/MasterData/UpdateSystemOrganization/:id`
  - DELETE `/MasterData/DeleteSystemOrganization/:id`

## 🗄️ Database

- **SQLite** database for development
- **Sequelize ORM** for data modeling
- **Sample data** included for testing
- **Soft delete** functionality

## 🔒 Security

- CORS enabled for frontend-backend communication
- Rate limiting to prevent abuse
- Input validation and sanitization
- Comprehensive error handling

## 📝 Development Notes

- Frontend and backend are completely separated
- API endpoints match the frontend requirements
- Sample data is provided for immediate testing
- Both applications can run independently

## 🤝 Contributing

1. Follow the existing code structure
2. Test both frontend and backend changes
3. Update documentation for new features
4. Ensure API compatibility between frontend and backend

## 📞 Support

For technical issues or questions, please contact the development team.
