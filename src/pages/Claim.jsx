import { useState } from 'react'

function Claim() {
  return (
    // main content
    <div className='w-full h-screen bg-white flex justify-center items-center p-4'>
      <div className='bg-gray-100 w-1/2 h-3/4 rounded-2xl border-2 border-gray-200 flex flex-col items-center p-2'>
        <h1 className='text-black'>Claim Page</h1>
      </div>

      <div className='bg-black'>
        <h1>Looking to find your items?</h1>

        <a>
          Search Now
        </a>
      </div>
    </div>
  )
}

export default Claim
