import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: "📚",
    title: "Book Borrowing",
    description:
      "Borrow physical books with an easy and transparent circulation system.",
  },
  {
    icon: "🔖",
    title: "Book Reservation",
    description:
      "Reserve books that are currently unavailable and join the reservation queue.",
  },
  {
    icon: "🌐",
    title: "Digital Library",
    description:
      "Access digital resources and learning materials from anywhere.",
  },
  {
    icon: "🔄",
    title: "Book Renewal",
    description:
      "Renew eligible borrowed books without visiting the library counter.",
  },
  {
    icon: "🔔",
    title: "Smart Notifications",
    description:
      "Receive reminders for due dates, reservations and new resources.",
  },
  {
    icon: "🔬",
    title: "Research Assistance",
    description:
      "Get professional support for academic and research activities.",
  },
  {
    icon: "📖",
    title: "Reading Programs",
    description:
      "Join reading challenges, book clubs and knowledge programs.",
  },
  {
    icon: "👤",
    title: "Membership Services",
    description:
      "Manage your library account, borrowing history and preferences.",
  },
];

const Services = () => {
  return (
    <main>

      <section className="bg-indigo-200 text-black">
        <div className="max-w-7xl mx-auto px-6 py-20">

          <p className="text-black font-semibold">
            SMARTLIB SERVICES
          </p>

          <h1 className="text-5xl font-bold mt-3">
            Library Services
          </h1>

          <p className="max-w-2xl mt-5 text-black text-black">
            Everything you need for a smarter, faster and more enjoyable
            library experience.
          </p>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white dark:bg-slate-900 p-7 rounded-2xl shadow hover:-translate-y-2 transition duration-300"
            >

              <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-3xl">
                {service.icon}
              </div>

              <h2 className="text-xl font-bold mt-6">
                {service.title}
              </h2>

              <p className="text-slate-500 mt-3 leading-6">
                {service.description}
              </p>


            </div>
          ))}

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="rounded-3xl bg-indigo-200 text-black p-12 text-center">

          <h2 className="text-4xl font-bold">
            Make Your Library Experience Smarter
          </h2>

          <p className="text-black mt-4">
            Manage your books, reservations and digital resources from one
            convenient platform.
          </p>

          <Link
            to="/books"
            className="inline-block mt-7 bg-white text-indigo-700 px-7 py-3 rounded-xl font-semibold"
          >
            Go to My Dashboard
          </Link>

        </div>

      </section>

    </main>
  );
};

export default Services;