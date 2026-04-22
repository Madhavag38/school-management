# School Management API

## Setup
1. `npm install`
2. Create MySQL database using database.sql
3. Copy .env.example to .env and update credentials
4. `npm run seed` (add sample data)
5. `npm start`

## API Endpoints
- `POST /api/schools/add` - Add new school
- `GET /api/schools/list?latitude=X&longitude=Y` - List schools by distance
- `GET /api/schools/:id` - Get school by ID

## Testing
Import Postman collection and test the endpoints
Base URL: https://your-api-link.com
