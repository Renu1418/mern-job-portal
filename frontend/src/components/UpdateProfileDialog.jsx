import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  UserRound,
  Mail,
  Phone,
  Code2,
  FileUp,
  Save,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";
import { setUser } from "../redux/authSlice.js";
import { toast } from "./ui/toast";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || [],
    file: user?.profile?.resume || "",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // Resume file handler
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];

    setInput({
      ...input,
      file,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file && input.file instanceof File) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));

        // First close the dialog
        setOpen(false);

        // Then show toast after dialog closes
        setTimeout(() => {
          toast.add({
            title: "Profile Updated",
            description: res.data.message,
            type: "success",
          });
        }, 150);
      }
    } catch (error) {
    // Close dialog first so toast is visible
      setOpen(false);

      setTimeout(() => {
        toast.add({
          title: "Update Failed",
          description:
            error.response?.data?.message ||
            "Something went wrong",
          type: "error",
        });
      }, 150);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          z-50
          w-[calc(100%-2rem)]
          max-w-lg
          overflow-hidden
          rounded-3xl
          border border-slate-200
          bg-white
          p-0
          shadow-2xl
        "
      >
        {/* Top Accent */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500" />

        {/* Header */}
        <DialogHeader className="px-6 pt-6 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UserRound className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                Edit Profile
              </DialogTitle>

              <p className="mt-1 text-xs text-slate-400">
                Keep your profile information up to date
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={submitHandler}>
          <div className="max-h-[65vh] overflow-y-auto px-6 py-6 sm:px-7">
            <div className="space-y-5">

              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-xs font-semibold text-slate-700"
                >
                  Full Name
                </Label>

                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={input.name}
                    onChange={changeEventHandler}
                    className="
                      h-11 rounded-xl
                      border-slate-200
                      bg-slate-50/50
                      pl-10
                      text-sm
                      focus:border-blue-300
                      focus:ring-blue-100
                    "
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold text-slate-700"
                >
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className="
                      h-11 rounded-xl
                      border-slate-200
                      bg-slate-50/50
                      pl-10
                      text-sm
                      focus:border-blue-300
                      focus:ring-blue-100
                    "
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-xs font-semibold text-slate-700"
                >
                  Phone Number
                </Label>

                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="phone"
                    name="phone"
                    value={input.phone}
                    onChange={changeEventHandler}
                    className="
                      h-11 rounded-xl
                      border-slate-200
                      bg-slate-50/50
                      pl-10
                      text-sm
                      focus:border-blue-300
                      focus:ring-blue-100
                    "
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-xs font-semibold text-slate-700"
                >
                  Bio
                </Label>

                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                  <textarea
                    id="bio"
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    rows={3}
                    required
                    placeholder="Tell recruiters a little about yourself..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border border-slate-200
                      bg-slate-50/50
                      px-10 py-3
                      text-sm
                      text-slate-700
                      outline-none
                      placeholder:text-slate-400
                      focus:border-blue-300
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label
                  htmlFor="skills"
                  className="text-xs font-semibold text-slate-700"
                >
                  Skills
                </Label>

                <div className="relative">
                  <Code2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="skills"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                    className="
                      h-11 rounded-xl
                      border-slate-200
                      bg-slate-50/50
                      pl-10
                      text-sm
                      focus:border-blue-300
                      focus:ring-blue-100
                    "
                    placeholder="React, Node.js, MongoDB..."
                    required
                  />
                </div>

                <p className="text-[11px] text-slate-400">
                  Separate multiple skills with commas.
                </p>
              </div>

              {/* Resume */}
              <div className="space-y-2">
                <Label
                  htmlFor="file"
                  className="text-xs font-semibold text-slate-700"
                >
                  Resume
                </Label>

                <label
                  htmlFor="file"
                  className="
                    flex cursor-pointer items-center gap-3
                    rounded-xl
                    border border-dashed border-slate-200
                    bg-slate-50/50
                    px-4 py-3
                    transition-all
                    hover:border-blue-200
                    hover:bg-blue-50/40
                  "
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileUp className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-slate-700">
                      {input.file instanceof File
                        ? input.file.name
                        : user?.profile?.resumeOriginalName ||
                          "Upload your resume"}
                    </p>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                      PDF format recommended
                    </p>
                  </div>
                </label>

                <Input
                  id="file"
                  name="file"
                  type="file"
                  onChange={changeFileHandler}
                  accept="application/pdf"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter
            className="
              border-t border-slate-100
              bg-slate-50/50
              px-6 py-4
              sm:px-7
            "
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="
                rounded-xl
                border-slate-200
                px-5
                text-slate-600
                hover:bg-white
              "
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="
                rounded-xl
                bg-blue-600
                px-6
                font-semibold
                text-white
                shadow-sm
                hover:bg-blue-700
                hover:shadow-md
              "
            >
              {loading ? (
                "Updating..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Profile
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;