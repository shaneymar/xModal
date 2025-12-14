import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
  username: "",
  email: "",
  phone: "",
  dob: "",
  });


const modalRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = form;

    
    if (!username) return alert("Please fill out the username field.");
    if (!email) return alert("Please fill out the email field.");
    if (!phone) return alert("Please fill out the phone field.");
    if (!dob) return alert("Please fill out the date of birth field.");

    
    if (!email.includes("@")) {
      return alert("Invalid email. Please check your email address.");
    }

    
    if (!/^\d{10}$/.test(phone)) {
      return alert(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
    }

    
    const selectedDate = new Date(dob);
    const today = new Date();
    if (selectedDate > today) {
      return alert(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
    }

    
    setForm({ username: "", email: "", phone: "", dob: "" });
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div>
      
      <div className="modal">
        <h1>User Details Form</h1><br/>
        {!open && <button onClick={() => setOpen(true)}>Open Form</button>}

        {open && (
          <div className="modal-content" ref={modalRef}>
            <h2>Fill Details</h2>
            <label>Username:</label>
            <form onSubmit={handleSubmit}>
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
        )}
      </div>
    </div>
  );
}

export default App;
