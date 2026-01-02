Event Booking System
CSCI426 – Advanced Web Programming


Project Description
The Event Booking System is a full-stack web application built using Node.js, Express, MySQL, and React.
It allows users to register, log in, and book events, while admins can manage users and bookings through an admin dashboard.

Objectives
- Implement backend development using Node.js
- Use MySQL for database integration
- Apply authentication (Login / Signup) with JWT
- Implement CRUD operations
- Create an admin panel

Technologies Used
**Backend:** Node.js, Express.js, MySQL, JWT, bcrypt, dotenv  
**Frontend:** React.js, React Router, Axios, CSS  
**Tools:** Git, GitHub, MySQL Workbench, VS Code

Database Design
Users
- id (PK)
- full_name
- email (unique)
- phone
- password
- role (user/admin)
- created_at

Bookings
- id (PK)
- event_id
- event_name
- event_date
- user_id (FK)
- user_email
- user_name
- created_at

Features
User
- Signup & Login
- Book events
- View personal bookings
- Logout

Admin
- View users
- Update user role
- Delete users
- View all bookings
- Delete bookings

Security
- Password hashing with bcrypt
- JWT authentication
- Role-based authorization

Installation
Backend
cd backend/backend
npm install
node server.js

Frontend
npm install
npm start


Future Improvements
- Email notifications
- Event CRUD
- Pagination
- Better UI

Course Information
CSCI426 – Advanced Web Programming  

