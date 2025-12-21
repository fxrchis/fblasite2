import { useState } from 'react'
import supabase  from '../config/supabaseClient.js'
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function checkSignin() {
    if (!username || !password) {
      alert("Please fill in all required fields!");
      return;
    }
    const response = await supabase.auth.signInWithPassword(username.trim(), password);
    const error = response.error;
    if (error) {
      alert("Sign in failed.");
      return;
    }
    navigate("/");
  }
  return (
    <div className='w-full bg-blue-100 h-screen p-4 flex flex-col items-center justify-center font-outfit'>
      <div className='bg-gray-50 shadow-xl w-1/3 min-h-fit rounded-xl flex flex-col p-6 gap-6 border-blue-500 border-2'>

        <h1 className='text-3xl font-bold text-center'>Sign In</h1>

        <div>
          Need an account? <a href="/signup" className='text-blue-500 hover:underline'>Sign Up</a>
        </div>

        <div className='w-full flex flex-col gap-4'>
          <input
            type="text"
            placeholder="Username"
            className='p-3 border border-gray-300 rounded-lg focus:outline-none'
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className='p-3 border border-gray-300 rounded-lg focus:outline-none'
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        
        <div className='flex'>
          <input
          type="checkbox"
          />
          <label className='ml-2'>Remember Me</label>
        </div>

        <div className='mt-auto'>
          <button
            onClick={() => checkSignin()}
            className='w-1/2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center mx-auto'>
            Sign In
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default SignIn
