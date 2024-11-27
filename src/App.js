import React, { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import { getSHA256Hash } from './utils/sha256';
import './App.css'; 

const App = () => {
  const [profile, setProfile] = useState({
    email: "",
    fullName: "",
    username: "",
    phone: "",
    location: "",
    website: "",
    bio: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  const [gravatarData, setGravatarData] = useState({});
  const [gravatarUrl, setGravatarUrl] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state
  const [showCard, setShowCard] = useState(false); // Show profile card state

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate email and phone number while updating state
    if (name === "email") {
      validateEmail(value);
    } else if (name === "phone") {
      validatePhone(value);
    }

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email address",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Validates 10 to 15 digits
    if (!phoneRegex.test(phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Invalid phone number (10-15 digits required)",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }
  };

  const fetchGravatar = async (email) => {
    setLoading(true);  // Start loading when fetching data
    setShowCard(false); // Hide ProfileCard while loading

    // Generate SHA-256 hash using the updated function
    const hash = await getSHA256Hash(email.trim().toLowerCase());
    console.log(hash); // Log the hash for debugging

    setGravatarUrl(`https://www.gravatar.com/avatar/${hash}`);

    try {
      const res = await fetch(`https://api.gravatar.com/v3/profiles/${hash}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data); // Log the fetched data for debugging
        setGravatarData(data);  // Set Gravatar data
      } else {
        setGravatarData({});
      }
    } catch (error) {
      console.error("Error fetching Gravatar data:", error);
      setGravatarData({});
    } finally {
      setLoading(false);  // Stop loading once the data is fetched
      setShowCard(true);   // Show profile card after data is received
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure there are no validation errors before submitting
    if (!errors.email && !errors.phone) {
      fetchGravatar(profile.email);  // Fetch Gravatar data on form submission
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Collector</h1>

      {!showCard && !loading && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        >
          {["fullName", "username", "email", "phone", "location", "website", "bio"].map((field) => (
            <div className="mb-4" key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 text-sm font-bold mb-2 capitalize"
              >
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              {field === "bio" ? (
                <textarea
                  id={field}
                  name={field}
                  rows="3"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={profile[field]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={profile[field]}
                  onChange={handleChange}
                  required={field === "email"}
                />
              )}
              {/* Show error messages */}
              {errors[field] && (
                <p className="text-red-500 text-xs italic">{errors[field]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!!errors.email || !!errors.phone} // Disable button if there are errors
          >
            Submit
          </button>
        </form>
      )}

      {/* Show Loading Spinner */}
      {loading && (
        <div className="mt-4 flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
            ></path>
          </svg>
        </div>
      )}

      {/* Show Profile Card after loading */}
      {showCard && !loading && (
        <ProfileCard
          profile={profile}
          gravatarData={gravatarData}
          gravatarUrl={gravatarUrl}
        />
      )}
    </div>
  );
};

export default App;
