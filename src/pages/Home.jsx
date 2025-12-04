import { useState } from "react";

function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">

      {/* Header */}
      <header className="w-full bg-white py-6 text-center">
        <h1 className="text-gray-950 text-3xl font-semibold">
          Welcome to Our Website
        </h1>
        <p className="text-gray-950 font-semibold py-3">
          Request to find lost items, submit inquiries, or browse submissions.
        </p>
      </header>

      {/* Main Content Box */}
      <div className="w-full flex justify-center items-center gap-6 py-12">

        {/* Submission Box */}
        <div className="mt-12 bg-gray-100 shadow-md rounded-lg p-8 w-11/12 h-64 max-w-xl flex flex-col items-center text-center">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">
            Submissions
          </h2>
          <p className="text-gray-600">
            Wanting to submit a lost item? Press the "Submit" button to continue.
          </p>

          <a href="/submission" className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition">
            Submit Item
          </a>
        </div>

        {/* Search Box */}
        <div className="mt-12 bg-gray-100 shadow-md rounded-lg p-8 w-11/12 h-64 max-w-xl flex flex-col items-center text-center">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">
            Search
          </h2>
          <p className="text-gray-600">
            Head to the Search page to browse for items that are lost around campus.
          </p>

          <a href="/search" className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition">
            Search Items
          </a>
        </div>

        {/* Inquiry Box */}
        <div className="mt-12 bg-gray-100 shadow-md rounded-lg p-8 w-11/12 h-64 max-w-xl flex flex-col items-center text-center">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">
            Claim
          </h2>
          <p className="text-gray-600 ">
            Found your item from the search? Go to the Claim page to claim your lost item.
          </p>

          <a href="/claim" className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition">
            Claim Item
          </a>
        </div>

      </div>
      
    </div>
  );
}

export default Home;

