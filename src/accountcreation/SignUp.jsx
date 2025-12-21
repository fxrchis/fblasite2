import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import supabase  from '../config/supabaseClient.js'

function SignUp() {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [classGrade, setClassGrade] = useState("Select Class Grade");
    const [phoneNum, setPhoneNum] = useState(null);
    const [password, setPassword] = useState(null);

  async function submission(){
    if (!username || !email || classGrade == "Select Class Grade" || !phoneNum || !password) {
      alert("Please fill in all required fields!");
      return;
    }
    const { data, error } = await supabase
      .from("users")
      .insert({
        user_name: username,
        email: email,
        class_grade: classGrade,
        phone_num: phoneNum,
        password: password
      });

    if (error) {
      console.error("Insert error:", error);
      alert("Failed to create account.");
      return;
    }

    alert("Account created successfully!");
  } 
  return (
    <div className='w-full min-h-screen bg-blue-100 p-4 flex flex-col items-center justify-center font-outfit'>

      <div className='bg-white shadow-2xl w-[420px] rounded-2xl flex flex-col p-8 gap-6 border border-blue-300'>

        {/* Title */}
        <h1 className='text-3xl font-bold text-center text-blue-700'>
          Create Account
        </h1>

        {/* Already have account */}
        <p className='text-center text-gray-600'>
          Already have an account?{" "}
          <a href="/signin" className='text-blue-500 font-medium hover:underline'>
            Sign In
          </a>
        </p>

        {/* Input fields */}
        <div className='w-full flex flex-col gap-4'>

          <input
            type="text"
            placeholder="Username"
            className='p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            onChange={(ev) => setUsername(ev.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className='p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            onChange={(ev) => setEmail(ev.target.value)}
          />

          {/* Grade Dropdown */}
          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium mb-1'>Class Grade</label>
            <DropdownButton 
              title={classGrade} 
              className="w-full"
            >
              <Dropdown.Item as="button" onClick={() => setClassGrade("9th")} >9th</Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setClassGrade("10th")}>10th</Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setClassGrade("11th")}>11th</Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setClassGrade("12th")}>12th</Dropdown.Item>
            </DropdownButton>
          </div>

          <input
            type="tel"
            placeholder="Phone Number"
            className='p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            onChange={(ev) => setPhoneNum(ev.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className='p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            onChange={(ev) => setPassword(ev.target.value)}
          />

        </div>

        {/* Button */}
        <button 
          onClick={() => submission()}
          className='mt-4 w-2/3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex justify-center mx-auto shadow-md'>
          Create Account
        </button>

      </div>
    </div>
  )
}

export default SignUp
