# Client

React-based frontend application for the Orufy platform featuring authentication, product management, and dashboard functionality.

## Overview

This is a React 19 application built with Create React App. It provides a user-friendly interface for login, OTP verification, product management, and dashboard features with real-time notifications.

## Tech Stack

- **React**: 19.2.4
- **React DOM**: 19.2.4
- **React Router**: 7.13.0 (Client-side routing)
- **Axios**: 1.13.4 (HTTP client)
- **React Scripts**: 5.0.1 (Build tools)
- **Testing Library**: React 16.3.2, DOM 10.4.1, Jest-DOM 6.9.1

## Project Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Home page
│   │   ├── NotFound.jsx          # 404 page
│   │   └── Auth/
│   │       ├── Auth.css          # Auth styles
│   │       ├── Login.jsx         # Login page
│   │       └── EnterOTP.jsx      # OTP verification page
│   ├── Dashboard/
│   │   ├── Dashboard.css         # Dashboard styles
│   │   ├── Dashboard.jsx         # Main dashboard
│   │   └── components/
│   │       ├── Header.jsx        # Dashboard header
│   │       ├── Sidebar.jsx       # Navigation sidebar
│   │       ├── Tabs.jsx          # Tab navigation
│   │       ├── ProductCard.jsx   # Product card display
│   │       ├── AddProductModal.jsx    # Add product form
│   │       ├── EditProductModal.jsx   # Edit product form
│   │       ├── EmptyState.jsx         # Empty state UI
│   │       ├── Toast.js          # Toast notifications
│   │       └── Toast.css         # Toast styles
│   ├── routes/
│   │   └── AppRoutes.jsx         # Route configuration
│   ├── assets/
│   │   ├── icons/                # Icon assets
│   │   └── images/               # Image assets
│   ├── App.js                    # Root component
│   ├── index.js                  # Entry point
│   ├── reportWebVitals.js        # Performance metrics
│   └── setupTests.js             # Test configuration
├── public/
│   ├── index.html                # HTML template
│   └── robots.txt                # SEO robots file
├── package.json
├── README.md
└── .gitignore
```

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file** in the client root (optional):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Running the Application

### Development Mode
```bash
npm start
```
Opens [http://localhost:3000](http://localhost:3000) in your browser. The app auto-reloads on file changes.

### Production Build
```bash
npm run build
```
Creates optimized production build in the `build` folder.

### Testing
```bash
npm test
```
Launches test runner in interactive watch mode.

## Key Features

- 🔐 **Authentication**: Email/OTP-based login system
- 📧 **OTP Verification**: Secure OTP verification flow
- 📊 **Dashboard**: Intuitive dashboard for product management
- 📦 **Product Management**: Add, edit, and delete products
- 📤 **File Upload**: Upload product images with preview
- 🔔 **Toast Notifications**: Real-time user feedback
- 📱 **Responsive Design**: Mobile-friendly interface
- 🔀 **Client-side Routing**: Fast navigation with React Router

## Pages & Components

### Pages

#### **Home** (`Home.jsx`)
Landing page or default page view.

#### **Login** (`Auth/Login.jsx`)
- Email input field
- Login button
- Validation and error handling

#### **Enter OTP** (`Auth/EnterOTP.jsx`)
- OTP input
- Resend OTP functionality
- Verification logic

#### **Dashboard** (`Dashboard/Dashboard.jsx`)
- Main application hub after authentication
- Product list view
- Add/edit/delete operations
- Tab-based navigation

#### **Not Found** (`NotFound.jsx`)
404 error page for invalid routes.

### Dashboard Components

| Component | Purpose |
|-----------|---------|
| `Header.jsx` | Top navigation bar with user info |
| `Sidebar.jsx` | Left navigation menu |
| `Tabs.jsx` | Tab navigation for different views |
| `ProductCard.jsx` | Individual product display card |
| `AddProductModal.jsx` | Modal form for creating products |
| `EditProductModal.jsx` | Modal form for editing products |
| `EmptyState.jsx` | UI for empty product list |
| `Toast.js` | Notification system |

## API Integration

The app communicates with the backend server via Axios:

```javascript
// Base API configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Key API Endpoints Used

- `POST /auth/login` - User login
- `POST /auth/verify-otp` - OTP verification
- `POST /auth/resend-otp` - Resend OTP
- `GET /products` - Fetch all products
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Authentication Flow

1. User enters email on Login page
2. Backend sends OTP to email
3. User verifies OTP on EnterOTP page
4. JWT token received and stored
5. User redirected to Dashboard
6. All subsequent requests include JWT token in headers

## Available Scripts

### `npm start`
- Runs app in development mode
- Open [http://localhost:3000](http://localhost:3000) to view in browser
- Auto-reloads on code changes

### `npm test`
- Launches test runner in interactive watch mode
- See [testing documentation](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build`
- Builds app for production to `build` folder
- Optimizes for best performance
- Build is minified with content hashes

## Environment Variables

Create a `.env` file in the client directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Styling

- **CSS Files**: Global and component-specific CSS files
- **Responsive Design**: Mobile-first approach
- **Assets**: Images and icons in `src/assets/`

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | React DOM rendering |
| react-router-dom | 7.13.0 | Client-side routing |
| axios | 1.13.4 | HTTP client |
| react-scripts | 5.0.1 | Build configuration |
| @testing-library/react | 16.3.2 | React testing utilities |

## Development Notes

- Ensure backend server is running on `http://localhost:5000`
- JWT tokens are typically stored in localStorage or sessionStorage
- Components use functional components with hooks
- CSS modules or inline styles for component styling
- Toast notifications for user feedback on actions

## Security Considerations

1. **Never commit `.env` file** with sensitive data
2. **HTTPS in production**: Always use HTTPS URLs
3. **Token Management**: Securely store and manage JWT tokens
4. **Input Validation**: Validate all user inputs
5. **CORS Configuration**: Verify backend CORS settings match frontend URL
6. **XSS Protection**: React escapes content by default

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Backend Connection Issues
- Verify backend is running on `http://localhost:5000`
- Check `REACT_APP_API_URL` environment variable
- Check browser console for CORS errors

### Dependencies Installation Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## Build & Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Vercel**: Push to GitHub and connect to Vercel
- **Netlify**: Drag-and-drop the `build` folder
- **Traditional Hosting**: Deploy `build` folder to any static hosting

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## Contributing

When contributing to the client:
1. Follow the existing folder structure
2. Use functional components with hooks
3. Add proper error handling
4. Test components before committing
5. Update this README with new features

## License

[Add your license information here]

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
