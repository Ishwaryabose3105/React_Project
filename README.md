# SmartLib — Library Management System

**Discover. Read. Learn. Manage.**

A production-style library management platform built with **React 18 + JavaScript + Tailwind CSS**, using a standard
Create React App structure. It ships with a public catalog site, a member dashboard and a staff/admin console, all
running on bundled demo data so it works with zero configuration.

---

## Quick start

```bash
npm install
npm start
```

The app opens at <http://localhost:3000>.

> This project uses Create React App. There is **no** `npm run dev` script and **no** Vite/Next.js/TypeScript.

Other scripts:

```bash
npm run build   # production bundle in ./build
npm test        # Jest / React Scripts test runner
```

Requires Node.js 16 or newer.

---

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Member | `alex@smartlib.example` | `password123` |
| Administrator | `admin@smartlib.example` | `admin123` |

Both buttons are also available directly on the login page. Signing in as the administrator unlocks `/admin`.

---

## What's included

**Public site** — Home (hero, animated statistics, featured/popular/recent books, services, events, testimonials, CTA),
About (story, mission, vision, facilities, animated timeline), Digital Library, Book catalog, Book details, Services,
Events, Contact (validated form + FAQ accordion), Login, Register and a 404 page.

**Member dashboard** (`/dashboard`) — activity overview, books on loan with renew/return, reservations with live queue
position, wishlist, reading history, notification centre, fines with a worked calculation, profile and settings.

**Staff console** (`/admin`) — dashboard, full book CRUD (modal forms, delete confirmation, search/filter/sort/pagination),
member management with borrowing history, issue & return circulation desk, reservation queues, categories, fines,
reports with charts, events CRUD, announcements and circulation policy settings.

### Core behaviours

- **Search, filter, sort, pagination** across the catalog and admin tables, with debounced input and URL-synced filters.
- **Fine calculation** via the reusable `calculateFine()` utility in `src/utils/helpers.js`. The rate, cap, loan period,
  borrowing limit, renewals and grace period are all configurable at `/admin/settings`.
  Example: due 15 September, returned 20 September → 5 days overdue × ₹10 = **₹50**.
- **Reservation queue** — reserving an unavailable title assigns a queue position; returning a copy promotes the next
  member to "ready for pickup" and raises a notification automatically.
- **Notifications** with a live unread count in the navbar dropdown.
- **Toasts** for every action (reserve, wishlist, return, profile update, errors).
- **Dark mode** with the choice persisted in `localStorage`.
- **Loading, empty, error and retry states** everywhere — skeleton cards and tables while data loads, and a retry button
  if a request fails. The UI never goes blank because of a failed request.
- **Protected routes** for the member area and **role-based routes** (`admin`, `librarian`) for the staff console.
- **Responsive** from 320px to 1440px+, with no horizontal overflow. Wide tables scroll inside their own container.
- **Accessible** — semantic landmarks, labelled form fields, visible focus states, ARIA attributes on dialogs, tabs and
  menus, keyboard-friendly navigation, a skip link and alt text on every image.

---

## Project structure

```text
library-management-system/
├── public/
│   ├── index.html
│   ├── favicon.svg
│   ├── manifest.json
│   └── assets/
├── src/
│   ├── components/
│   │   ├── books/     BookCard, BookGrid, SearchBar, FilterPanel, ReviewCard
│   │   ├── charts/    BarChart, LineChart, DonutChart (dependency-free SVG)
│   │   ├── common/    CoverImage, Reveal, SectionHeading, ServiceCard, EventCard, …
│   │   ├── layout/    Navbar, Footer, Sidebar, Logo, NotificationDropdown, ScrollToTop
│   │   └── ui/        Button, Input, Badge, Modal, ConfirmDialog, Toast, Loader,
│   │                  Skeleton, EmptyState, ErrorState, Pagination, Rating, StatCard,
│   │                  Tooltip, Breadcrumbs, Avatar
│   ├── context/       AuthContext, LibraryContext, NotificationContext, ThemeContext, ToastContext
│   ├── data/          books, users, events, categories, notifications, digitalResources, circulation
│   ├── hooks/         useAuth, useFetch, useDebounce, useLocalStorage, useTheme, useLibrary,
│   │                  useToast, useInView, useCountUp, useOnClickOutside, useMediaQuery
│   ├── layouts/       PublicLayout, DashboardLayout, AdminLayout, ProtectedRoute
│   ├── pages/         public pages + pages/dashboard/* + pages/admin/*
│   ├── services/      api.js
│   ├── utils/         constants.js, helpers.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── README.md
```

---

## React concepts used

`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`, `useRef`, `useId`, custom hooks, props, the Context API,
controlled forms, conditional rendering and reusable components. Effects use correct dependency arrays and abortable
requests, so there are no infinite loops or state updates after unmount.

---

## API layer and environment variables

All data access goes through `src/services/api.js` — components never call `fetch` directly.

```js
getBooks()        getBookById(id)     searchBooks(query)
getCategories()   getPopularBooks()   getRecentBooks()
getFeaturedBooks() getRelatedBooks()  getReviews(bookId)
getEvents()       getDigitalResources() getMembers()
getNotifications() getLibraryStats()  sendContactMessage(payload)
```

**Out of the box** the service resolves from the bundled demo data, so the app runs with no backend and no keys.

**To point it at a real API**, copy `.env.example` to `.env` and fill it in:

```bash
cp .env.example .env
```

```text
REACT_APP_API_KEY=your_api_key_here
REACT_APP_API_BASE_URL=your_api_url_here
```

When `REACT_APP_API_BASE_URL` is set, the same functions issue real `fetch` requests with a timeout, an abort signal and
typed `ApiError` handling, sending `REACT_APP_API_KEY` as a bearer token. Read via `process.env.REACT_APP_*` only.

> No real key is included anywhere in this repository, and none is invented. `.env` is listed in `.gitignore` and must
> never be committed. Remember that anything prefixed `REACT_APP_` is bundled into the client, so only ever use
> publishable keys in a front-end app.

---

## Data persistence

This is a front-end demo: the catalog, loans, reservations, wishlist, notifications, theme and session are stored in
`localStorage` through the `useLocalStorage()` hook, so your changes survive a refresh. To start over, use
**Settings → Reset demo data** in the member dashboard, or clear the `smartlib.*` keys in your browser's storage.

---

## Images

Book covers and event images load from `picsum.photos`. If an image fails, `CoverImage` renders a generated gradient
cover with the title and author instead, so a broken image never appears. Avatars are drawn from initials and make no
network request. All covers keep a consistent 2:3 aspect ratio.

---

## License

Provided as a demonstration project. Sample books, members, reviews and events are fictional.
