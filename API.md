# API Documentation

This document describes the primary REST endpoints available in the Acowale Feedback Platform API.
You can also view the interactive Swagger documentation by visiting `/api/docs` while the backend is running.

---

## Public APIs

### Submit Feedback
**`POST /api/v1/feedback`**

Submits a new feedback entry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "category": "PRODUCT",
  "rating": 5,
  "comment": "The product is amazing!"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "category": "PRODUCT",
  "rating": 5,
  "comment": "The product is amazing!",
  "createdAt": "2023-10-27T10:00:00.000Z"
}
```

---

## Admin Auth APIs

### Admin Login
**`POST /api/v1/auth/login`**

Authenticates an admin and returns a JWT token.

**Request Body:**
```json
{
  "email": "admin@acowale.com",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5c...",
  "user": {
    "id": "uuid",
    "email": "admin@acowale.com",
    "role": "ADMIN"
  }
}
```

---

## Protected Admin APIs

*All protected APIs require the `Authorization: Bearer <token>` header.*

### Get Dashboard Statistics
**`GET /api/v1/admin/dashboard/stats`**

Retrieves aggregated statistics for the admin dashboard.

**Response (200 OK):**
```json
{
  "totalFeedbacks": 150,
  "averageRating": 4.2,
  "categoryDistribution": [
    { "category": "PRODUCT", "count": 60 },
    { "category": "SERVICE", "count": 40 },
    { "category": "SUPPORT", "count": 30 },
    { "category": "OTHER", "count": 20 }
  ],
  "recentFeedbacks": [
    {
      "id": "uuid",
      "name": "Jane Smith",
      "rating": 4,
      "createdAt": "2023-10-27T10:00:00.000Z"
    }
  ]
}
```

### List Feedback
**`GET /api/v1/admin/feedback`**

Retrieves a paginated list of feedback entries, with optional filtering and search.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by name or comment
- `category` (optional): Filter by category

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "category": "PRODUCT",
      "rating": 5,
      "comment": "Great!",
      "createdAt": "2023-10-27T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15
  }
}
```

---

## Health Check

### Get API Status
**`GET /health`**

Checks if the API and Database are running properly. Used by load balancers and deployment platforms to ensure uptime.

**Response (200 OK):**
```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    }
  }
}
```
