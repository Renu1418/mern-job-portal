


// new ui
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Sparkles,
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  CheckCircle2,
  Users,
  Building2,
} from "lucide-react";
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
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Decorative Background */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />

      <div className="absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-blue-50/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          {/* ================= LEFT ================= */}

          <div className="max-w-2xl">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 shadow-sm">

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100">
                <Sparkles className="h-3.5 w-3.5 text-violet-600" />
              </span>

              <span className="text-xs font-semibold text-violet-700 sm:text-sm">
                Your next opportunity is waiting
              </span>

            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[4.2rem]">

              Find work that

              <span className="mt-1 block bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                fits your future.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              Discover meaningful opportunities from trusted companies and
              take the next step toward a career you love.
            </p>

            {/* Search */}
            <div className="mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/70">

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                <div className="flex min-h-12 flex-1 items-center rounded-xl bg-slate-50">

                  <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" />

                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Job title, skill or company..."
                    className="h-12 border-0 bg-transparent px-3 text-sm text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:ring-0 sm:text-base"
                  />

                </div>

                <Button
                  onClick={searchJobHandler}
                  className="h-12 rounded-xl bg-violet-600 px-7 font-semibold shadow-lg shadow-violet-200 transition-all duration-300 hover:bg-violet-700 hover:shadow-violet-300"
                >
                  Search

                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>

              </div>

            </div>

            {/* Trust Points */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-violet-600" />
                Verified jobs
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-violet-600" />
                Trusted companies
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-violet-600" />
                Easy applications
              </div>

            </div>

            {/* Stats */}
            <div className="mt-9 flex flex-wrap gap-8 border-t border-slate-200 pt-6">

              <div>
                <p className="text-2xl font-bold text-slate-900">
                  1000+
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Open positions
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">
                  500+
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Companies
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">
                  10K+
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Job seekers
                </p>
              </div>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="relative mx-auto w-full max-w-lg">

            {/* Main Visual Card */}
            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70">

              {/* Card Header */}
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold tracking-wider text-violet-600">
                    JOBSTACK
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    Recommended jobs
                  </h3>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                  <BriefcaseBusiness className="h-5 w-5 text-violet-600" />
                </div>

              </div>

              {/* Job Card 1 */}
              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

                <div className="flex items-start justify-between gap-3">

                  <div className="flex gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>

                      <h4 className="font-semibold text-slate-900">
                        Frontend Developer
                      </h4>

                      <p className="mt-1 text-xs text-slate-500">
                        Technology Company
                      </p>

                    </div>

                  </div>

                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-600">
                    New
                  </span>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-medium text-slate-500 shadow-sm">
                    React
                  </span>

                  <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-medium text-slate-500 shadow-sm">
                    JavaScript
                  </span>

                  <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-medium text-slate-500 shadow-sm">
                    Remote
                  </span>

                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    Delhi, India
                  </div>

                  <span className="text-xs font-semibold text-violet-600">
                    View job →
                  </span>

                </div>

              </div>

              {/* Job Card 2 */}
              <div className="mt-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                    <BriefcaseBusiness className="h-4 w-4 text-indigo-600" />
                  </div>

                  <div>

                    <h4 className="text-sm font-semibold text-slate-800">
                      Full Stack Developer
                    </h4>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Product & Engineering
                    </p>

                  </div>

                </div>

              </div>

              {/* Bottom Info */}
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-violet-100 bg-violet-50/70 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                    <Users className="h-4 w-4 text-violet-600" />
                  </div>

                  <div>

                    <p className="text-xs text-slate-500">
                      Career opportunities
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                      Built for your next move
                    </p>

                  </div>

                </div>

                <ArrowUpRight className="h-5 w-5 text-violet-600" />

              </div>

            </div>

            {/* Floating Verified Card */}
            <div className="absolute -right-5 -top-5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl shadow-slate-200/70">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>

                <div>

                  <p className="text-xs font-bold text-slate-800">
                    Verified
                  </p>

                  <p className="text-[10px] text-slate-400">
                    Trusted opportunity
                  </p>

                </div>

              </div>

            </div>

            {/* Floating Users Card */}
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl shadow-slate-200/70">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>

                <div>

                  <p className="text-xs font-bold text-slate-800">
                    10K+ seekers
                  </p>

                  <p className="text-[10px] text-slate-400">
                    Growing every day
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;