import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://openlibrary.org/search.json?q=programming&limit=4"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();

        const books = data.docs.slice(0, 4).map((book) => ({
          id:
            book.key?.replace("/works/", "") ||
            book.cover_edition_key ||
            Math.random(),
          title: book.title,
          author: book.author_name?.[0] || "Unknown Author",
          category: "Programming",
          rating: book.ratings_average
            ? book.ratings_average.toFixed(1)
            : "N/A",
          image: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "https://via.placeholder.com/300x400?text=No+Cover",
        }));

        setFeaturedBooks(books);
      } catch (err) {
        console.error(err);
        setError("Unable to load featured books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <main>
      {/* ===============================
          HERO
      =============================== */}
      <section className="bg-indigo-200 text-black">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <span className="inline-block bg-indigo-100 px-4 py-2 rounded-full mb-5">
              📚 Smart Digital Library
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Discover a World of Knowledge
            </h1>

            <p className="mt-6 text-lg text-black max-w-xl">
              Explore thousands of books, digital resources, research
              materials and learning opportunities designed for curious minds.
            </p>

            {/* HERO BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-8">
              {/* Explore Books → book.js */}
              <Link
                to="/books"
                className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition"
              >
                Explore Books →
              </Link>

              
            </div>

            <p className="mt-8 text-indigo-200">
              Your knowledge journey starts here.
            </p>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="w-80 h-80 rounded-full bg-white/50 flex items-center justify-center">
              <div className="text-[130px]">📚</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===============================
          STATS
      =============================== */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
          {[
            ["12,500+", "Books Available"],
            ["5,000+", "Registered Members"],
            ["2,500+", "Digital Resources"],
            ["30+", "Book Categories"],
          ].map(([number, label]) => (
            <div key={label} className="p-7 text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {number}
              </div>

              <div className="text-slate-500 mt-2">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          FEATURED BOOKS
      =============================== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-indigo-600 font-semibold">DISCOVER</p>

            <h2 className="text-3xl font-bold mt-1">Featured Books</h2>
          </div>

          {/* View All → book.js */}
          <Link
            to="/books"
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
          >
            View All →
          </Link>
        </div>

        {/* ===============================
            LOADING
        =============================== */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow animate-pulse"
              >
                <div className="w-full h-64 bg-slate-200 dark:bg-slate-700" />

                <div className="p-5">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20" />

                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded mt-4" />

                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mt-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===============================
            ERROR
        =============================== */}
        {error && (
          <div className="text-center py-10 text-red-500">{error}</div>
        )}

        {/* ===============================
            BOOKS
        =============================== */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="book-card bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x400?text=No+Cover";
                  }}
                />

                <div className="p-5">
                  <span className="text-xs text-indigo-600 font-semibold">
                    {book.category}
                  </span>

                  <h3 className="font-bold text-lg mt-2 line-clamp-2">
                    {book.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {book.author}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span>⭐ {book.rating}</span>

                    {/* Optional book details */}
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===============================
          WHY SMARTLIB
      =============================== */}
      <section className="bg-slate-100 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-semibold">WHY SMARTLIB</p>

            <h2 className="text-3xl font-bold mt-2">
              Everything You Need to Learn
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              ["📚", "Extensive Collection"],
              ["🔎", "Smart Search"],
              ["🌐", "Anytime Access"],
              ["⚡", "Easy Reservation"],
            ].map(([icon, title]) => (
              <div
                key={title}
                className="bg-white dark:bg-slate-800 p-7 rounded-2xl text-center"
              >
                <div className="text-4xl">{icon}</div>

                <h3 className="font-bold mt-4">{title}</h3>

                <p className="text-slate-500 mt-2 text-sm">
                  Powerful tools to make your library experience simple.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================
          EVENTS
      =============================== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Author Meet & Greet", "Oct 5, 2026"],
            ["Research & Innovation Workshop", "Oct 10, 2026"],
            ["Reading Challenge 2026", "Oct 18, 2026"],
          ].map(([title, date]) => (
            <div
              key={title}
              className="border border-slate-200 dark:border-slate-700 p-6 rounded-2xl"
            >
              <span className="text-indigo-600 font-semibold">{date}</span>

              <h3 className="text-xl font-bold mt-3">{title}</h3>

              <p className="text-slate-500 mt-2">
                Join our library community and discover something new.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          CTA
      =============================== */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-3xl bg-indigo-200 text-black p-12 text-center">
          <h2 className="text-4xl font-bold">
            Ready to Discover Something New?
          </h2>

          <p className="mt-4 text-black">
            Explore our collection and start your next learning journey.
          </p>

          {/* Explore Collection → book.js */}
          <Link
            to="/books"
            className="inline-block mt-7 bg-white text-indigo-700 px-7 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            Explore Collection
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;