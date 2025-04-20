"use client"
import React from "react";

export default function HelpPage() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;     // works because of name="email"
        const message = form.message.value; // works because of name="message"
      
        const res = await fetch("/api/report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, message }),
        });
      
        // Optional: alert user or reset form
        if (res.ok) {
          alert("Thank you for your report!");
          form.reset();
        } else {
          alert("Oops! Something went wrong.");
        }
      };
      
      
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto bg-gray-800/60 p-10 rounded-2xl shadow-lg border border-gray-700 space-y-8">
        <h1 className="text-5xl font-extrabold text-center text-yellow-400 drop-shadow-md">
          🛡️ Help & Feedback Portal
        </h1>

        <p className="text-lg text-center text-gray-300">
          Encountered a false negative or facing an issue with Sanjay? We're here to listen and improve. Help us strengthen Sanjay by reporting the problems you face.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Describe the Issue or False Negative</label>
            <textarea
              rows="5"
              name="message"
              id="message"
              placeholder="Explain the problem or the attack that was not detected..."
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-md transition duration-200"
          >
            Submit Report
          </button>
        </form>

        <div className="pt-8 border-t border-gray-700 text-center">
          <h2 className="text-xl font-semibold text-gray-300">Contact Us</h2>
          <p className="text-gray-400">Email: <span className="text-yellow-300">abhipsitb16@gmail.com</span></p>
          <p className="text-gray-400">Phone: <span className="text-yellow-300">+91 8437607470</span></p>
        </div>
      </div>
    </div>
  );
}
