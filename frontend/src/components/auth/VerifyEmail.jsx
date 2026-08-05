import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {

  const location = useLocation();
  const navigate = useNavigate();
  // useState

  const [input, setInput] = useState({
    email: location.state?.email || "",
    otp: "",
  })



  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`${USER_API_END_POINT}/verify-email`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

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
        description: error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form  onSubmit={submitHandler} className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <Label>OTP</Label>
            <Input
              type="text"
              name="otp"
              value={input.otp}
              onChange={changeEventHandler}
              placeholder="Enter OTP"
            />
          </div>

          <Button type="submit" className="w-full">
            Verify Email
          </Button>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail
