import React from "react";
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
import { User2, LogOut, Pen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../ui/toast"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AUTH_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import useUpdateProfilePhoto from "@/hooks/useUpdateProfilePhoto";


const Navbar = () => {


  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { fileInputRef, profilePhotoHandler } = useUpdateProfilePhoto();

  const userInitials = user?.name?.split(" ").map((name) => name[0]).join("").toUpperCase();

  const logoutHandler = async (e) => {
    console.log("🔥 LOGOUT CLICKED");
    try {
      //POST - axios.post(url, data(body), config)
      //GET - axios.post(url, config)
      const res = await axios.post(`${AUTH_API_END_POINT}/logout`, {}, { withCredentials: true });
      if (res.data.success) {

        dispatch(setUser(null));
        toast.add({
          title: "Success",
          description: res.data.message,
          type: "success",
        });
        navigate("/login");
      }
    }
    catch (error) {
      console.log(error);
      toast.add({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        type: "error",
      });

    }
  }


  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Stack</span>
          </h1>
        </div>

        {/* Navigation + Avatar */}
        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-5 font-medium">

            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li>
                </>
              )
            }

          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline" className="px-5 py-5">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] px-6 py-5">Signup</Button></Link>
            </div>
          ) : (

            <Popover>
              <PopoverTrigger >
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="space-y-4">

                  {/* User Info */}
                  <div className="flex items-center gap-3">

                     <div className="relative">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>

                    {/* Sirf recruiter ke liye photo update */}
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
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white border shadow-sm p-0 hover:bg-gray-100"
                        >
                          <Pen size={8} />
                        </Button>
                      </>
                    )}
                    </div>

                    <div>
                      <h4 className="font-medium">{user?.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex items-center gap-2 cursor-pointer">
                        <User2 className="h-4 w-4" />

                        <Button
                          variant="link"
                          className="p-0 h-auto text-gray-600"
                        >
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center gap-2 cursor-pointer">
                      <LogOut className="h-4 w-4" />
                      <Button onClick={logoutHandler} className="p-0 h-auto text-gray-600 cursor-pointer" variant="link">Logout</Button>
                    </div>

                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;