import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "./LibraryContext";

const API_KEY = process.env.RREACT_APP_BOOK_API_KEY;

const localBooks = [
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Computer Science",
    rating: 4.8,
    availability: "Available",
    language: "English",
    image:
      "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    rating: 4.9,
    availability: "Available",
    language: "English",
    image:
      "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    id: "psychology-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business",
    rating: 4.7,
    availability: "Currently Issued",
    language: "English",
    image:
      "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
  },
  {
    id: "brief-history-time",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    rating: 4.8,
    availability: "Available",
    language: "English",
    image:
      "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
  },
];

const Books = () => {
  const { addToWishlist } = useLibrary();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState("Most Popular");

  const [books, setBooks] = useState(localBooks);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim().length >= 2) {
        fetchBooks(search);
      } else {
        setBooks(localBooks);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchBooks = async (query) => {
    setLoading(true);

    try {
      const keyPart = API_KEY
        ? `&key=${API_KEY}`
        : "";

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=20${keyPart}`
      );

      const data = await response.json();

      const results = (data.items || []).map((item) => {
        const info = item.volumeInfo || {};

        return {
          id: item.id,
          title: info.title || "Unknown Title",
          author: info.authors?.join(", ") || "Unknown Author",
          category:
            info.categories?.[0] || "General",
          rating: info.averageRating || 4.5,
          availability: "Available",
          language: info.language || "English",
          image:
            info.imageLinks?.thumbnail ||
            "https://via.placeholder.com/300x400?text=No+Cover",
          description:
            info.description || "No description available.",
        };
      });

      setBooks(results);
    } catch (error) {
      console.error("Book API error:", error);
      setBooks(localBooks);
    } finally {
      setLoading(false);
    }
  };

  let filteredBooks = books.filter((book) => {
    const categoryMatch =
      category === "All" ||
      book.category
        .toLowerCase()
        .includes(category.toLowerCase());

    const availabilityMatch =
      availability === "All" ||
      book.availability === availability;

    const languageMatch =
      language === "All" ||
      book.language.toLowerCase() === language.toLowerCase();

    return categoryMatch && availabilityMatch && languageMatch;
  });

  if (sort === "Title A-Z") {
    filteredBooks.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sort === "Highest Rated") {
    filteredBooks.sort((a, b) => b.rating - a.rating);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">

      <div className="mb-10">
        <p className="text-indigo-600 font-semibold">
          BOOK CATALOG
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-2">
          Explore Our Book Collection
        </h1>

        <p className="text-slate-500 mt-4 max-w-2xl">
          Search thousands of books by title, author, ISBN or keyword.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔎 Search title, author, ISBN or keyword..."
          className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="filter-select"
          >
            <option>All</option>
            <option>Computer Science</option>
            <option>Science</option>
            <option>Mathematics</option>
            <option>Business</option>
            <option>Literature</option>
            <option>History</option>
            <option>Self Development</option>
          </select>

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="filter-select"
          >
            <option>All</option>
            <option>Available</option>
            <option>Currently Issued</option>
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="filter-select"
          >
            <option>All</option>
            <option>English</option>
            <option>Tamil</option>
            <option>Hindi</option>
            <option>Other</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="filter-select"
          >
            <option>Most Popular</option>
            <option>Recently Added</option>
            <option>Title A-Z</option>
            <option>Highest Rated</option>
          </select>

        </div>
      </div>

      {loading && (
        <div className="text-center py-10">
          <div className="animate-spin inline-block w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full" />
          <p className="mt-3 text-slate-500">
            Searching books...
          </p>
        </div>
      )}

      {/* Books */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="book-card bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow"
          >

            <img
              src={book.image}
              alt={book.title}
              className="w-full h-72 object-cover"
            />

            <div className="p-5">

              <span className="text-xs text-indigo-600 font-semibold">
                {book.category}
              </span>

              <h2 className="font-bold text-lg mt-2 line-clamp-2">
                {book.title}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {book.author}
              </p>

              <div className="flex justify-between mt-4">
                <span>⭐ {book.rating}</span>

                <span
                  className={
                    book.availability === "Available"
                      ? "text-green-600 text-sm"
                      : "text-orange-600 text-sm"
                  }
                >
                  {book.availability}
                </span>
              </div>

              <div className="flex gap-2 mt-5">

                <Link
                  to={`/books/${book.id}`}
                  state={{ book }}
                  className="flex-1 text-center bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold"
                >
                  Details
                </Link>

                <button
                  onClick={() => addToWishlist(book)}
                  className="px-3 border border-slate-200 dark:border-slate-700 rounded-lg"
                  title="Add to wishlist"
                >
                  ♡
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {filteredBooks.length === 0 && !loading && (
        <div className="text-center py-20">
          <div className="text-6xl">📚</div>
          <h2 className="text-2xl font-bold mt-4">
            No books found
          </h2>
          <p className="text-slate-500 mt-2">
            Try another search or filter.
          </p>
        </div>
      )}

    </main>
  );
};

export default Books;