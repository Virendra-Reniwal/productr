# Server

Express.js backend server for the Orufy application with authentication, product management, and file upload capabilities.

## Overview

This is a Node.js/Express server that provides RESTful APIs for user authentication, OTP verification, product management, and file uploads. It uses MongoDB for data persistence and integrates email notifications.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.1.5
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: bcrypt 6.0.0
- **File Upload**: multer 2.0.2
- **Email**: nodemailer 7.0.13
- **CORS**: cors 2.8.6
- **Environment**: dotenv 17.2.3
- **Development**: nodemon 3.1.11

## Project Structure

```
server/
├── src/
│   ├── app.js              # Express app configuration
│   ├── config/
│   │   ├── db.js          # MongoDB connection
│   │   └── email.js       # Email configuration
│   ├── controllers/
│   │   ├── authController.js      # Auth logic
│   │   └── product.controller.js  # Product logic
│   ├── middlewares/
│   │   ├── auth.middleware.js     # JWT verification
│   │   └── upload.middleware.js   # File upload handling
│   ├── models/
│   │   ├── User.js        # User schema
│   │   ├── Otp.js         # OTP schema
│   │   └── product.model.js # Product schema
│   ├── routes/
│   │   ├── auth.routes.js      # Auth endpoints
│   │   ├── product.routes.js   # Product endpoints
│   │   └── protected.routes.js # Protected endpoints
│   └── utils/
│       ├── generateOtp.js   # OTP generation
│       └── sendEmail.js     # Email sending utility
├── uploads/        # File storage directory
├── server.js       # Entry point
├── package.json
└── README.md
```

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file** in the server root with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/orufy
   JWT_SECRET=your_jwt_secret_key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   SMTP_FROM=noreply@orufy.com
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`)

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /login` - User login
- `POST /verify-otp` - Verify OTP
- `POST /resend-otp` - Resend OTP
- `POST /signup` - User registration

### Product Routes (`/api/products`)
- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `POST /` - Create product (protected)
- `PUT /:id` - Update product (protected)
- `DELETE /:id` - Delete product (protected)

### Protected Routes (`/api/protected`)
- Routes that require JWT authentication

## Middleware

### Authentication Middleware (`auth.middleware.js`)
Verifies JWT tokens from the Authorization header. Required for protected routes.

### Upload Middleware (`upload.middleware.js`)
Handles file uploads using multer. Stores files in the `uploads/` directory.

## Database Models

### User
```
- email (String, unique)
- password (String, hashed)
- createdAt (Date)
```

### OTP
```
- email (String)
- otp (String)
- expiresAt (Date)
```

### Product
```
- name (String)
- description (String)
- price (Number)
- image (String, file path)
- userId (ObjectId, reference to User)
- createdAt (Date)
- updatedAt (Date)
```

## Key Features

- 🔐 **JWT Authentication**: Secure token-based authentication
- 📧 **Email Verification**: OTP-based user verification
- 🔑 **Password Hashing**: Bcrypt for secure password storage
- 📁 **File Uploads**: Multer integration for product images
- 🗄️ **MongoDB Integration**: Mongoose ODM for data management
- 🛡️ **CORS Support**: Cross-Origin Resource Sharing enabled
- 📝 **Error Handling**: Comprehensive error handling middleware

## Error Handling

The server includes error handling middleware that catches exceptions and returns appropriate HTTP status codes and error messages.

## Common Issues & Troubleshooting

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using the port

### MongoDB Connection Failed
- Ensure MongoDB is running locally or connection string is correct
- Verify `MONGODB_URI` in `.env`

### Email Not Sending
- Check SMTP credentials in `.env`
- Enable "Less secure app access" for Gmail accounts
- Use App-specific passwords for Gmail with 2FA

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | 5.2.1 | Web framework |
| mongoose | 9.1.5 | MongoDB ODM |
| jsonwebtoken | 9.0.3 | JWT authentication |
| bcrypt | 6.0.0 | Password hashing |
| multer | 2.0.2 | File uploads |
| nodemailer | 7.0.13 | Email sending |
| cors | 2.8.6 | CORS handling |
| dotenv | 17.2.3 | Environment variables |

## Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| nodemon | 3.1.11 | Auto-reload on file changes |

## Development Notes

- Server validates email format before operations
- Passwords are hashed using bcrypt before storage
- JWT tokens should be included in Authorization header as: `Bearer <token>`
- File uploads are restricted to specified directories
- All sensitive data should be stored in `.env` file (not committed to git)

## Security Considerations

1. Always use HTTPS in production
2. Store sensitive keys in environment variables
3. Implement rate limiting for API endpoints
4. Validate all user inputs
5. Use secure password policies
6. Keep dependencies updated regularly

## Contributing

When contributing to the server:
1. Follow existing code structure
2. Add error handling for new features
3. Update this README with any new endpoints or features
4. Test changes before committing

## License

[Add your license information here]
