import React, { useEffect, useState } from "react";

const upcomingEvents = [
  {
    title: "Book Club Meetup",
    date: "October 5, 2026",
    time: "3:00 PM",
    type: "Community",
  },
  {
    title: "Digital Research Workshop",
    date: "October 10, 2026",
    time: "10:00 AM",
    type: "Workshop",
  },
  {
    title: "Creative Writing Workshop",
    date: "October 24, 2026",
    time: "2:00 PM",
    type: "Workshop",
  },
  {
    title: "Student Orientation",
    date: "November 2, 2026",
    time: "11:00 AM",
    type: "Orientation",
  },
];

const STORAGE_KEY = "eventRegistrations";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  event: "",
};

const Events = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [registrations, setRegistrations] = useState([]);

  // ID of the user currently being edited
  const [editingId, setEditingId] = useState(null);

  // ======================================
  // LOAD USERS FROM LOCAL STORAGE
  // ======================================
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem(STORAGE_KEY);

      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);

        if (Array.isArray(parsedUsers)) {
          setRegistrations(parsedUsers);
        }
      }
    } catch (error) {
      console.error("Error loading registrations:", error);
      setRegistrations([]);
    }
  }, []);

  // ======================================
  // SAVE USERS TO LOCAL STORAGE
  // ======================================
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(registrations)
      );
    } catch (error) {
      console.error("Error saving registrations:", error);
    }
  }, [registrations]);

  // ======================================
  // VALIDATE FORM
  // ======================================
  const validateForm = () => {
    const newErrors = {};

    const nameRegex = /^[A-Za-z ]{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name =
        "Name must contain only letters and spaces (3-50 characters)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number";
    }

    if (!formData.event) {
      newErrors.event = "Please select an event";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ======================================
  // HANDLE INPUT
  // ======================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ======================================
  // REGISTER OR UPDATE USER
  // ======================================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const selectedEvent = upcomingEvents.find(
      (event) => event.title === formData.event
    );

    if (!selectedEvent) {
      return;
    }

    // ==================================
    // UPDATE EXISTING REGISTRATION
    // ==================================
    if (editingId !== null) {
      setRegistrations((prev) =>
        prev.map((registration) => {
          if (registration.id !== editingId) {
            return registration;
          }

          return {
            ...registration,
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            event: selectedEvent.title,
            date: selectedEvent.date,
            time: selectedEvent.time,
            type: selectedEvent.type,
            updatedAt: new Date().toISOString(),
          };
        })
      );

      setFormData(emptyForm);
      setErrors({});
      setEditingId(null);

      alert("Registration updated successfully!");

      return;
    }

    // ==================================
    // CREATE NEW REGISTRATION
    // ==================================
    const newRegistration = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      event: selectedEvent.title,
      date: selectedEvent.date,
      time: selectedEvent.time,
      type: selectedEvent.type,
      registeredAt: new Date().toISOString(),
    };

    setRegistrations((prev) => [
      ...prev,
      newRegistration,
    ]);

    setFormData(emptyForm);
    setErrors({});

    alert("Registration successful!");
  };

  // ======================================
  // EDIT USER
  // ======================================
  const editRegistration = (registration) => {
    setFormData({
      name: registration.name,
      email: registration.email,
      phone: registration.phone,
      event: registration.event,
    });

    setEditingId(registration.id);
    setErrors({});

    // Scroll to registration form
    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };

  // ======================================
  // CANCEL EDIT
  // ======================================
  const cancelEdit = () => {
    setFormData(emptyForm);
    setErrors({});
    setEditingId(null);
  };

  // ======================================
  // DELETE USER
  // ======================================
  const removeRegistration = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this registration?"
    );

    if (!confirmDelete) {
      return;
    }

    setRegistrations((prev) =>
      prev.filter(
        (registration) => registration.id !== id
      )
    );

    // If deleting the user currently being edited
    if (editingId === id) {
      cancelEdit();
    }
  };

  return (
    <main>

      {/* ======================================
          HERO SECTION
      ====================================== */}
      <section className="bg-indigo-200 text-black">
        <div className="max-w-7xl mx-auto px-6 py-20">

          <p className="text-black font-semibold">
            SMARTLIB PROGRAMS
          </p>

          <h1 className="text-5xl font-bold mt-3">
            Library Events & Programs
          </h1>

          <p className="mt-5 text-bla max-w-2xl">
            Learn, connect and discover through our workshops,
            competitions, reading programs and community events.
          </p>

        </div>
      </section>

      {/* ======================================
          REGISTRATION FORM
      ====================================== */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-12">

          <h2 className="text-3xl font-bold">
            {editingId !== null
              ? "Edit Registration"
              : "Event Registration"}
          </h2>

          <p className="text-slate-500 mt-2">
            {editingId !== null
              ? "Update the registered user's details."
              : "Enter your details to register for an event."}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* NAME */}
            <div>
              <label className="block font-semibold mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name
                    ? "border-red-500"
                    : "border-slate-300"
                } dark:bg-slate-800`}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email
                    ? "border-red-500"
                    : "border-slate-300"
                } dark:bg-slate-800`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="block font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                maxLength="10"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.phone
                    ? "border-red-500"
                    : "border-slate-300"
                } dark:bg-slate-800`}
              />

              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* EVENT */}
            <div>
              <label className="block font-semibold mb-2">
                Select Event
              </label>

              <select
                name="event"
                value={formData.event}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.event
                    ? "border-red-500"
                    : "border-slate-300"
                } dark:bg-slate-800`}
              >
                <option value="">
                  Select an event
                </option>

                {upcomingEvents.map((event) => (
                  <option
                    key={event.title}
                    value={event.title}
                  >
                    {event.title}
                  </option>
                ))}
              </select>

              {errors.event && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.event}
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <button
                type="submit"
                className="flex-1 bg-indigo-300 hover:bg-indigo-400 text-black py-3 rounded-xl font-semibold"
              >
                {editingId !== null
                  ? "Update Registration"
                  : "Register Now"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-xl font-semibold"
                >
                  Cancel
                </button>
              )}

            </div>
          </form>
        </div>
      </section>

      {/* ======================================
          REGISTERED USERS
      ====================================== */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold">
          Registered Users
        </h2>

        {registrations.length === 0 ? (
          <p className="text-slate-500 mt-6">
            No registrations yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            {registrations.map((registration) => (
              <div
                key={registration.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow"
              >

                <h3 className="text-xl font-bold">
                  {registration.name}
                </h3>

                <p className="text-slate-500 mt-2">
                  📧 {registration.email}
                </p>

                <p className="text-slate-500">
                  📱 {registration.phone}
                </p>

                <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">

                  <p className="font-semibold">
                    {registration.event}
                  </p>

                  <p className="text-sm text-slate-500">
                    {registration.date}
                  </p>

                  <p className="text-sm text-slate-500">
                    {registration.time}
                  </p>

                  <p className="text-sm text-indigo-600 mt-1">
                    {registration.type}
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    Registered:{" "}
                    {new Date(
                      registration.registeredAt
                    ).toLocaleString()}
                  </p>

                  {registration.updatedAt && (
                    <p className="text-xs text-slate-400 mt-1">
                      Updated:{" "}
                      {new Date(
                        registration.updatedAt
                      ).toLocaleString()}
                    </p>
                  )}

                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 mt-5">

                  <button
                    type="button"
                    onClick={() =>
                      editRegistration(registration)
                    }
                    className="flex-1 px-4 py-2 bg-indigo-100 hover:bg-indigo-300 text-black rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removeRegistration(registration.id)
                    }
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}
      </section>

    </main>
  );
};

export default Events;