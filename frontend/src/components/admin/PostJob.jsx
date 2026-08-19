import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/toast";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );

    setInput({
      ...input,
      companyId: selectedCompany._id,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
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

        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.add({
        title: "Error",
        description:
          error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/admin/jobs")}
          className="
            mb-5 flex items-center gap-2
            text-sm font-medium text-slate-500
            transition-colors hover:text-blue-600
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </button>

        {/* Main Form */}
        <form
          onSubmit={submitHandler}
          className="
            rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            sm:p-6
          "
        >
          {/* Heading */}
          <div className="mb-6 flex items-start gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl bg-blue-50 text-blue-600
              "
            >
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Post a New Job
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Fill in the details below to publish a new job opportunity.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
            {/* Title */}
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Job Title
              </Label>

              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="e.g. Frontend Developer"
                className="mt-1.5 h-10 focus-visible:ring-blue-500"
              />
            </div>

            {/* Company */}
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Company
              </Label>

              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="mt-1.5 h-10 w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  disabled
                  placeholder="No company available"
                  className="mt-1.5 h-10"
                />
              )}
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Description
              </Label>

              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Brief job description"
                className="mt-1.5 h-10 focus-visible:ring-blue-500"
              />
            </div>

            {/* Requirements */}
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Requirements
              </Label>

              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="e.g. React, JavaScript"
                className="mt-1.5 h-10 focus-visible:ring-blue-500"
              />
            </div>

            {/* Salary */}
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Salary
              </Label>

              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="e.g. 6 LPA"
                className="mt-1.5 h-10 focus-visible:ring-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Location
              </Label>

              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g. Delhi, India"
                className="mt-1.5 h-10 focus-visible:ring-blue-500"
              />
            </div>

            {/* Job Type */}
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Job Type
              </Label>

              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="e.g. Full Time"
                className="mt-1.5 h-10 focus-visible:ring-blue-500"
              />
            </div>

            {/* Experience */}
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Experience
              </Label>

              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="e.g. 1-2 Years"
                className="mt-1.5 h-10 focus-visible:ring-blue-500"
              />
            </div>

            {/* Position */}
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Number of Positions
              </Label>

              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="mt-1.5 h-10 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* No Company Warning */}
          {companies.length === 0 && (
            <div
              className="
                mt-5 rounded-xl border border-red-100
                bg-red-50 px-4 py-3
                text-sm font-medium text-red-600
              "
            >
              Please register a company first before posting a job.
            </div>
          )}

          {/* Buttons */}
          <div className="mt-4 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/jobs")}
              className="border-slate-200 text-slate-600"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading || companies.length === 0}
              className="
                bg-blue-600 px-6
                text-white
                hover:bg-blue-700
              "
            >
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;