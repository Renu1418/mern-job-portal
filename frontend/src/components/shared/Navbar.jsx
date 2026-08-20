import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  User2,
  LogOut,
  Pen,
  Menu,
  X,
  BriefcaseBusiness,
  Building2,
  Home,
  Search,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "../ui/toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AUTH_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import useUpdateProfilePhoto from "@/hooks/useUpdateProfilePhoto";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { fileInputRef, profilePhotoHandler } =
    useUpdateProfilePhoto();

  const userInitials = user?.name
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${AUTH_API_END_POINT}/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(null));

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
          error.response?.data?.message ||
          "Something went wrong",
        type: "error",
      });
    }
  };

  const studentNavItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Browse",
      path: "/browse",
      icon: Search,
    },
  ];

  const recruiterNavItems = [
    {
      name: "Companies",
      path: "/admin/companies",
      icon: Building2,
    },
    {
      name: "Jobs",
      path: "/admin/jobs",
      icon: BriefcaseBusiness,
    },
  ];

  const navItems =
    user?.role === "recruiter"
      ? recruiterNavItems
      : studentNavItems;

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={handleNavClick}
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md shadow-violet-200 transition-transform duration-300 group-hover:scale-105">
            <BriefcaseBusiness className="h-5 w-5 text-white" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Job
            <span className="text-violet-600">Stack</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}

                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-violet-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="h-10 rounded-lg px-5 font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="h-10 rounded-lg bg-violet-600 px-5 font-medium shadow-md shadow-violet-200 transition-all duration-200 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button className="group flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-slate-100">
                  <Avatar className="h-9 w-9 ring-2 ring-transparent transition-all group-hover:ring-violet-200">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                    />
                    <AvatarFallback className="bg-violet-100 font-semibold text-violet-700">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 rounded-xl p-3">
                  <div className="relative">
                    <Avatar className="h-11 w-11">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                      />

                      <AvatarFallback className="bg-violet-100 font-semibold text-violet-700">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>

                    {/* Recruiter photo update */}
                    {user?.role === "recruiter" && (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={profilePhotoHandler}
                          className="hidden"
                        />

                        <Button
                          type="button"
                          size="icon"
                          variant="secondary"
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                          className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border bg-white p-0 shadow-sm hover:bg-slate-100"
                        >
                          <Pen size={9} />
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate font-semibold text-slate-900">
                      {user?.name}
                    </h4>

                    <p className="truncate text-sm text-slate-500">
                      {user?.profile?.bio || "Welcome to JobStack"}
                    </p>
                  </div>
                </div>

                <div className="my-1 border-t border-slate-100" />

                {/* Student Profile */}
                {user?.role === "student" && (
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                  >
                    <User2 className="h-4 w-4" />
                    View Profile
                  </Link>
                )}

                {/* Logout */}
                <button
                  onClick={logoutHandler}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Right Section */}
        <div className="flex items-center gap-2 md:hidden">
          {user && (
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.profile?.profilePhoto}
              />
              <AvatarFallback className="bg-violet-100 font-semibold text-violet-700">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-10 w-10 rounded-lg"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}

            <div className="my-2 border-t border-slate-100" />

            {!user ? (
              <div className="flex flex-col gap-2 pt-1">
                <Link to="/login" onClick={handleNavClick}>
                  <Button
                    variant="outline"
                    className="h-11 w-full rounded-xl"
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/signup" onClick={handleNavClick}>
                  <Button className="h-11 w-full rounded-xl bg-violet-600 hover:bg-violet-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {user?.role === "student" && (
                  <Link
                    to="/profile"
                    onClick={handleNavClick}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                  >
                    <User2 className="h-4 w-4" />
                    View Profile
                  </Link>
                )}

                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;