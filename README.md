# Claims Management System

A full-stack insurance claims management application built with Spring Boot backend and React frontend, designed to streamline claim intake, tracking, and processing workflows.

## 📋 Project Overview

This system provides a comprehensive solution for managing insurance claims with secure user authentication, role-based access control, and real-time claim tracking capabilities.

## 🏗️ System Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.x with Spring Security
- **Database**: PostgreSQL with Flyway migrations
- **Authentication**: JWT-based security
- **API Documentation**: RESTful APIs with proper error handling
- **Build Tool**: Maven

### Frontend (React)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: Context API + Custom Hooks
- **HTTP Client**: Axios-based service layer
- **Routing**: React Router (implied by protected routes)

## 📁 Project Structure

```
claims-management-system/
├── .git/                          # Git version control
├── claim-management-backend/      # Spring Boot application
│   ├── src/main/java/com/icai/claims_management_system/
│   │   ├── controller/            # REST controllers (Auth, Claim, User, Profile, Quota)
│   │   ├── model/                 # Entity classes (User, Claim, BillLineItem, etc.)
│   │   ├── repository/            # JPA repositories
│   │   ├── service/               # Business logic layer
│   │   ├── security/              # Spring Security configuration
│   │   ├── dto/                   # Data Transfer Objects
│   │   └── util/                  # Utility classes (JWT, Password hashing)
│   ├── src/main/resources/
│   │   ├── application.properties # Application configuration
│   │   └── db/migration/          # Flyway database migrations
│   ├── target/                    # Compiled artifacts
│   └── pom.xml                    # Maven dependencies
├── claim-management-frontend/     # React application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── admin/             # Admin-specific components
│   │   │   ├── auth/              # Authentication components
│   │   │   ├── claims/            # Claim management components
│   │   │   ├── dashboard/         # Dashboard components
│   │   │   ├── layout/            # Layout components
│   │   │   └── ui/                # Basic UI components
│   │   ├── contexts/              # React contexts (Auth)
│   │   ├── pages/                 # Page components
│   │   ├── services/              # API service layer
│   │   ├── hooks/                 # Custom React hooks
│   │   └── utils/                 # Utility functions
│   └── package.json               # npm dependencies
├── db.sql                         # Database schema
├── LICENSE                        # Project license
└── README.md                      # This file
```

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, User roles)
- Protected routes and API endpoints
- Secure password hashing

### Claim Management
- Create, read, update, and delete claims
- Track claim status (Pending, Approved, Rejected, etc.)
- Bill line item management
- Claim history and auditing

### User Management
- User registration and profile management
- Admin user management capabilities
- Role assignment and permissions

### Dashboard & Analytics
- Overview of claim statistics
- Quick actions for common tasks
- Real-time status updates

## 🛠️ Installation & Setup

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- PostgreSQL 12 or higher
- Maven 3.6+

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd claim-management-backend
   ```

2. Configure database connection in `src/main/resources/application.properties`

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd claim-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📊 Database Schema

The system uses PostgreSQL with the following main entities:
- **Users**: User accounts with roles and authentication details
- **Claims**: Insurance claims with status tracking
- **BillLineItems**: Individual line items within claims
- **ClaimStatus**: Status history and transitions

## 🔒 Security Features

- Password hashing with BCrypt
- JWT token-based authentication
- CORS configuration for frontend-backend communication
- Role-based endpoint protection
- CSRF protection (where applicable)

## 🧪 Testing

### Backend Testing
```bash
cd claim-management-backend
./mvnw test
```

### Frontend Testing
```bash
cd claim-management-frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
- Package the application: `./mvnw clean package`
- Deploy the generated JAR file to your server
- Configure production database connection
- Set up SSL/TLS for secure communication

### Frontend Deployment
- Build for production: `npm run build`
- Deploy the `dist` folder to your web server
- Configure reverse proxy for API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📝 License

This project is licensed under the terms of the LICENSE file included in the repository.

## 📞 Support

For support and questions, please refer to the project documentation or create an issue in the repository.

---

**Built with ❤️ using Spring Boot and React**
