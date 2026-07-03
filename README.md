# DocVerse AI – Intelligent Document Studio

**"Create, Convert, Edit, and Enhance Documents with AI."**

DocVerse AI is a modern, production-quality full-stack web application that acts as an all-in-one document platform. It allows users to upload documents, convert them between multiple formats, edit them using a rich text editor, and generate or summarize documents using the Gemini AI API.

The application features a clean, premium UI with smooth animations, glassmorphism, and an intuitive workflow.

## 🌟 Key Features

1. **AI Document Generator**: Generate professional documents, articles, and drafts from a simple prompt.
2. **Universal File Converter**: Seamlessly convert documents between formats (e.g., Markdown ↔ HTML, DOCX ↔ HTML, DOCX ➝ PDF, TXT ➝ PDF) entirely locally without heavy system dependencies.
3. **Rich Document Editor**: A TipTap-based WYSIWYG editor to manually refine and format your documents.
4. **AI Document Assistant**: Highlight or paste text to instantly summarize, rewrite, fix grammar, translate, or generate flashcards/interview questions.

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, React Router, CSS Modules (Custom Design System with CSS Variables, No Tailwind), Framer Motion, TipTap.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT Authentication.
- **AI Integration**: Google Gemini API (`@google/genai`).
- **File Conversion**: `pdfkit`, `mammoth`, `html-docx-js`, `markdown-it`, `turndown`.

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or a MongoDB Atlas URI)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

## 🚀 Installation & Setup

1. **Clone or Download the Repository**
   Navigate to the root directory of the project in your terminal.

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file inside the `server` directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/docverse-ai
   JWT_SECRET=your_super_secret_jwt_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
  
3. **Frontend Setup**
   Open a new terminal window/tab:
   ```bash
   cd client
   npm install
   ```

##  Running the Application

You will need two terminal windows open to run the full stack application.

**1. Start the Backend Server:**
```bash
cd server
npm run dev
```
*(The server will start on `http://localhost:5000`)*

**2. Start the Frontend Client:**
```bash
cd client
npm run dev
```
*(The client will usually start on `http://localhost:5173`. Open this link in your browser!)*

## 📂 Project Structure

```
DOCVERSE AI/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components (Sidebar, ProtectedRoute)
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── pages/          # Application Pages (Dashboard, Editor, Converter, etc.)
│   │   ├── services/       # Axios API integration
│   │   ├── App.jsx         # Main Router
│   │   └── index.css       # Global Design System & Variables
│   └── package.json
└── server/                 # Node.js/Express Backend
    ├── config/             # Database connection setup
    ├── controllers/        # Route logic (AI, Auth, Converter, Documents)
    ├── middleware/         # JWT Auth & Multer Upload middlewares
    ├── models/             # Mongoose Schemas (User, Document, History)
    ├── routes/             # Express API Routes
    ├── services/           # External service integration (Gemini, Conversion engines)
    ├── uploads/            # Temporary storage for uploaded files
    ├── exports/            # Storage for converted files ready for download
    ├── server.js           # Main Express application entry point
    └── package.json
```

