import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import { AUTH_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${AUTH_API_END_POINT}/forgot-password`,
        { email },
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

        navigate("/reset-password", {
          state: { email: email },
        });
      }
    } catch (error) {
     
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
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 text-white md:flex md:min-h-[540px] md:flex-col md:justify-between lg:p-12">

              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10" />

              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold backdrop-blur-sm">
                  JS
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Account recovery
                </p>

                <h1 className="max-w-md text-4xl font-bold leading-tight lg:text-5xl">
                  Let's get you back in.
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                  Forgot your password? No worries. Enter your registered
                  email and we'll help you securely reset it.
                </p>
              </div>

              <div className="relative z-10">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                      🔐
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Secure password recovery
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-100">
                        We'll send a one-time verification code to your
                        registered email address.
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
                    Account recovery
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    Forgot password?
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter your email and we'll send you an OTP to reset your
                    password.
                  </p>
                </div>

                {/* Desktop Header */}
                <div className="mb-8 hidden md:block">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Forgot password?
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter your email address to receive a password reset OTP.
                  </p>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <Label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Use the email address associated with your JobStack
                    account.
                  </p>
                </div>

                {/* Send OTP */}
                {loading ? (
                  <Button
                    disabled
                    className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold"
                  >
                    Sending OTP...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300"
                  >
                    Send OTP
                  </Button>
                )}

                {/* Security info */}
                <div className="mt-7 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-sm">✉</span>

                    <p className="text-xs leading-5 text-slate-500">
                      After submitting your email, you'll receive a
                      verification code. Use that code on the next screen to
                      create a new password.
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

export default ForgotPassword;