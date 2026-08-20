import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import { AUTH_API_END_POINT } from "@/utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice.js";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // submit handler - start
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${AUTH_API_END_POINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));

        toast.add({
          title: "Success",
          description: res.data.message,
          type: "success",
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error);

      // if Unverified user
      if (
        error.response?.data?.message ===
        "Please verify your email address before logging in"
      ) {
        navigate("/verify-email", {
          state: { email: input.email },
        });
      } else {
        toast.add({
          title: "Error",
          description:
            error.response?.data?.message || "Something went wrong",
          type: "error",
        });
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  // submit handler - end

  useEffect(() => {
    dispatch(setLoading(false));

    if (user) {
      navigate("/");
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="grid md:grid-cols-2">

            {/* Left Side - Branding */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 text-white md:flex md:min-h-[570px] md:flex-col md:justify-between lg:p-12">

              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10" />

              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold backdrop-blur-sm">
                  JS
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Welcome back
                </p>

                <h2 className="max-w-md text-4xl font-bold leading-tight lg:text-5xl">
                  Find the job that fits your future.
                </h2>

                <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                  Login to your JobStack account and continue exploring
                  opportunities that match your skills and career goals.
                </p>
              </div>

              <div className="relative z-10">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-sm leading-6 text-blue-50">
                    "Your next opportunity could be just one login away."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center p-6 sm:p-8 lg:p-12">
              <form
                onSubmit={submitHandler}
                className="w-full"
              >
                {/* Mobile Branding */}
                <div className="mb-8 md:hidden">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-200">
                    JS
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Welcome back
                  </p>

                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    Login to JobStack
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Continue your journey and discover your next opportunity.
                  </p>
                </div>

                {/* Desktop Heading */}
                <div className="mb-8 hidden md:block">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Login to your account
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    Enter your credentials to continue.
                  </p>
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
                <div className="mb-2">
                  <div className="mb-2 flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Password
                    </Label>

                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="Enter your password"
                    required
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Login Button */}
                {loading ? (
                  <Button
                    disabled
                    className="mt-7 h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold"
                  >
                    Logging in...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="mt-7 h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300"
                  >
                    Login
                  </Button>
                )}

                {/* Signup */}
                <p className="mt-6 text-center text-sm text-slate-500">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                  >
                    Create an account
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

export default Login;