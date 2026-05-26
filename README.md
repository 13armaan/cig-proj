# SnapSync

A comprehensive web application for managing and sharing event photos with AI-powered tagging, real-time notifications, and collaborative features.

##  Features

### Photo Management
- **Batch Upload**: Upload multiple photos simultaneously
- **AI-Powered Tagging**: Automatic tag generation for uploaded photos
- **Manual Tagging**: Add custom tags and tag users in photos
- **Smart Search**: Filter photos by tags, tagged users, and albums
- **Watermarking**: Automatic watermark generation for photos


### Album Management
- **Create Albums**: Organize photos into event-specific albums
- **Album Covers**: Set custom cover images for albums
- **Date Management**: Track event dates and create chronological collections
- **Access Control**: Manage album visibility and permissions

### User Interaction
- **Comments**: Add comments to photos
- **Favorites**: Mark photos as favorites for quick access
- **User Tagging**: Tag people in photos by email
- **Real-time Notifications**: Get instant updates via WebSocket connections
- **OTP Authentication**: Secure email-based verification system

### Role-Based Access
- **Admin**: Full platform management capabilities
- **Photographer**: Upload and manage photos, view analytics
- **Verified Users**: Access photos, comment, and favorite
- **Guests**: Limited read-only access

### Photographer Dashboard
- **Upload Stats**: Track total uploads, downloads, and favorites
- **Photo Gallery**: View and manage uploaded photos
- **Analytics**: Monitor engagement metrics

##  Tech Stack

### Backend
- **Framework**: Django 6.0
- **Database**: PostgreSQL
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Task Queue**: Celery with Redis
- **WebSockets**: Django Channels with Redis
- **Image Processing**: Pillow
- **API**: Django REST Framework

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: CSS Modules

### Infrastructure
- **Cache/Queue**: Redis
- **Media Storage**: Local filesystem (configurable for cloud storage)
- **Real-time**: WebSocket connections for notifications

##  Prerequisites

- Python 3.10+
- Node.js 18+
- Redis Server
- npm or yarn

##  Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SnapSync
```

### 2. Backend Setup

#### Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Configure Environment Variables
Create a `.env` file in the root directory:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3

# Email Configuration (for OTP)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Redis Configuration
REDIS_URL=redis://localhost:6379/0

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

#### Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

#### Create Superuser
```bash
python manage.py createsuperuser
```

###  Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
```

###  Start Redis Server
```bash
redis-server
```

##  Running the Application

### Start Backend Services

####  Django Server
```bash
python manage.py runserver
```

####  Celery Worker
```bash
celery -A backend worker --loglevel=info
```



### Start Frontend

####  React Development Server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Admin Panel: http://localhost:8000/admin

##  Project Structure

```
SnapSync/
├── accounts/              # User authentication & management
│   ├── models.py         # User, Role, EmailOTP models
│   ├── views.py          # Auth endpoints (login, signup, OTP)
│   ├── permissions.py    # Custom permissions
│   └── serializers.py    # User serializers
├── albums/               # Album management
│   ├── models.py         # Album model
│   ├── views.py          # Album CRUD operations
│   └── serializers.py    # Album serializers
├── photos/               # Photo management
│   ├── models.py         # Photo, Tag, PhotoFavorite models
│   ├── views.py          # Photo upload, tagging, favorites
│   ├── tasks.py          # Celery tasks for image processing
│   └── serializers.py    # Photo serializers
├── comments/             # Comment system
│   ├── models.py         # Comment model
│   ├── views.py          # Comment CRUD
│   └── serializers.py    # Comment serializers
├── notifications/        # Real-time notifications
│   ├── models.py         # Notification model
│   ├── consumer.py       # WebSocket consumer
│   ├── routing.py        # WebSocket routing
│   └── middleware.py     # WebSocket authentication
├── backend/              # Django project settings
│   ├── settings.py       # Main configuration
│   ├── urls.py           # URL routing
│   ├── celery.py         # Celery configuration
│   └── asgi.py           # ASGI configuration
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # Reusable components (Navbar, etc.)
│   │   ├── pages/        # Page components
│   │   │   ├── Gallery.jsx        # Photo gallery
│   │   │   ├── Albums.jsx         # Album management
│   │   │   ├── Upload.jsx         # Photographer dashboard
│   │   │   ├── Profile.jsx        # User profile
│   │   │   ├── Login.jsx          # Authentication
│   │   │   └── SignUp.jsx         # Registration
│   │   ├── services/     # API services
│   │   │   └── api.js    # Axios configuration
│   │   └── context/      # React context providers
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── media/                # Uploaded media files
│   ├── originals/        # Original photos
│   ├── thumbnails/       # Thumbnail versions
│   ├── watermarks/       # Watermarked versions
│   └── album_covers/     # Album cover images
├── manage.py             # Django management script
└── requirements.txt      # Python dependencies
```

## Key Features Implementation

### Photo Upload Flow
1. User selects photos and album
2. Photos uploaded via batch upload endpoint
3. Celery task generates thumbnails and watermarks
4. AI tags generated automatically (if configured)
5. Photos saved with metadata

### Notification System
1. WebSocket connection established on login
2. User joins personal notification channel
3. Events trigger notifications (comments, tags, favorites)
4. Real-time updates pushed to connected clients

### Search & Filter
- Tag-based search
- User-tagged search
- Album filtering
- Favorites collection
- Pagination support



##  Authentication

### JWT Token System
- Access tokens for API requests
- Refresh tokens for token renewal
- Secure WebSocket authentication

### OTP Verification
- Email-based OTP for signup
- 10-minute expiration
- Resend functionality

## API Endpoints

### Authentication
- `POST /api/accounts/signup/` - User registration
- `POST /api/accounts/verify-otp/` - OTP verification
- `POST /api/accounts/login/` - User login


### Photos
- `GET /api/photos/` - List photos (with filters)
- `POST /api/photos/batch_upload/` - Upload multiple photos
- `GET /api/photos/{id}/` - Photo detail
- `POST /api/photos/{id}/favorite/` - Add to favorites
- `POST /api/photos/{id}/add_tag/` - Add tag
- `GET /api/photos/{id}/download/` - Download photo

### Albums
- `GET /api/albums/` - List albums
- `POST /api/albums/` - Create album
- `GET /api/albums/{id}/` - Album detail
- `PUT /api/albums/{id}/` - Update album

### Comments
- `GET /api/photos/{id}/comments/` - List comments
- `POST /api/photos/{id}/comments/` - Add comment








