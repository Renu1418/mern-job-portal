// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "../ui/button";
// import { toast } from "@/components/ui/toast";
// import axios from "axios";
// import { AUTH_API_END_POINT } from "@/utils/constant";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading } from '../../redux/authSlice.js'

// const VerifyEmail = () => {

//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((store) => store.auth);

//   const [input, setInput] = useState({
//     email: location.state?.email || "",
//     otp: "",
//   })



//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value })
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${AUTH_API_END_POINT}/verify-email`, input, {
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

//         navigate("/login");

//       }
//     } catch (error) {
//       console.log(error);
//       toast.add({
//         title: "Error",
//         description: error.response?.data?.message || "Something went wrong",
//         type: "error",
//       });
//     } dispatch(setLoading(false));
//   };


//   // Resend OTP handler
//   const resendOtpHandler = async () => {
//     try {

//       const res = await axios.post(
//         `${AUTH_API_END_POINT}/resend-otp`,
//         {
//           email: input.email
//         },
//         {
//           headers: {
//             "Content-Type": "application/json"
//           },
//           withCredentials: true
//         }
//       );

//       if (res.data.success) {
//         toast.add({
//           title: "Success",
//           description: res.data.message,
//           type: "success",
//         });
//       }

//     } catch (error) {
//       console.log(error);

//       toast.add({
//         title: "Error",
//         description: error.response?.data?.message || "Something went wrong",
//         type: "error",
//       });
//     } 
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <form onSubmit={submitHandler} className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//           <div className="mb-4">
//             <Label>OTP</Label>
//             <Input
//               type="text"
//               name="otp"
//               value={input.otp}
//               onChange={changeEventHandler}
//               placeholder="Enter OTP"
//               required
//             />
//           </div>
//           {
//             loading ? <Button disabled className="w-full my-4">Loading...</Button> : <Button type="submit" className="w-full my-4">Verify Email</Button>
//           }

//           <Button type="button" onClick={resendOtpHandler} className="bg-blue-600" > <span >Resend OTP</span></Button>

//         </form>
//       </div>
//     </div>
//   )
// }

// export default VerifyEmail





// new  ui 
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import { AUTH_API_END_POINT } from "@/utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice.js";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: location.state?.email || "",
    otp: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${AUTH_API_END_POINT}/verify-email`,
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

        navigate("/login");
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

  // Resend OTP handler
  const resendOtpHandler = async () => {
    try {
      const res = await axios.post(
        `${AUTH_API_END_POINT}/resend-otp`,
        {
          email: input.email,
        },
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="grid md:grid-cols-2">

            {/* Left Side */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 text-white md:flex md:min-h-[570px] md:flex-col md:justify-between lg:p-12">

              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10" />

              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold backdrop-blur-sm">
                  JS
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Almost there
                </p>

                <h1 className="max-w-md text-4xl font-bold leading-tight lg:text-5xl">
                  Verify your email and get started.
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                  We've sent a verification code to your email address.
                  Enter the code to securely activate your JobStack account.
                </p>
              </div>

              <div className="relative z-10">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                      ✉
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Check your inbox
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-100">
                        Don't see the email? Check your spam or junk folder.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center p-6 sm:p-8 lg:p-12">
              <form
                onSubmit={submitHandler}
                className="w-full"
              >

                {/* Mobile Header */}
                <div className="mb-8 md:hidden">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-200">
                    JS
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Almost there
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    Verify your email
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter the verification code sent to your email address.
                  </p>
                </div>

                {/* Desktop Header */}
                <div className="mb-8 hidden md:block">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Verify your email
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter the OTP sent to your email to continue.
                  </p>
                </div>

                {/* Email Display */}
                <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Verification email
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                    {input.email || "Your email address"}
                  </p>
                </div>

                {/* OTP */}
                <div className="mb-6">
                  <Label
                    htmlFor="otp"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Verification code
                  </Label>

                  <Input
                    id="otp"
                    type="text"
                    name="otp"
                    value={input.otp}
                    onChange={changeEventHandler}
                    placeholder="Enter 6-digit OTP"
                    required
                    className="h-14 rounded-xl border-slate-200 bg-slate-50 px-4 text-center text-lg font-semibold tracking-[0.35em] placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Enter the code you received in your email.
                  </p>
                </div>

                {/* Verify Button */}
                {loading ? (
                  <Button
                    disabled
                    className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold"
                  >
                    Verifying...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300"
                  >
                    Verify email
                  </Button>
                )}

                {/* Resend */}
                <div className="mt-6 text-center">
                  <p className="mb-2 text-sm text-slate-500">
                    Didn't receive the code?
                  </p>

                  <Button
                    type="button"
                    onClick={resendOtpHandler}
                    variant="ghost"
                    className="h-auto p-0 text-sm font-semibold text-blue-600 hover:bg-transparent hover:text-blue-700"
                  >
                    Resend OTP
                  </Button>
                </div>

                {/* Security note */}
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <span>🔒</span>
                  <span>Your verification is secure</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;