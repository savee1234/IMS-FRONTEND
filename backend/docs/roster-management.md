# Roster Management Backend Documentation

## Overview
The Roster Management module provides backend API endpoints for managing employee rosters, including creating, viewing, updating, and deleting roster data.

## Database Schema

### Roster Model (`models/Roster.js`)
- **rosterId**: Auto-generated unique ID (Format: RST001, RST002, etc.)
- **rosterName**: Name of the roster
- **month**: Month in YYYY-MM format
- **data**: Array of daily roster data with shifts and employee assignments
- **createdBy**: User ID who created the roster
- **createdByName**: Name of the user who created the roster
- **createdDtm**: Creation timestamp
- **endedBy**: User ID who deleted/deactivated the roster
- **endedByName**: Name of the user who deleted/deactivated the roster
- **endDtm**: Deletion/deactivation timestamp
- **isActive**: Soft delete flag

### Daily Roster Data Structure
```javascript
{
  date: "2025-01-01",
  dayName: "Wednesday",
  shifts: [
    {
      shift: "Shift 01",
      employees: ["John Doe", "Jane Smith", "", "", ""]
    },
    {
      shift: "Shift 02", 
      employees: ["Mark Taylor", "", "Alice Moore", "", ""]
    }
  ]
}
```

## API Endpoints

### Base URL: `/api/rosters`

#### GET /api/rosters
- **Description**: Get all active rosters with pagination
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `search` (optional): Search term
  - `month` (optional): Filter by month (YYYY-MM format)
- **Response**: Paginated list of rosters

#### GET /api/rosters/:id
- **Description**: Get a specific roster by ID
- **Parameters**: 
  - `id`: MongoDB ObjectId of the roster
- **Response**: Single roster object

#### POST /api/rosters
- **Description**: Create a new roster
- **Required Fields**:
  - `rosterName`: String
  - `month`: String (YYYY-MM format)
  - `data`: Array of daily roster data
  - `createdBy`: String
  - `createdByName`: String
- **Response**: Created roster object

#### PUT /api/rosters/:id
- **Description**: Update an existing roster
- **Parameters**: 
  - `id`: MongoDB ObjectId of the roster
- **Optional Fields**:
  - `rosterName`: String
  - `data`: Array of daily roster data
- **Response**: Updated roster object

#### DELETE /api/rosters/:id
- **Description**: Soft delete a roster
- **Parameters**: 
  - `id`: MongoDB ObjectId of the roster
- **Required Fields**:
  - `endedBy`: String
  - `endedByName`: String
- **Response**: Success message

#### GET /api/rosters/month/:month
- **Description**: Get all rosters for a specific month
- **Parameters**: 
  - `month`: Month in YYYY-MM format
- **Response**: Array of rosters for the specified month

#### POST /api/rosters/reset
- **Description**: Reset rosters for a month (soft delete existing, create new)
- **Required Fields**:
  - `month`: String (YYYY-MM format)
  - `rosterName`: String
  - `data`: Array of daily roster data
  - `createdBy`: String
  - `createdByName`: String
- **Response**: New roster object

## Scripts

### Seed Sample Data
```bash
node scripts/seedRosters.js
```
Creates sample roster data for January, February, and March 2025.

### Clear Roster Data
```bash
node scripts/clearRosterData.js
```
Removes all roster data from the database.

## Frontend Integration

The frontend components have been updated to use the backend API:

- **RosterManagement.js**: Creates new rosters via API
- **RosterView.js**: Fetches, views, and updates rosters via API

### API Configuration
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:44354';
```

## Database Collections

The roster data is stored in the MongoDB collection `rosters` in the existing `IMS_slt` database, alongside other application data like:
- organizations
- operationavailabilities  
- solutionprojects
- shifts
- onboardmedia
- etc.

## Security Features

- Input validation on all endpoints
- Month format validation (YYYY-MM)
- Roster data structure validation
- Duplicate prevention (one active roster per month)
- Soft delete functionality
- Error handling and logging

## Usage Example

1. **Create a roster**:
   ```javascript
   POST /api/rosters
   {
     "rosterName": "January 2025 Operations Roster",
     "month": "2025-01",
     "data": [...], // Daily roster data
     "createdBy": "EMP001",
     "createdByName": "John Doe"
   }
   ```

2. **Get rosters for a month**:
   ```javascript
   GET /api/rosters?month=2025-01
   ```

3. **Update a roster**:
   ```javascript
   PUT /api/rosters/64f123456789abcdef123456
   {
     "rosterName": "Updated Roster Name",
     "data": [...] // Updated roster data
   }
   ```

The roster management system is now fully integrated with the backend database and follows the same patterns as other configuration modules in the application.