# Fresh Farm - Project Structure

## Overview
Fresh Farm is a complete e-commerce platform for agricultural products with user authentication, shopping cart, and multi-page website.

## File Structure

### HTML Pages
- **index.html** - Landing page with authentication modal
- **home.html** - Home page with features showcase
- **marketplace.html** - Product listing and shopping cart
- **schemes.html** - Government agricultural schemes
- **about.html** - Company information and team profiles
- **menu.html** - Navigation menu page
- **login.html** - Standalone login page (legacy)
- **register.html** - Standalone registration page (legacy)

### JavaScript
- **app.js** - Main application file with all functionality:
  - Authentication system (login/register with demo credentials)
  - Cart management (add, update, remove items)
  - User session management via localStorage
  - Navbar user profile display
  - Modal management

### Assets
- **logo.jpeg** - Logo image
- **menu.png** - Menu icon
- **background.jpg** - Background image

## Key Features

### 1. Authentication System
- **Demo Credentials:**
  - FPO ID: VRD-20451
  - Phone: +91 9876543210
  - OTP: 123456

- **User Registration:**
  - Create new accounts with email verification
  - Automatically generates OTP (123456)

### 2. Shopping Cart
- Add products to cart (requires login)
- Adjust quantities (increase/decrease)
- Remove items from cart
- Real-time subtotal and total calculation
- ₹50 delivery charge
- One-click checkout

### 3. Session Management
- localStorage persistence for:
  - Current user session (`freshFarmCurrentUser`)
  - Registered users database (`freshFarmUsers`)
  - Shopping cart data (`freshFarmCart`)

### 4. Navigation
- Sticky navbar on all pages
- Login button visible for logged-out users
- User profile dropdown for logged-in users
  - Display user initials in avatar
  - Logout functionality
- Cart icon with item count badge

### 5. Data Persistence
All data is stored in browser localStorage:
- User accounts survive page refreshes
- Cart items persist across sessions
- User login sessions remain active until logout

## How to Use

### Login
1. Click "Login" button in navbar
2. Use demo credentials:
   - FPO ID: VRD-20451
   - Phone: +91 9876543210
   - OTP: 123456
3. Click "Login" button

### Register New Account
1. Click "Login" button
2. Click "Register now" link
3. Fill in all registration fields
4. Click "Register" button
5. Use new credentials to login (OTP is 123456)

### Shopping
1. Navigate to Marketplace page
2. Login if not already logged in
3. Click "Add to Cart" on desired products
4. Click cart icon to open cart
5. Adjust quantities or remove items
6. Click "Proceed to Checkout"

### Navigate Between Pages
- **Home** - Features and hero section
- **Marketplace** - Buy agricultural products
- **Schemes** - View government schemes
- **About** - Company information
- **Menu** - Navigation options (legacy)

## Technical Details

### localStorage Keys
```javascript
'freshFarmCurrentUser'    // Current logged-in user
'freshFarmUsers'          // All registered users
'freshFarmCart'           // Shopping cart items
```

### User Object Structure
```javascript
{
  fullName: string,
  email: string,
  phone: string,
  farmerId: string,
  location: string,
  otp: string
}
```

### Cart Item Structure
```javascript
{
  name: string,
  price: number,
  quantity: number
}
```

## Styling
- **Primary Color:** #2e7d32 (Green)
- **Font:** Poppins (Google Fonts)
- **Layout:** Flexbox and CSS Grid
- **Responsive:** Mobile-friendly design

## Browser Compatibility
Works on all modern browsers supporting:
- ES6 JavaScript
- localStorage API
- CSS3 features

## Notes
- All authentication is client-side for demo purposes
- In production, use server-side authentication and encryption
- All data is lost when browser cache is cleared
- Cart and user data are not encrypted in localStorage
