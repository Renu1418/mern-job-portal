import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Pen,
  Mail,
  Contact,
  FileText,
  UserRound,
  BriefcaseBusiness,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import useUpdateProfilePhoto from "@/hooks/useUpdateProfilePhoto";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const { fileInputRef, profilePhotoHandler } =
    useUpdateProfilePhoto();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ================= PROFILE HEADER ================= */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Gradient Accent */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500" />

          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-50 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-violet-50 blur-3xl" />

          <div className="relative p-6 sm:p-8">

            {/* Main Profile Row */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              {/* User */}
              <div className="flex items-center gap-4">

                {/* Profile Image */}
                <div className="relative shrink-0">
                  <Avatar className="h-20 w-20 rounded-2xl border-2 border-white shadow-md ring-1 ring-slate-200 sm:h-24 sm:w-24">

                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.name}
                      className="rounded-2xl object-cover"
                    />

                    <AvatarFallback className="rounded-2xl bg-gradient-to-br from-blue-50 to-violet-100 text-xl font-bold text-violet-600">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>

                  </Avatar>

                  {/* Hidden Input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={profilePhotoHandler}
                    className="hidden"
                  />

                  {/* Change Photo */}
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    size="icon"
                    className="
                      absolute -bottom-1 -right-1
                      h-8 w-8 rounded-full
                      border-2 border-white
                      bg-blue-600 text-white
                      shadow-md
                      hover:bg-blue-700
                    "
                  >
                    <Pen className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Name + Bio */}
             <div className="min-w-0 -mt-1">

              <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900">{user?.name} </h1>
              <p className="mt-1 max-w-lg truncate text-sm text-slate-500 sm:max-w-xl">
                   {user?.profile?.bio ||"Add a short bio to tell recruiters about yourself."}
              </p>
            </div>
   
              </div>

              {/* Edit Button */}
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="
                  w-full rounded-xl
                  border-slate-200
                  px-5
                  text-slate-700
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:text-blue-600
                  sm:w-auto
                "
              >
                <Pen className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            {/* ================= CONTACT INFO ================= */}
            <div className="mt-7 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">

              {/* Email */}
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Mail className="h-4 w-4" />
                </div>

                <div className="min-w-0">

                  <p className="text-[11px] font-medium text-slate-400">
                    Email Address
                  </p>

                  <p className="truncate text-sm font-semibold text-slate-700">
                    {user?.email}
                  </p>

                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Contact className="h-4 w-4" />
                </div>

                <div>

                  <p className="text-[11px] font-medium text-slate-400">
                    Phone Number
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    {user?.phone || "Not added"}
                  </p>

                </div>
              </div>
            </div>

            {/* ================= RESUME + SKILLS ================= */}
            <div className="mt-5 grid gap-4 md:grid-cols-2">

              {/* ================= RESUME - LEFT ================= */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileText className="h-4 w-4" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Resume
                    </h2>
                  </div>

                </div>

                <div className="mt-4">

                  {user?.profile?.resume ? (

                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={user?.profile?.resume}
                      className="
                        group flex items-center justify-between
                        rounded-xl border border-blue-100
                        bg-white px-3.5 py-3
                        transition-all
                        hover:border-blue-200
                        hover:bg-blue-50/50
                      "
                    >

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <FileText className="h-4 w-4" />
                        </div>

                        <span className="truncate text-xs font-semibold text-slate-700">
                          {user?.profile?.resumeOriginalName}
                        </span>

                      </div>

                      <ArrowUpRight
                        className="
                          ml-2 h-4 w-4 shrink-0
                          text-blue-500
                          transition-transform
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                      />

                    </a>

                  ) : (

                    <div className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3">

                      <span className="text-xs text-slate-400">
                        No resume uploaded yet.
                      </span>

                    </div>

                  )}

                </div>
              </div>

              {/* ================= SKILLS - RIGHT ================= */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <UserRound className="h-4 w-4" />
                  </div>

                  <div>

                    <h2 className="text-sm font-bold text-slate-900">
                      Skills
                    </h2>

                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  {user?.profile?.skills?.length > 0 ? (

                    user.profile.skills.map((item, index) => (

                      <Badge
                        key={index}
                        className="
                          rounded-lg border-0
                          bg-violet-50
                          px-2.5 py-1.5
                          text-xs font-semibold
                          text-violet-600
                        "
                      >
                        {item}
                      </Badge>

                    ))

                  ) : (

                    <span className="text-xs text-slate-400">
                      No skills added yet.
                    </span>

                  )}

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= APPLIED JOBS ================= */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 sm:px-7">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Applied Jobs
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Keep track of your job applications
                </p>

              </div>
            </div>

            <div className="hidden rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 sm:block">
              Applications
            </div>

          </div>

          {/* Table */}
          <div className="p-4 sm:p-6">
            <AppliedJobTable />
          </div>

        </section>
      </main>

      {/* Edit Profile Dialog */}
      <UpdateProfileDialog
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Profile;