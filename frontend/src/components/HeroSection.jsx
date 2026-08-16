import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import hero from "../assets/hero.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-7">

        <div className="grid lg:grid-cols-2 items-center gap-12 min-h-[40vh]">

          {/* Left Section */}
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span className="text-sm font-semibold text-violet-700">
                Your Career Starts Here
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
              Find Your{" "}
              <span className="text-violet-600">
                Dream Job
              </span>
              <br />
              Build Your Future
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
              Discover thousands of verified job opportunities from trusted
              companies. Search smarter, apply faster and build the career
              you've always wanted.
            </p>

            {/* Search Bar */}
            <div className="mt-10 flex w-full max-w-2xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-xl transition-all duration-300 hover:shadow-2xl">

              <Search
                className="ml-3 text-slate-400"
                size={20}
              />

              <Input
                placeholder="Search jobs, companies or skills..."
                className="border-0 shadow-none focus-visible:ring-0 text-base"
                onChange={(e) => setQuery(e.target.value)}
              />

              <Button onClick={searchJobHandler} className="h-12 rounded-2xl bg-violet-600 px-9 font-semibold hover:bg-violet-700 transition-all duration-300">
                Search
              </Button>

            </div>

          </div>

          {/* Right Section */}
          <div className="hidden lg:flex justify-center">

            <img
              src={hero}
              alt="Career Illustration"
              className="w-[620px] xl:w-[700px] object-contain"
              draggable="false"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;