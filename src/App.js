import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import Events from "./Events";
import DigitalLibrary from "./DigitalLibrary";

import Services from "./Services";
import Books from "./Books";

import { LibraryProvider, useLibrary } from "./LibraryContext";

const Navbar = () => {
  const { darkMode, setDarkMode } = useLibrary();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center gap-2">

            <div>
              <h1 className="font-bold text-xl text-slate-900 dark:text-white">
                SmartLib
              </h1>
              <p className="text-xs text-slate-500">
                Library Management
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/books">Book Catalog</Link>
            <Link className="nav-link" to="/digital-library">
              Digital Library
            </Link>
            <Link className="nav-link" to="/services">Services</Link>
            <Link className="nav-link" to="/events">Events</Link>
          </div>

          <div className="flex items-center gap-3">

            

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const AppContent = () => {
  const { darkMode } = useLibrary();

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/digital-library" element={<DigitalLibrary />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />
        </Routes>

        <footer className="bg-slate-950 text-white mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

            <div>
              <h2 className="text-xl font-bold mb-3">SmartLib</h2>
              <p className="text-slate-400">
                Your modern digital library for knowledge, research and
                lifelong learning.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Library</h3>
              <div className="space-y-2 text-slate-400">
                <Link to="/books" className="block hover:text-white">
                  Books
                </Link>
                <Link to="/digital-library" className="block hover:text-white">
                  Digital Library
                </Link>
                <Link to="/services" className="block hover:text-white">
                  Services
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Programs</h3>
              <Link
                to="/events"
                className="text-slate-400 hover:text-white"
              >
                Events
              </Link>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-slate-400">support@smartlib.com</p>
              <p className="text-slate-400">+91 98765 43210</p>
            </div>
          </div>

          <div className="border-t border-slate-800 text-center py-5 text-slate-500">
            © 2026 SmartLib. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LibraryProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LibraryProvider>
  );
}