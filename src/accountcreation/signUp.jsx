import { useState } from 'react'

function SignUp() {

  return (
    <div className='w-full bg-blue-100 h-screen p-4 flex flex-col items-center justify-center font-outfit'>
      <div className='bg-gray-50 shadow-xl w-1/3 min-h-fit rounded-xl flex flex-col p-6 gap-6 border-blue-500 border-2'>

        <h1 className='text-3xl font-bold text-center'>Sign Up</h1>

        <div>
          Already have an account? <a href="/signin" className='text-blue-500 hover:underline'>Sign In</a>
        </div>

        <div className='w-full flex flex-col gap-4'>
          <input
          type="text"
          placeholder="Username"
          className='p-3 border border-gray-300 rounded-lg focus:outline-none'
          />
          <input
            type="password"
            placeholder="Password"
            className='p-3 border border-gray-300 rounded-lg focus:outline-none'
          />
        </div>
        
        <div className='flex'>
          <input
          type="checkbox"
          />
          <label className='ml-2'>Remember Me</label>
        </div>

        <div className='mt-auto'>
          <button className='w-1/2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center mx-auto'>
            Create Account
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default SignUp
