import { useState } from 'react'

function Claim() {
  return (
    // main content
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-6 font-outfit">

      {/* CLAIM FORM BOX */}
      <div className="bg-white w-full max-w-2xl shadow-xl rounded-2xl border border-gray-300 flex flex-col p-8">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Claim or Inquire About a Lost Item
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Fill out the form below to claim an item or request more details.
        </p>

        <div className="flex flex-col gap-5">

          {/* Student Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Your Name</label>
            <input 
              type="text"
              placeholder="John Doe"
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Your Email</label>
            <input 
              type="email"
              placeholder="yourname@student.school.com"
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Phone Number (Optional)</label>
            <input 
              type="tel"
              placeholder="(123) 456-7890"
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Item ID or Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Item Name or ID</label>
            <input 
              type="text"
              placeholder="Ex: Black Jansport Backpack or Item #132"
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Inquiry Message */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Message / Reason for Inquiry</label>
            <textarea
              placeholder="Explain why you believe this is your item or ask for more details..."
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="mt-4 w-2/3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-md mx-auto">
            Submit Inquiry
          </button>

        </div>
      </div>

      {/* BOTTOM SEARCH CARD */}
      <div className="w-full max-w-2xl mt-8">
        <div className="bg-white shadow-lg rounded-2xl border border-gray-300 p-8 flex flex-col items-center text-center">

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Looking for an Item?
          </h2>

          <p className="text-gray-600 mb-6">
            Search through our lost-and-found database to find your missing item.
          </p>

          <a 
            href="/search"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Search Now
          </a>

        </div>
      </div>

    </div>


  )
}

export default Claim
