import React, { useState } from "react";

const API_KEY = process.env.REACT_APP_BOOK_API_KEY;

const DigitalLibrary = () => {
  const [search, setSearch] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    ["📚", "E-Books"],
    ["📄", "Research Papers"],
    ["📰", "Digital Journals"],
    ["🎧", "Audiobooks"],
    ["📖", "Study Materials"],
    ["🗞️", "Digital Magazines"],
  ];

  const popular = [
    {
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen et al.",
      category: "Computer Science",
      type: "E-Book",
    },
    {
      title: "The Science of Everyday Life",
      author: "Science Collection",
      category: "Science",
      type: "Digital Book",
    },
    {
      title: "Modern Web Development",
      author: "Technology Collection",
      category: "Technology",
      type: "E-Book",
    },
  ];

  // Fetch books from Google Books API
  const searchDigitalLibrary = async (query) => {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      setResources([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (!API_KEY) {
        throw new Error(
          "API key not found. Please add REACT_APP_BOOK_API_KEY to your .env file."
        );
      }

      const url =
        `https://www.googleapis.com/books/v1/volumes` +
        `?q=${encodeURIComponent(cleanQuery)}` +
        `&maxResults=12` +
        `&printType=books` +
        `&key=${API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.error?.message ||
            `API request failed: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(
          data.error.message || "Google Books API error"
        );
      }

      setResources(data.items || []);

      if (!data.items || data.items.length === 0) {
        setError("");
      }
    } catch (err) {
      console.error("Google Books API error:", err);

      setResources([]);
      setError(
        err.message || "Unable to fetch digital resources."
      );
    } finally {
      setLoading(false);
    }
  };

  // Search when Enter is pressed
  const handleSearch = (e) => {
    e.preventDefault();
    searchDigitalLibrary(search);
  };

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="bg-indigo-200 text-black">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="text-black font-semibold">
            SMARTLIB DIGITAL
          </p>

          <h1 className="text-5xl font-bold mt-3">
            Digital Library
          </h1>

          <p className="max-w-2xl mt-5 text-black">
            Access digital books, research materials and
            learning resources from anywhere.
          </p>

          {/* SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="max-w-3xl mt-8"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books, authors, subjects..."
                className="flex-1 px-6 py-4 rounded-xl text-slate-900 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="px-7 py-4 bg-white text-black font-bold rounded-xl hover:bg-indigo-300 transition disabled:opacity-60"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            <p className="text-sm text-indigo-700 mt-3">
              Type your search and press Enter
            </p>
          </form>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold">
          Explore Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-8">
          {categories.map(([icon, title]) => (
            <button
              key={title}
              type="button"
              onClick={() => {
                setSearch(title);
                searchDigitalLibrary(title);
              }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow hover:-translate-y-1 transition"
            >
              <div className="text-4xl">
                {icon}
              </div>

              <h3 className="font-semibold mt-4">
                {title}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* ================= SEARCH RESULTS ================= */}
      {search && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">
              Search Results
            </h2>

            {!loading && (
              <span className="text-sm text-slate-500">
                {resources.length} results
              </span>
            )}
          </div>

          {/* LOADING */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow animate-pulse"
                >
                  <div className="w-full h-60 bg-slate-200 dark:bg-slate-800 rounded-xl" />

                  <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded mt-4" />

                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded mt-3 w-2/3" />

                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded mt-3 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="mt-8 p-6 rounded-xl bg-red-50 text-red-600">
              <p className="font-semibold">
                Something went wrong
              </p>

              <p className="mt-1">
                {error}
              </p>
            </div>
          )}

          {/* NO RESULTS */}
          {!loading &&
            !error &&
            resources.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                No books found for "{search}".
              </div>
            )}

          {/* BOOKS */}
          {!loading &&
            !error &&
            resources.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {resources.map((item) => {
                  const info = item.volumeInfo || {};

                  const image =
                    info.imageLinks?.thumbnail?.replace(
                      "http://",
                      "https://"
                    ) ||
                    "https://via.placeholder.com/300x400?text=Digital+Book";

                  const authors =
                    info.authors?.join(", ") ||
                    "Unknown Author";

                  const rating =
                    info.averageRating || null;

                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow hover:shadow-xl transition"
                    >
                      {/* COVER */}
                      <img
                        src={image}
                        alt={info.title || "Book"}
                        className="w-full h-60 object-cover rounded-xl"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/300x400?text=Digital+Book";
                        }}
                      />

                      {/* TYPE */}
                      <span className="inline-block mt-4 text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                        {info.printType === "MAGAZINE"
                          ? "Digital Magazine"
                          : "E-Book"}
                      </span>

                      {/* TITLE */}
                      <h3 className="font-bold mt-3 line-clamp-2">
                        {info.title || "Untitled"}
                      </h3>

                      {/* AUTHOR */}
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                        {authors}
                      </p>

                      {/* CATEGORY */}
                      {info.categories?.length > 0 && (
                        <p className="text-sm text-indigo-600 mt-3">
                          {info.categories[0]}
                        </p>
                      )}

                      {/* RATING */}
                      {rating && (
                        <p className="text-sm mt-3">
                          ⭐ {rating}/5
                        </p>
                      )}

                      {/* PUBLISHED */}
                      {info.publishedDate && (
                        <p className="text-xs text-slate-400 mt-2">
                          Published: {info.publishedDate}
                        </p>
                      )}

                      {/* LINKS */}
                      <div className="flex flex-wrap gap-3 mt-5">
                        {info.previewLink && (
                          <a
                            href={info.previewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 font-semibold text-sm"
                          >
                            Preview →
                          </a>
                        )}

                        {info.infoLink && (
                          <a
                            href={info.infoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 font-semibold text-sm"
                          >
                            Details →
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </section>
      )}

      {/* ================= POPULAR ================= */}
      {!search && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="text-3xl font-bold">
            Popular Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {popular.map((resource) => (
              <div
                key={resource.title}
                className="bg-white dark:bg-slate-900 p-7 rounded-2xl shadow"
              >
                <div className="text-5xl">
                  📘
                </div>

                <span className="inline-block mt-5 text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                  {resource.type}
                </span>

                <h3 className="text-xl font-bold mt-4">
                  {resource.title}
                </h3>

                <p className="text-slate-500 mt-2">
                  {resource.author}
                </p>

                <p className="text-sm text-indigo-600 mt-3">
                  {resource.category}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= FEATURES ================= */}
      <section className="bg-slate-100 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center">
            Digital Library Features
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {[
              "Advanced Search",
              "Bookmark Resources",
              "Reading History",
              "Mobile-Friendly Reading",
              "Personal Favorites",
              "New Resource Notifications",
            ].map((feature) => (
              <div
                key={feature}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl"
              >
                <span className="text-indigo-600 text-xl">
                  ✓
                </span>

                <span className="font-semibold ml-3">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DigitalLibrary;
