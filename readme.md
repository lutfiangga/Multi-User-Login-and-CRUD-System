
# Multi-User Login and CRUD System

Proyek ini adalah aplikasi berbasis web yang menyediakan fitur login multi-user dengan hak akses yang berbeda antara admin dan pengguna biasa. Admin dapat melakukan operasi CRUD (Create, Read, Update, Delete) pada pengguna dan produk, sementara pengguna biasa hanya dapat melakukan operasi CRUD pada produk.

## Features

- **Login:** Pengguna dapat masuk ke aplikasi dengan email dan password.
- **CRUD Pengguna:** Admin dapat membuat, membaca, memperbarui, dan menghapus data pengguna.
- **CRUD Produk:** Admin dan pengguna dapat membuat, membaca, memperbarui, dan menghapus data produk.
- **Perbedaan Akses:**
  - **Admin:** Dapat melakukan operasi CRUD pada pengguna dan produk.
  - **Pengguna:** Hanya dapat melakukan operasi CRUD pada produk.

## Technologies Used

- **Frontend:**
  - React.js
  - Axios (for HTTP requests)
  - Tailwind CSS (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - Express-session
  - Argon2
  - MySQL

## Prerequisites

- Node.js and npm installed on your machine
- MySQL installed and running on your machine

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lutfiangga/Multi-User-Login-and-CRUD-System.git
cd Multi-User-Login-and-CRUD-System
```

### 2. Backend Setup

 #### 1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

 #### 2. Install the dependencies:

   ```bash
   npm install
   ```

 #### 3. Create a `.env` file in the `backend` directory and add your MySQL connection string:

   ```bash
   SERVER_PORT=your_server_port
   SESS_SECRET=your_secret_session
   DB_NAME=your_database
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=your_hostname
   DB_PORT=your_mysql_port
   DB_DIALECT=mysql
   ```

 #### 4. Start the backend server:

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`.

### 3. Frontend Setup

 #### 1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

 #### 2. Install the dependencies:

   ```bash
   npm install
   ```

 #### 3. Create a `.env` file in the `frontend` directory and add the API URL:

   ```bash
   VITE_PRIVATE_API_URL=your_api_url
   ```

 #### 4. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`.

## Endpoints API

### Auth

- **POST /login** - Login pengguna
- **POST /logout** - Logout pengguna
- **GET /me** - Mendapatkan informasi pengguna yang sedang login

### Users (Admin)

- **GET /users** - Mendapatkan daftar pengguna
- **GET /users/:id** - Mendapatkan detail pengguna
- **POST /users** - Menambahkan pengguna baru
- **PATCH /users/:id** - Memperbarui pengguna
- **DELETE /users/:id** - Menghapus pengguna

### Products

- **GET /products** - Mendapatkan daftar produk
- **GET /products/:id** - Mendapatkan detail produk
- **POST /products** - Menambahkan produk baru
- **PATCH /products/:id** - Memperbarui produk
- **DELETE /products/:id** - Menghapus produk

## Hak Akses

- **Admin**: Dapat mengakses semua endpoint untuk pengguna dan produk.
- **Pengguna Biasa**: Hanya dapat mengakses endpoint untuk produk.


## Project Structure

```
.
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── .env
│   ├── index.js
│   └── package.json
└── frontend
    ├── src
    │   ├── app
    │   ├── components
    │   ├── features
    │   ├── pages
    │   ├── App.jsx
    │   ├── main.jsx
    ├── .env
    └── package.json
```

## Usage

- **Deskripsi**: Memberikan gambaran umum tentang aplikasi dan fitur-fiturnya.
- **Teknologi**: Menyebutkan teknologi yang digunakan dalam proyek.
- **Setup dan Instalasi**: Langkah-langkah untuk mengatur dan menjalankan proyek di lingkungan lokal.
- **Endpoints API**: Menyediakan informasi tentang API endpoints yang tersedia.
- **Hak Akses**: Menjelaskan perbedaan hak akses antara admin dan pengguna biasa.
- **Struktur Direktori**: Menunjukkan struktur direktori dari proyek.