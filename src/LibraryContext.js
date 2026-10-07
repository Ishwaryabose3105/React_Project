import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LibraryContext = createContext(null);


// ===============================
// LIBRARY PROVIDER
// ===============================
export const LibraryProvider = ({ children }) => {

  // ===============================
  // WISHLIST
  // ===============================
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("libraryWishlist");

      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error loading wishlist:", error);
      return [];
    }
  });


  // ===============================
  // BORROWED BOOKS
  // ===============================
  const [borrowedBooks, setBorrowedBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem("borrowedBooks");

      return savedBooks ? JSON.parse(savedBooks) : [];
    } catch (error) {
      console.error("Error loading borrowed books:", error);
      return [];
    }
  });


  // ===============================
  // DARK MODE
  // ===============================
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch (error) {
      console.error("Error loading dark mode:", error);
      return false;
    }
  });


  // ===============================
  // SAVE WISHLIST
  // ===============================
  useEffect(() => {
    try {
      localStorage.setItem(
        "libraryWishlist",
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  }, [wishlist]);


  // ==============================  // SAVE BORROWED BOOKS
  // ===============================
  useEffect(() => {
    try {
      localStorage.setItem(
        "borrowedBooks",
        JSON.stringify(borrowedBooks)
      );
    } catch (error) {
      console.error("Error saving borrowed books:", error);
    }
  }, [borrowedBooks]);


  // ===============================
  // SAVE DARK MODE
  // ===============================
  useEffect(() => {
    try {
      localStorage.setItem("darkMode", String(darkMode));

      // Apply dark mode to the whole application
      document.documentElement.classList.toggle(
        "dark",
        darkMode
      );
    } catch (error) {
      console.error("Error saving dark mode:", error);
    }
  }, [darkMode]);


  // ===============================
  // ADD TO WISHLIST
  // ===============================
  const addToWishlist = (book) => {
    setWishlist((prev) => {

      // Prevent duplicate books
      if (prev.some((item) => item.id === book.id)) {
        return prev;
      }

      return [...prev, book];
    });
  };


  // ===============================
  // REMOVE FROM WISHLIST
  // ===============================
  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((book) => book.id !== id)
    );
  };


  // ===============================
  // BORROW BOOK
  // ===============================
  const borrowBook = (book) => {
    setBorrowedBooks((prev) => {

      // Prevent duplicate borrowed books
      if (prev.some((item) => item.id === book.id)) {
        return prev;
      }

      return [...prev, book];
    });
  };


  // ===============================
  // RETURN BOOK
  // ===============================
  const returnBook = (id) => {
    setBorrowedBooks((prev) =>
      prev.filter((book) => book.id !== id)
    );
  };


  // ===============================
  // CONTEXT
  // ===============================
  return (
    <LibraryContext.Provider
      value={{
        // Wishlist
        wishlist,
        addToWishlist,
        removeFromWishlist,

        // Borrowed books
        borrowedBooks,
        borrowBook,
        returnBook,

        // Dark mode
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};


// ===============================
// USE LIBRARY HOOK
// ===============================
export const useLibrary = () => {
  const context = useContext(LibraryContext);

  if (!context) {
    throw new Error(
      "useLibrary must be used inside LibraryProvider"
    );
  }

  return context;
};