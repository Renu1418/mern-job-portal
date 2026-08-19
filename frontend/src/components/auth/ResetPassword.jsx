// import React, { useState } from "react";
// import Navbar from "../shared/Navbar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "../ui/button";
// import { toast } from "@/components/ui/toast";
// import axios from "axios";
// import { AUTH_API_END_POINT } from "@/utils/constant";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../../redux/authSlice";

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { loading } = useSelector((store) => store.auth);

//   const [input, setInput] = useState({
//     email: location.state?.email || "",
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const changeEventHandler = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (input.newPassword !== input.confirmPassword) {
//       toast.add({
//         title: "Error",
//         description: "Passwords do not match",
//         type: "error",
//       });

//       return;
//     }

//     try {
//       dispatch(setLoading(true));

//       const res = await axios.post(
//         `${AUTH_API_END_POINT}/reset-password`,
//         {
//           email: input.email,
//           otp: input.otp,
//           newPassword: input.newPassword,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

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
//         description:
//           error.response?.data?.message || "Something went wrong",
//         type: "error",
//       });
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}   className="w-1/2 border border-gray-200 rounded-md p-8 my-12">       
//           <h1 className="font-bold text-xl mb-5">Reset Password</h1>
            
//           <div className="my-4">
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

//           <div className="my-4">
//             <Label>New Password</Label>
//             <Input
//               type="password"
//               name="newPassword"
//               value={input.newPassword}
//               onChange={changeEventHandler}
//               placeholder="Enter new password"
//               required
//             />
//           </div>

//           <div className="my-4">
//             <Label>Confirm Password</Label>
//             <Input
//               type="password"
//               name="confirmPassword"
//               value={input.confirmPassword}
//               onChange={changeEventHandler}
//               placeholder="Confirm new password"
//               required
//             />
//           </div>

//           {  

//            loading ? (<Button disabled className="w-full my-4">Resetting Password...</Button>) : 
//            (<Button type="submit" className="w-full my-4">Reset Password</Button>)

//           }
          
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;






// new ui 

import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import { AUTH_API_END_POINT } from "@/utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (input.newPassword !== input.confirmPassword) {
      toast.add({
        title: "Error",
        description: "Passwords do not match",
        type: "error",
      });

      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${AUTH_API_END_POINT}/reset-password`,
        {
          email: input.email,
          otp: input.otp,
          newPassword: input.newPassword,
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="grid md:grid-cols-2">

            {/* Left Side */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 text-white md:flex md:min-h-[600px] md:flex-col md:justify-between lg:p-12">

              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10" />

              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold backdrop-blur-sm">
                  JS
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Almost done
                </p>

                <h1 className="max-w-md text-4xl font-bold leading-tight lg:text-5xl">
                  Create a new password.
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                  Enter the OTP you received and choose a strong new password
                  for your JobStack account.
                </p>
              </div>

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    ✓
                  </div>

                  <p className="text-sm text-blue-50">
                    Verify your OTP securely
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    🔒
                  </div>

                  <p className="text-sm text-blue-50">
                    Choose a new secure password
                  </p>
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
                    Almost done
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    Reset your password
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter the OTP and create a new password for your account.
                  </p>
                </div>

                {/* Desktop Header */}
                <div className="mb-8 hidden md:block">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Reset your password
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter the verification code and your new password.
                  </p>
                </div>

                {/* Email */}
                <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Account
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                    {input.email || "Your email address"}
                  </p>
                </div>

                {/* OTP */}
                <div className="mb-5">
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
                </div>

                {/* New Password */}
                <div className="mb-5">
                  <Label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    New password
                  </Label>

                  <Input
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    value={input.newPassword}
                    onChange={changeEventHandler}
                    placeholder="Enter new password"
                    required
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <Label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Confirm new password
                  </Label>

                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={input.confirmPassword}
                    onChange={changeEventHandler}
                    placeholder="Confirm new password"
                    required
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Submit */}
                {loading ? (
                  <Button
                    disabled
                    className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold"
                  >
                    Resetting password...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300"
                  >
                    Reset password
                  </Button>
                )}

                {/* Security Note */}
                <div className="mt-7 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm">🔐</span>

                    <p className="text-xs leading-5 text-slate-500">
                      Make sure your new password is strong and different
                      from your previous password.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;