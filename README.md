# HerMentor - Full-Stack Mentorship Platform

A complete full-stack web application connecting mentors and mentees for professional growth and development.

## 🏗 Tech Stack

- **Frontend**: React with Vite, Styled Components
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT with bcrypt password hashing

## 📁 Project Structure

\`\`\`
hermentor/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth)
│   │   ├── services/      # API services
│   │   └── styles/        # Styled components theme
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── package.json
└── db/                   # Database files
    ├── schema.sql        # Database schema
    ├── connection.js     # Database connection
    └── seed.js          # Sample data
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Database Setup

1. Install and start MySQL
2. Create a new database:
   \`\`\`sql
   CREATE DATABASE hermentor_db;
   \`\`\`
3. Run the schema:
   \`\`\`bash
   mysql -u root -p hermentor_db < db/schema.sql
   \`\`\`

### 2. Backend Setup

1. Navigate to server directory:
   \`\`\`bash
   cd server
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create `.env` file:
   \`\`\`env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=hermentor_db
   DB_PORT=3306
   
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d
   
   PORT=5000
   CLIENT_URL=http://localhost:3000
   \`\`\`

4. Seed the database with sample data:
   \`\`\`bash
   npm run seed
   \`\`\`

5. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`

### 3. Frontend Setup

1. Navigate to client directory:
   \`\`\`bash
   cd client
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open http://localhost:3000 in your browser

## 🔐 Demo Accounts

After seeding the database, you can use these demo accounts:

**Mentor Account:**
- Email: alex@example.com
- Password: password123

**Mentee Account:**
- Email: sarah@example.com
- Password: password123

## ✨ Features

### 🔐 Authentication
- User registration with role selection (mentor/mentee)
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes

### 🧑‍🏫 Mentor Dashboard
- View assigned mentees
- Search mentees by name/interests
- Update mentor profile (skills, bio, availability)
- Profile management (CRUD operations)

### 🧑‍🎓 Mentee Dashboard
- Browse available mentors
- View detailed mentor profiles
- Search mentors by expertise
- Request mentorship
- Profile management

### 🏠 Landing Page
- Hero section with call-to-action
- Feature highlights
- Contact form
- Responsive design

### 👤 Profile Management
- Edit personal information
- Update role-specific profiles
- Change password
- Delete account

## 🛠 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Mentors
- `GET /api/mentors` - Get all mentors
- `GET /api/mentors/:id` - Get mentor by ID
- `GET /api/mentors/dashboard/mentees` - Get mentor's mentees
- `PUT /api/mentors/profile` - Update mentor profile

### Mentees
- `PUT /api/mentees/profile` - Update mentee profile
- `POST /api/mentees/request-mentorship` - Request mentorship

### Users
- `PUT /api/users` - Update user info
- `DELETE /api/users` - Delete user account
- `PUT /api/users/change-password` - Change password

### Contact
- `POST /api/contact` - Submit contact form

## 🎨 Design System

The application uses a consistent color palette:
- Primary: #915eff (Purple)
- Secondary: #2b2d42 (Dark Blue)
- Accent: #ffd3e0 (Light Pink)
- Success: #41b47c (Green)
- Background: #f8f9fa (Light Gray)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- CORS configuration
- SQL injection prevention

## 📱 Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Responsive navigation

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MySQL database is accessible
3. Run database migrations
4. Deploy the server code

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify database connection
3. Ensure all environment variables are set
4. Check that both frontend and backend servers are running

For additional help, please open an issue on the repository.
\`\`\`

## 🎉 Complete Full-Stack Application

I've successfully created **HerMentor**, a complete full-stack mentorship platform with all the features you requested:

### ✅ **Backend Features**
- **Express.js API** with RESTful endpoints
- **MySQL database** with proper schema and relationships
- **JWT authentication** with bcrypt password hashing
- **Role-based access control** (mentor/mentee)
- **Input validation** and error handling
- **CORS configuration** for frontend integration
- **Database seeding** with sample data

### ✅ **Frontend Features**
- **React with Vite** (no Tailwind/Chakra UI)
- **Styled Components** for clean, maintainable CSS
- **React Router** for navigation
- **Authentication context** for state management
- **Protected routes** based on user roles
- **Responsive design** with your color palette
- **Real API integration** with loading states and error handling

### ✅ **Complete CRUD Operations**
- **Create**: User registration, profile creation
- **Read**: View mentors, mentees, profiles
- **Update**: Edit profiles, change passwords
- **Delete**: Delete user accounts

### ✅ **Key Pages & Features**
- **Landing Page** with hero section and contact form
- **Signup/Login** with role selection
- **Mentor Dashboard** with mentee management
- **Mentee Dashboard** with mentor discovery
- **Profile Management** with role-specific forms
- **Search functionality** for mentors and mentees

### 🚀 **Ready to Run**
The application is production-ready with:
- Complete setup instructions
- Demo accounts for testing
- Environment configuration
- Database schema and seeding
- Error handling and validation
- Security best practices

To get started, follow the README instructions to set up MySQL, install dependencies, and run both the backend and frontend servers!
