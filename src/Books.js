import React, { useEffect, useRef, useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const booksSectionRef = useRef(null);

  const fetchBooks = async (searchText = "programming") => {
    setLoading(true);
    setError("");

    try {
      const apiKey = process.env.REACT_APP_BOOK_API_KEY;

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchText
        )}&maxResults=12&key=${apiKey}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "API request failed");
      }

      setBooks(data.items || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      fetchBooks(search.trim());

      // Scroll to books section
      setTimeout(() => {
        booksSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const handleCategoryClick = (category) => {
    // Fetch selected category
    fetchBooks(category);

    // Scroll to books section
    setTimeout(() => {
      booksSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const showDetails = (info) => {
    alert(
      `${info.title || "Unknown Title"}\n\nAuthor: ${
        info.authors ? info.authors.join(", ") : "Unknown"
      }\n\nCategory: ${
        info.categories ? info.categories[0] : "General"
      }\n\nPublished: ${info.publishedDate || "Unknown"}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* HEADER */}
      <header className="bg-indigo-200 px-6 py-10 text-center text-black shadow-lg">
        <h1 className="text-3xl font-bold sm:text-4xl">
          📚 My Library
        </h1>

        <p className="mt-3 text-sm text-black sm:text-base">
          Explore books, search your favourite titles and discover
          something new to read.
        </p>
      </header>

      {/* SEARCH */}
      <section className="px-4 py-8">
        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-2xl overflow-hidden rounded-xl bg-white shadow-md"
        >
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-0 flex-1 px-5 py-4 text-gray-700 outline-none"
          />

          <button
            type="submit"
            className="bg-indigo-200 px-6 py-4 font-semibold text-black transition hover:bg-indigo-300"
          >
            Search
          </button>
        </form>
      </section>

      {/* BOOKS SECTION */}
      <section
        ref={booksSectionRef}
        className="scroll-mt-6 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <h2 className="mb-8 text-2xl font-bold text-gray-800">
          📖 Available Books
        </h2>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-10">
            <p className="text-lg font-semibold text-indigo-500">
              Loading books...
            </p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-center text-red-700">
            {error}
          </div>
        )}

        {/* NO BOOKS */}
        {!loading && !error && books.length === 0 && (
          <p className="py-10 text-center text-gray-500">
            No books found.
          </p>
        )}

        {/* BOOK GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => {
            const info = book.volumeInfo;

            return (
              <div
                key={book.id}
                className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="flex h-72 items-center justify-center bg-gray-200 p-4">
                  <img
                    src={
                      info.imageLinks?.thumbnail ||
                      "https://via.placeholder.com/150x220?text=No+Image"
                    }
                    alt={info.title || "Book"}
                    className="h-full max-w-full object-contain"
                  />
                </div>

                {/* BOOK INFORMATION */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-800">
                    {info.title || "Unknown Title"}
                  </h3>

                  <p className="mb-2 text-sm text-gray-600">
                    <span className="font-bold text-gray-800">
                      Author:
                    </span>{" "}
                    {info.authors
                      ? info.authors.join(", ")
                      : "Unknown"}
                  </p>

                  <p className="mb-5 text-sm text-gray-600">
                    <span className="font-bold text-gray-800">
                      Category:
                    </span>{" "}
                    {info.categories
                      ? info.categories[0]
                      : "General"}
                  </p>

                  <button
                    onClick={() => showDetails(info)}
                    className="mt-auto w-full rounded-lg bg-indigo-400 px-4 py-3 font-semibold text-white transition hover:bg-black"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
            📚 Categories
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {/* PROGRAMMING */}
            <button
              onClick={() => handleCategoryClick("programming")}
              className="rounded-xl bg-purple-100 px-4 py-5 font-semibold text-blue-700 transition hover:bg-purple-600 hover:text-white"
            >
              💻 Programming
            </button>

            {/* FINANCE */}
            <button
              onClick={() => handleCategoryClick("finance")}
              className="rounded-xl bg-green-100 px-4 py-5 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
            >
              💰 Finance
            </button>

            {/* SELF HELP */}
            <button
              onClick={() => handleCategoryClick("self help")}
              className="rounded-xl bg-orange-100 px-4 py-5 font-semibold text-orange-700 transition hover:bg-orange-500 hover:text-white"
            >
              🌱 Self Help
            </button>

            {/* MOTIVATION */}
            <button
              onClick={() => handleCategoryClick("motivation")}
              className="rounded-xl bg-yellow-100 px-4 py-5 font-semibold text-yellow-700 transition hover:bg-yellow-500 hover:text-white"
            >
              ⭐ Motivation
            </button>

            {/* FICTION */}
            <button
              onClick={() => handleCategoryClick("fiction")}
              className="rounded-xl bg-red-100 px-4 py-5 font-semibold text-red-700 transition hover:bg-red-600 hover:text-white"
            >
              📕 Fiction
            </button>

            {/* SCIENCE */}
            <button
              onClick={() => handleCategoryClick("science")}
              className="rounded-xl bg-indigo-100 px-4 py-5 font-semibold text-indigo-700 transition hover:bg-indigo-600 hover:text-white"
            >
              🔬 Science
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          About Our Library
        </h2>

        <p className="leading-7 text-gray-600">
          My Library is a simple online library management system
          created using React. Users can search for books and explore
          different categories using the Google Books API.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 px-4 py-6 text-center text-gray-300">
        <p>© 2026 My Library | Online Library Management System</p>
      </footer>
    </div>
  );
}

export default Books;