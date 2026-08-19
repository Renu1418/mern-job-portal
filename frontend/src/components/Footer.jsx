import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-r from-white via-purple-50 to-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#6A38C2]">Stack</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-md">
            Connecting talented people with their dream careers.
          </p>
        </div>

        {/* Right */}
        <div className="text-center md:text-right">
          <p className="text-[#6A38C2] font-semibold text-sm">
            Build Your Career 🚀
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © {new Date().getFullYear()} JobStack. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;