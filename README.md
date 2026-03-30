# 🧭 WanderLust

A full-stack Airbnb-inspired property listing web application where users can create, browse, and review travel stays across the world.

---

## 🌍 Live Features

- Browse all property listings with price and location
- Create, edit, and delete your own listings with image upload
- Leave star ratings and comments as reviews
- Interactive map showing exact listing location
- User authentication (signup, login, logout)
- Flash notifications for all key user actions
- Tax toggle to display total price including 18% GST
- Secure session management with MongoDB store

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (v22) |
| Framework | Express.js v4 |
| Database | MongoDB + Mongoose |
| Templating | EJS + EJS-Mate (layouts) |
| Auth | Passport.js (Local Strategy) |
| File Upload | Multer + Cloudinary |
| Maps | Leaflet.js + OpenStreetMap (Nominatim geocoding) |
| Validation | Joi |
| Session Store | connect-mongo |
| Styling | Bootstrap 5 + Custom CSS |

---

## 📁 Project Structure

```
wanderlust/
├── app.js                   # Entry point, Express setup
├── cloudConfig.js           # Cloudinary configuration
├── middleware.js            # Auth, validation, ownership middleware
├── schema.js                # Joi validation schemas
│
├── models/
│   ├── listing.js           # Listing schema (title, description, image, geo, etc.)
│   ├── reviews.js           # Review schema (rating, comment, author)
│   └── user.js              # User schema (passport-local-mongoose)
│
├── controllers/
│   ├── listings.js          # CRUD logic for listings + geocoding
│   ├── reviews.js           # Create/delete reviews
│   └── users.js             # Signup, login, logout
│
├── routes/
│   ├── listing.js           # /listings routes (RESTful)
│   ├── review.js            # /listings/:id/reviews routes
│   └── user.js              # /signup, /login, /logout
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs  # Main HTML layout (navbar, footer, scripts)
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── listings/
│   │   ├── index.ejs        # All listings grid
│   │   ├── show.ejs         # Single listing detail + map + reviews
│   │   ├── new.ejs          # Create listing form
│   │   ├── edit.ejs         # Edit listing form
│   │   └── error.ejs        # Error display
│   └── user/
│       ├── signup.ejs
│       └── login.ejs
│
├── public/
│   ├── css/
│   │   ├── style.css        # Custom styles
│   │   └── rating.css       # Starability star rating widget
│   └── js/
│       ├── map.js           # Leaflet map initialization
│       └── script.js        # Bootstrap form validation
│
└── utils/
    ├── ExpressError.js      # Custom error class
    └── wrapAsync.js         # Async error handler wrapper
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v22+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
ATLAS_DB=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the server

```bash
node app.js
```

Visit `http://localhost:8080` in your browser.

---

## 🔐 Authentication & Authorization

- Users must be **logged in** to create listings or post reviews.
- Only the **listing owner** can edit or delete their listing.
- Only the **review author** can delete their own review.
- Unauthenticated users are redirected to `/login` and returned to their original destination after login.

---

## 🗺️ Map Integration

Listing locations are geocoded on creation using the **OpenStreetMap Nominatim API** (free, no API key required). Coordinates are stored in MongoDB as a GeoJSON `Point` and rendered on the show page using **Leaflet.js** with Carto tiles.

---

## 🖼️ Image Upload

Images are uploaded via **Multer** and stored on **Cloudinary**. The edit form shows a 250×250 preview of the current image before replacement.

---

## 🧩 Key Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/listings` | All listings |
| GET | `/listings/new` | New listing form |
| POST | `/listings` | Create listing |
| GET | `/listings/:id` | Show listing |
| GET | `/listings/:id/edit` | Edit form |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |
| POST | `/listings/:id/reviews` | Add review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review |
| GET/POST | `/signup` | User registration |
| GET/POST | `/login` | User login |
| GET | `/logout` | User logout |

---

## ⚠️ Known Limitations / Potential Improvements

- Search bar in navbar is UI-only (not yet functional)
- Category filters (Trending, Mountain, etc.) are UI-only

---

## 📄 License

ISC
