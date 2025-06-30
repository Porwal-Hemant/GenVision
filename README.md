# GenVision - Image Creation SaaS Application

##  Test Credentials

You can use the following test account to explore the app:

- **Email**: test@gmail.com  
- **Password**: 123456789

> **Note**: For the best experience, use this platform on a **desktop or laptop** device.

---

##  Description

**GenVision** is a SaaS (Software as a Service) application that allows users to generate AI-powered images using a chatbot interface. It also includes a background remover tool and premium features powered by Razorpay payments.

---

##  Core Features

- **AI-Powered Chatbot**: Type custom commands to generate images.
- **Background Remover**: Enhance uploaded images by removing backgrounds.
- **Secure Authentication**: JWT-based login system for secure access.
- **Razorpay Integration**: Users can upgrade to premium for advanced features.
- **Modern UI**: Built with Tailwind CSS and responsive across devices.

---

##  Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Axios, React Toastify  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Authentication**: JWT  
- **File Uploads**: Multer  
- **Payments**: Razorpay  

---

##  Folder Structure

```bash
genvision/
├── client/        # React frontend
└── server/        # Node.js backend

```

##  Getting Started

Follow these steps to set up **PulseVibe** locally.

---

###  1. Clone the Repository

```bash
git clone https://github.com/Porwal-Hemant/GenVision.git
cd GenVision
```

###  2. Install Dependencies
PulseVibe may have separate folders for client and server ( named **client** and **server** )

- Install Backend Dependencies

```bash
cd server
npm install
npm start

```

-  Install Frontend Dependencies
```bash
cd ../client
npm install
npm run dev
```

###  3. Configure Environment Variables

- Create a `.env` file inside the **server** folder and add:

```bash
PORT               =  5001
MONGODB_URI        =  your_mongodb_connection_string
JWT_SECRET_KEY     =  your_jwt_secret_key
NODE_ENV           =  production
```
### 4. Start the Server

```bash
cd server
npm start

```

- The backend will start at: http://localhost:5001

### 5. Start the client

Open a new terminal:

```bash
cd client
npm run dev

```
- The frontend will run at: http://localhost:5173

###  Usage Instructions

- **Open the application** in your browser.
- **Sign up or log in** using the test credentials provided above.
- **Use the embedded chatbot** to generate images by entering custom commands.
- **Upload images** to remove their backgrounds using the background remover feature.
- **Download the generated images** to your device as needed.
- **Access premium features** by completing payments via Razorpay.

##  Developer Info

- **Name**: Hemant Porwal  
- **Email**: [hemantporwal2k3@gmail.com](mailto:hemantporwal2k3@gmail.com)  
- **LinkedIn**: [https://www.linkedin.com/in/hemantporwal/](https://www.linkedin.com/in/hemantporwal/)


