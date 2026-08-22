# 🚀 JobStack – MERN Job Portal

JobStack is a full-stack **MERN Job Portal** where job seekers can discover and apply for jobs, while recruiters can create companies, post jobs, and manage applicants.

🌐 **Live Demo:** https://mern-job-portal-frontend-piwr.onrender.com

## ✨ Features

### 👤 Job Seekers

* Register & Login
* Email verification using **OTP via Brevo**
* Resend OTP
* Forgot & Reset Password using OTP
* Search and filter jobs
* View detailed job descriptions
* Apply for jobs
* Track applied jobs
* Update profile

### 🏢 Recruiters

* Recruiter authentication
* Create and manage companies
* Post, edit and delete jobs
* View applicants for posted jobs
* Update application status

### 🔐 Authentication & Security

* JWT authentication
* HTTP cookie-based authentication
* Password hashing with bcrypt
* Protected routes
* Role-based authorization
* Token blacklisting
* OTP-based email verification using Brevo

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* React Router
* Tailwind CSS
* shadcn/ui
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Other Technologies

* JWT
* bcrypt
* Brevo
* Multer
* ImageKit

## 📸 Screenshots

<img width="1920" height="885" alt="image" src="https://github.com/user-attachments/assets/d1ed61b2-4277-4942-9642-477f9db023a1" />
<img width="1915" height="878" alt="image" src="https://github.com/user-attachments/assets/775dcbfe-020a-4c5c-bfe8-a91a334270fb" />
<img width="1912" height="874" alt="image" src="https://github.com/user-attachments/assets/1552c7d8-4a53-4618-b013-da44aae203cf" />
<img width="1920" height="878" alt="image" src="https://github.com/user-attachments/assets/77bd5cb1-e351-4314-8ebe-965b82c0d672" />
<img width="1908" height="880" alt="image" src="https://github.com/user-attachments/assets/9ced1e4c-7c70-46d8-bc6e-0c99355c8d05" />

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Renu1418/mern-job-portal.git
cd mern-job-portal
```

### 2. Install dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

### 3. Environment Variables

Create a `.env` file in the backend directory and add your required credentials:

```env
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
BREVO_API_KEY=your_brevo_api_key
```

### 4. Start the application

```bash
npm run dev
```

## 🌐 Deployment

The application is deployed on **Render**.

🔗 **Live Project:** https://mern-job-portal-frontend-piwr.onrender.com

## 👩‍💻 Author

**Renu Sharma**
MERN Stack Developer

⭐ If you like this project, consider giving it a star!
