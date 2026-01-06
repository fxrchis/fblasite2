import { useState } from 'react'
import supabase from '../config/supabaseClient.js'

function Claim() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [itemName, setItemName] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value)
  }

  function handleItemNameChange(e) {
    setItemName(e.target.value)
  }

  function handleMessageChange(e) {
    setMessage(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    if (!name || !email || !itemName || !message) {
      alert('Please fill in all required fields')
      return
    }
    
    setIsLoading(true)
    
    // Submit claim to items table as a claim record
    supabase
      .from('items')
      .insert([{
        item_name: itemName + ' (CLAIM: ' + name + ')',
        item_type: 'Claim Request',
        item_desc: 'Claim by: ' + name + '\nEmail: ' + email + '\nPhone: ' + (phone || 'Not provided') + '\n\nMessage: ' + message,
        status: 'claim_pending',
        submitted_at: new Date().toISOString()
      }]).then(function(response) {
        if (response.error) {
          console.error('Error submitting claim:', response.error)
          alert('Failed to submit claim. Please try again.')
        } else {
          alert('Claim submitted successfully! We will contact you soon.')
          // Clear form
          setName('')
          setEmail('')
          setPhone('')
          setItemName('')
          setMessage('')
        }
        setIsLoading(false)
      })
  }
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
              value={name}
              onChange={handleNameChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Your Email</label>
            <input 
              type="email"
              placeholder="yourname@student.school.com"
              value={email}
              onChange={handleEmailChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Phone Number (Optional)</label>
            <input 
              type="tel"
              placeholder="(123) 456-7890"
              value={phone}
              onChange={handlePhoneChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Item ID or Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Item Name or ID</label>
            <input 
              type="text"
              placeholder="Ex: Black Jansport Backpack or Item #132"
              value={itemName}
              onChange={handleItemNameChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Inquiry Message */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Message / Reason for Inquiry</label>
            <textarea
              placeholder="Explain why you believe this is your item or ask for more details..."
              value={message}
              onChange={handleMessageChange}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-4 w-2/3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-outfit mx-auto transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Submitting...' : 'Submit Inquiry'}
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
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-outfit transform hover:scale-105"
          >
            Search Now
          </a>

        </div>
      </div>

    </div>


  )
}

export default Claim
