# 📚 Online Library Management System

### Discover Books. Explore Knowledge. Learn Without Limits.

An interactive React-based Online Library Management System designed to help users explore books, discover digital resources, view book details, and explore library services and events through a user-friendly interface.

🔗 **GitHub Repository:** [React_Project](https://github.com/Ishwaryabose3105/React_Project)

---

## 📖 About the Project

The Online Library Management System is a frontend web application developed using React.js. It provides a simple and interactive platform for exploring books and digital library resources.

The project focuses on reusable React components, responsive design, page navigation, and API integration to create a smooth user experience.

### Users can:

- Explore the home page and library information
- Browse and discover books
- Search for books using book information APIs
- View individual book details
- Explore the digital library
- Discover library services
- View library events
- Navigate between pages using React Router
- Access a responsive and user-friendly interface

---

## ✨ Features

### 🏠 Home Page
- Attractive landing page
- Easy navigation to different sections
- User-friendly interface

### 📚 Books
- Browse available books
- Discover books using the Google Books API
- Explore book information

### 📖 Book Details
- View detailed information about selected books
- Display book information retrieved through the API

### 💻 Digital Library
- Explore digital reading resources
- Discover books and learning materials

### 🛎️ Library Services
- Explore the services offered by the library
- Access service information through a dedicated page

### 🎉 Events
- Explore library events and activities
- Register for events, where supported by the application

### 📱 Responsive Design
- Clean and organized layout
- Responsive styling for different screen sizes
- Simple navigation between application pages

---

## 📸 Project Screenshots

Here are five screenshots showcasing the application's interface.

> Create a folder named `screenshots` in your project root and add your five screenshots using the filenames below. Replace the filenames if your screenshots have different names.

### 1. Home Page
<img width="1920" height="1080" alt="Screenshot 2026-10-15 112829" src="https://github.com/user-attachments/assets/c6ca14b1-7e2a-446a-a4df-ac24d9a97273" />

### 2. Books Page
<img width="1920" height="1080" alt="Screenshot 2026-10-15 112850" src="https://github.com/user-attachments/assets/88fbb3a0-0b82-4b77-b82d-0df2dce3bdf3" />

### 3. Book Details Page
<img width="1920" height="1080" alt="Screenshot 2026-10-15 112904" src="https://github.com/user-attachments/assets/fac9935f-1d58-4fa2-96f8-5ece68fa8a7e" />

### 4. Digital Library
<img width="1920" height="1080" alt="Screenshot 2026-10-15 112923" src="https://github.com/user-attachments/assets/2046b596-f492-4524-911e-fce2de2242a8" />

### 5. Services and Events
<img width="1920" height="1080" alt="Screenshot 2026-10-15 112930" src="https://github.com/user-attachments/assets/e322ed2f-2d63-45e4-94e3-3ab76d546ebe" />

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Building the user interface |
| JavaScript | Application logic and interactivity |
| HTML5 | Web page structure |
| CSS3 | Styling and layout |
| Tailwind CSS | Responsive utility-based styling |
| React Router DOM | Navigation and page routing |
| Google Books API | Retrieving book information |
| React Hooks | Managing state and component effects |
| LocalStorage | Storing supported browser-side data |
| Git | Version control |
| GitHub | Source code hosting |
| Netlify | Deployment, if configured |

---

## 📁 Project Structure

```text
React_Project/
│
├── public/
│
├── screenshots/
│   ├── home.png
│   ├── books.png
│   ├── book-details.png
│   ├── digital-library.png
│   └── services-events.png
│
├── src/
│   ├── component/
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Books.js
│   │   ├── BookDetails.js
│   │   ├── DigitalLibrary.js
│   │   ├── Events.js
│   │   └── Services.js
│   │
│   ├── LibraryContext.js
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   └── index.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

*Note: This is a representative structure. Keep the actual folders and filenames from your repository.*

---

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Ishwaryabose3105/React_Project.git
```

### 2. Navigate to the project folder

```bash
cd React_Project
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the API key

If your application uses a Google Books API key, create a `.env` file in the project root and add:

```env
REACT_APP_GOOGLE_BOOKS_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY
```

Replace the placeholder with your own API key, and ensure your code reads the same environment variable.

**Important:** Do not upload `.env` to GitHub. Add `.env` to `.gitignore`.

If you change environment variables, restart the development server.

### 5. Start the application

```bash
npm start
```

Open the local development URL:

```text
http://localhost:3000
```

---

## 🌐 Deployment

The project can be deployed using Netlify.

For a Create React App project, use these settings:

- **Build command:** `npm run build`
- **Publish directory:** `build`

If the application uses React Router, configure a single-page application redirect when required.

Create `public/_redirects` with:

```text
/*    /index.html   200
```

Configure any required environment variables in Netlify before building the deployed application.

---

## 🧭 Application Navigation

```text
Home
  |
  ├── Books
  |     └── Book Details
  |
  ├── Digital Library
  |
  ├── Services
  |
  └── Events
```

---

## 🎯 Learning Outcomes

Through this project, I gained practical experience with:

- Developing reusable React components
- Using React Hooks for state and effects
- Implementing navigation with React Router DOM
- Integrating an external API
- Building responsive user interfaces with Tailwind CSS
- Managing browser-side data where required
- Organizing a React application into reusable pages and components
- Using GitHub for source code management

---

## 🔮 Future Enhancements

- User authentication and profile management
- Backend and database integration
- Book borrowing and return management
- Advanced search and category filters
- Book reviews and ratings
- Improved digital reading features
- Admin dashboard for library management

---

## 👩‍💻 Developer

**Ishwarya Bose**

GitHub: [Ishwaryabose3105](https://github.com/Ishwaryabose3105)

---

## ⭐ Support

If you find this project interesting, consider starring the repository on GitHub.

**Discover Books. Explore Knowledge. Build a Better Reading Experience. 📚**
