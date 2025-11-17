# Authentication Guide

## Overview

The LUXE Real Estate website includes a complete authentication system that allows users to create accounts, log in, and access personalized features.

## Features

### User Registration
- Create account with name, email, password, and optional phone number
- Password validation (minimum 8 characters, uppercase, lowercase, numbers)
- Email uniqueness validation
- Terms and conditions agreement

### User Login
- Email and password authentication
- Remember me functionality
- Forgot password link (UI ready, backend integration needed)
- Automatic redirect to dashboard after login

### Protected Routes
- Dashboard requires authentication
- Automatic redirect to login if not authenticated
- Loading states during authentication checks

### User Dashboard
- **Overview Tab**: Recent activity and property viewing history
- **Favorites Tab**: Saved favorite properties
- **Saved Searches Tab**: Manage property search preferences
- **Settings Tab**: Update profile information (name, email, phone)

### Favorites System
- Add/remove properties from favorites
- Favorites persist across sessions
- Access favorites from dashboard
- Visual indicators for favorited properties

## Data Storage

Currently, user data is stored in browser localStorage:
- `luxe_user`: Current user data
- `luxe_auth`: Authentication status
- `luxe_users`: All registered users (for demo purposes)

**Note**: For production, replace localStorage with a secure backend API.

## User Flow

1. **New User**:
   - Visit homepage → Click "Sign In" → "Create Account"
   - Fill registration form → Account created → Redirected to Dashboard

2. **Returning User**:
   - Visit homepage → Click "Sign In"
   - Enter credentials → Login → Redirected to Dashboard

3. **Authenticated User**:
   - Navigation shows user avatar and name
   - Access to Dashboard
   - Can favorite properties
   - Can update profile settings

4. **Logout**:
   - Click logout button → Session cleared → Redirected to homepage

## Integration Points

### Adding Authentication to Components

```typescript
import { useAuth } from '../context/AuthContext'

const MyComponent = () => {
  const { isAuthenticated, user, login, logout } = useAuth()
  
  // Check if user is logged in
  if (!isAuthenticated) {
    // Show login prompt or redirect
  }
  
  // Access user data
  const userName = user?.name
  const userEmail = user?.email
}
```

### Protecting Routes

```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Adding Favorites

```typescript
const { addFavorite, removeFavorite, user } = useAuth()
const isFavorited = user?.favorites.includes(propertyId)

// Toggle favorite
onClick={() => {
  if (isFavorited) {
    removeFavorite(propertyId)
  } else {
    addFavorite(propertyId)
  }
}}
```

## Backend Integration

To connect to a real backend:

1. Replace localStorage calls in `AuthContext.tsx` with API calls
2. Update login/signup functions to use fetch/axios
3. Add JWT token handling
4. Implement proper error handling
5. Add password reset functionality
6. Add email verification

Example API integration:

```typescript
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  
  if (response.ok) {
    const data = await response.json()
    setUser(data.user)
    localStorage.setItem('token', data.token)
    return true
  }
  return false
}
```

## Security Notes

⚠️ **Current Implementation**: This is a demo implementation using localStorage. For production:

- Use secure HTTP-only cookies for tokens
- Implement proper password hashing (bcrypt)
- Add CSRF protection
- Use HTTPS only
- Implement rate limiting
- Add email verification
- Use secure session management
- Never store passwords in plain text

