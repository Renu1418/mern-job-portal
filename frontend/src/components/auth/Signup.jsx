import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AUTH_API_END_POINT } from "@/utils/constant.js";
import { toast } from "@/components/ui/toast"
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice.js'

const Signup = () => {

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${AUTH_API_END_POINT}/register`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.add({
          title: "Success",
          description: res.data.message,
          type: "success",
        });

        navigate("/verify-email", {
          state: {
            email: input.email,
          },
        });
      }
    }

    catch (error) {
      console.log(error);
      toast.add({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    } dispatch(setLoading(false));
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])

  return (
    <div>
      <Navbar />

      <div className='flex items-center justify-center max-w-7xl mx-auto '>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-6 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign up</h1>

          <div className=' my-4'>
            <Label>Full Name</Label>
            <Input type='text' value={input.name} name="name" onChange={changeEventHandler} placeholder='Full Name' />
          </div>

          <div className=' my-4'>
            <Label>Email</Label>
            <Input type='email' value={input.email} name="email" onChange={changeEventHandler} placeholder='sharma@gmail.com'  required/>
          </div>


          <div className=' my-4'>
            <Label>Password</Label>
            <Input type='password' value={input.password} name="password" onChange={changeEventHandler} placeholder='Sharma'  required/>
          </div>

          <div className='flex items-center justify-between mt-5 '>
            <RadioGroup className="flex gap-6">
              <div className="flex items-center gap-2">
                <Input
                  type='radio'
                  name='role'
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  required
                />
                <Label htmlFor="student">Student</Label>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type='radio'
                  name='role'
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  required
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {
            loading ? <Button disabled className="w-full my-4">Loading...</Button> : <Button type="submit" className="w-full my-4">Submit</Button>
          }

          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup
