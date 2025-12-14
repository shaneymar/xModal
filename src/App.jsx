import "./App.css";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = form;

    // ✅ Email validation FIRST (Cypress expects this)
    if (email && !email.includes("@")) {
      return alert("Invalid email. Please check your email address.");
    }

    // ✅ Phone validation
    if (phone && !/^\d{10}$/.test(phone)) {
      return alert(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
    }

    // ✅ DOB validation
    if (dob) {
      const selectedDate = new Date(dob);
      const today = new Date();
      if (selectedDate > today) {
        return alert("Invalid date of birth.");
      }
    }

    // ✅ Empty field validation LAST
    if (!username) return alert("Please fill out the username field.");
    if (!email) return alert("Please fill out the email field.");
    if (!phone) return alert("Please fill out the phone field.");
    if (!dob) return alert("Please fill out the date of birth field.");

    // ✅ Success
    setForm({ username: "", email: "", phone: "", dob: "" });
    setOpen(false);
  };

  return (
  <div className="modal">
    <h1>User Details Form</h1>

    {!open && <button onClick={() => setOpen(true)}>Open Form</button>}

    {open && (
      <div className="modal" onClick={() => setOpen(false)}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Fill Details</h2>

          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              id="username"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />

            <label>Email:</label>
            <input
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <label>Phone:</label>
            <input
              id="phone"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />

            <label>Date of Birth:</label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />

            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
);

}

export default App;
