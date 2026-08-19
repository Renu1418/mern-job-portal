// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup } from "@/components/ui/radio-group"
// import { Button } from '../ui/button'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { AUTH_API_END_POINT } from "@/utils/constant.js";
// import { toast } from "@/components/ui/toast"
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading } from '../../redux/authSlice.js'

// const Signup = () => {

//   const [input, setInput] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });

//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const { loading, user } = useSelector((store) => store.auth);


//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${AUTH_API_END_POINT}/register`, input, {
//         headers: {
//           "Content-Type": "application/json"
//         },
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         toast.add({
//           title: "Success",
//           description: res.data.message,
//           type: "success",
//         });

//         navigate("/verify-email", {
//           state: {
//             email: input.email,
//           },
//         });
//       }
//     }

//     catch (error) {
//       console.log(error);
//       toast.add({
//         title: "Error",
//         description: error.response?.data?.message || "Something went wrong",
//         type: "error",
//       });
//     } dispatch(setLoading(false));
//   }

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [])

//   return (
//     <div>
//       <Navbar />

//       <div className='flex items-center justify-center max-w-7xl mx-auto '>
//         <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-6 my-10'>
//           <h1 className='font-bold text-xl mb-5'>Sign up</h1>

//           <div className=' my-4'>
//             <Label>Full Name</Label>
//             <Input type='text' value={input.name} name="name" onChange={changeEventHandler} placeholder='Full Name' />
//           </div>

//           <div className=' my-4'>
//             <Label>Email</Label>
//             <Input type='email' value={input.email} name="email" onChange={changeEventHandler} placeholder='sharma@gmail.com'  required/>
//           </div>


//           <div className=' my-4'>
//             <Label>Password</Label>
//             <Input type='password' value={input.password} name="password" onChange={changeEventHandler} placeholder='Sharma'  required/>
//           </div>

//           <div className='flex items-center justify-between mt-5 '>
//             <RadioGroup className="flex gap-6">
//               <div className="flex items-center gap-2">
//                 <Input
//                   type='radio'
//                   name='role'
//                   value="student"
//                   checked={input.role === 'student'}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                   required
//                 />
//                 <Label htmlFor="student">Student</Label>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Input
//                   type='radio'
//                   name='role'
//                   value="recruiter"
//                   checked={input.role === 'recruiter'}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                   required
//                 />
//                 <Label htmlFor="recruiter">Recruiter</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {
//             loading ? <Button disabled className="w-full my-4">Loading...</Button> : <Button type="submit" className="w-full my-4">Submit</Button>
//           }

//           <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Signup





// new ui 

import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH_API_END_POINT } from "@/utils/constant.js";
import { toast } from "@/components/ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice.js";

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${AUTH_API_END_POINT}/register`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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
    } catch (error) {
      console.log(error);

      toast.add({
        title: "Error",
        description:
          error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }

    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="grid md:grid-cols-2">

            {/* Left Side - Branding */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 text-white md:flex md:min-h-[650px] md:flex-col md:justify-between lg:p-12">

              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10" />

              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold backdrop-blur-sm">
                  JS
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Join JobStack
                </p>

                <h2 className="max-w-md text-4xl font-bold leading-tight lg:text-5xl">
                  Start building your career today.
                </h2>

                <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                  Create your JobStack account and unlock opportunities
                  designed to help you move forward in your career.
                </p>
              </div>

              {/* Benefits */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    ✓
                  </div>
                  <p className="text-sm text-blue-50">
                    Discover jobs that match your skills
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    ✓
                  </div>
                  <p className="text-sm text-blue-50">
                    Apply to opportunities with ease
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    ✓
                  </div>
                  <p className="text-sm text-blue-50">
                    Build your professional journey
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex items-center p-6 sm:p-8 lg:p-12">
              <form onSubmit={submitHandler} className="w-full">

                {/* Mobile Branding */}
                <div className="mb-8 md:hidden">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-200">
                    JS
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Join JobStack
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    Create your account
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Start exploring opportunities and take the next step in
                    your career.
                  </p>
                </div>

                {/* Desktop Heading */}
                <div className="mb-8 hidden md:block">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Create your account
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    Join JobStack and start your career journey.
                  </p>
                </div>

                {/* Full Name */}
                <div className="mb-5">
                  <Label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </Label>

                  <Input
                    id="name"
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={changeEventHandler}
                    placeholder="Enter your full name"
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Email */}
                <div className="mb-5">
                  <Label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="you@example.com"
                    required
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Password */}
                <div className="mb-6">
                  <Label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </Label>

                  <Input
                    id="password"
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="Create a password"
                    required
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Role */}
                <div className="mb-7">
                  <Label className="mb-3 block text-sm font-semibold text-slate-700">
                    I want to join as
                  </Label>

                  <RadioGroup className="grid grid-cols-2 gap-3">
                    {/* Student */}
                    <label
                      className={`group cursor-pointer rounded-2xl border p-4 transition-all ${
                        input.role === "student"
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Input
                          type="radio"
                          name="role"
                          value="student"
                          checked={input.role === "student"}
                          onChange={changeEventHandler}
                          className="h-4 w-4 cursor-pointer accent-blue-600"
                          required
                        />

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Student
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Find opportunities
                          </p>
                        </div>
                      </div>
                    </label>

                    {/* Recruiter */}
                    <label
                      className={`group cursor-pointer rounded-2xl border p-4 transition-all ${
                        input.role === "recruiter"
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Input
                          type="radio"
                          name="role"
                          value="recruiter"
                          checked={input.role === "recruiter"}
                          onChange={changeEventHandler}
                          className="h-4 w-4 cursor-pointer accent-blue-600"
                          required
                        />

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Recruiter
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Hire great talent
                          </p>
                        </div>
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                {/* Submit */}
                {loading ? (
                  <Button
                    disabled
                    className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold"
                  >
                    Creating account...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300"
                  >
                    Create account
                  </Button>
                )}

                {/* Login */}
                <p className="mt-6 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;