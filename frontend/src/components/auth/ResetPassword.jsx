import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import { AUTH_API_END_POINT } from "@/utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (input.newPassword !== input.confirmPassword) {
      toast.add({
        title: "Error",
        description: "Passwords do not match",
        type: "error",
      });

      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${AUTH_API_END_POINT}/reset-password`,
        {
          email: input.email,
          otp: input.otp,
          newPassword: input.newPassword,
        },
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

        navigate("/login");
      }
    } catch (error) {
      console.log(error);

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
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}   className="w-1/2 border border-gray-200 rounded-md p-8 my-12">       
          <h1 className="font-bold text-xl mb-5">Reset Password</h1>
            
          <div className="my-4">
            <Label>OTP</Label>
            <Input
              type="text"
              name="otp"
              value={input.otp}
              onChange={changeEventHandler}
              placeholder="Enter OTP"
              required
            />
          </div>

          <div className="my-4">
            <Label>New Password</Label>
            <Input
              type="password"
              name="newPassword"
              value={input.newPassword}
              onChange={changeEventHandler}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="my-4">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={changeEventHandler}
              placeholder="Confirm new password"
              required
            />
          </div>

          {  

           loading ? (<Button disabled className="w-full my-4">Resetting Password...</Button>) : 
           (<Button type="submit" className="w-full my-4">Reset Password</Button>)

          }
          
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;