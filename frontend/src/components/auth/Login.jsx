import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { toast } from "@/components/ui/toast"
import axios from 'axios'
import { AUTH_API_END_POINT } from "@/utils/constant.js";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {setLoading} from '../../redux/authSlice.js'
import { setUser } from '../../redux/authSlice.js'

const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {loading} = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${AUTH_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.add({
          title: "Success",
          description: res.data.message,
          type: "success",
        });

        navigate("/");
      }
    }

    catch (error) {
      console.log(error);
      toast.add({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }dispatch(setLoading(false));
  }

  return (
    <div>
      <Navbar />


      <div className='flex items-center justify-center max-w-7xl mx-auto '>
        <form  onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-8 my-12'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>


          <div className=' my-4'>
            <Label>Email</Label>
            <Input type='email' value={input.email} name="email" onChange={changeEventHandler} placeholder='sharma@gmail.com' />
          </div>

          <div className=' my-4'>
            <Label>Password</Label>
            <Input type='password' value={input.password} name="password" onChange={changeEventHandler} placeholder='Sharma' />
          </div>
 
        {
          loading ? <Button disabled className="w-full my-4">Loading...</Button> : <Button type="submit" className="w-full my-4">Submit</Button>
        }
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
        </form>
      </div>

    </div>
  )
}

export default Login
