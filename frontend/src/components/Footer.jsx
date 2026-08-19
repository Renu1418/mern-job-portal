
// new ui 
import React from "react";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-200">
                JS
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Job<span className="text-blue-600">Stack</span>
              </h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Connecting talented people with meaningful opportunities and
              helping businesses find the right talent.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 md:items-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
              <BriefcaseBusiness className="h-4 w-4 text-blue-600" />

              <span className="text-sm font-semibold text-blue-700">
                Build your career
              </span>

              <ArrowUpRight className="h-4 w-4 text-blue-600" />
            </div>

            <p className="text-xs text-slate-400 md:text-right">
              © {new Date().getFullYear()} JobStack. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-slate-100 pt-5">
          <p className="text-center text-xs text-slate-400">
            Find opportunities. Grow your career. Build your future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;