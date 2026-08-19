// new ui 
import React, { useEffect, useState } from "react";
import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Users,
  CalendarDays,
  Clock3,
  Building2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import { toast } from "./ui/toast";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Apply Job
  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));

        toast.add({
          title: "Success",
          description: res.data.message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);

      toast.add({
        title: "Error",
        description:
          error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant === user?._id
            ) || false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Main Job Header */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Header Accent */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500" />

          <div className="p-6 sm:p-8">

            <div className="flex items-start gap-4">

              {/* Company Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 text-violet-600 ring-1 ring-slate-100">
                <Building2 className="h-7 w-7" />
              </div>

              {/* Job Title */}
              <div className="min-w-0">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {singleJob?.title}
                </h1>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>{singleJob?.location}</span>
                </div>

                {/* Badges */}
                <div className="mt-4 flex flex-wrap gap-2">

                  <Badge
                    variant="outline"
                    className="rounded-lg border-0 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600"
                  >
                    <BriefcaseBusiness className="mr-1.5 h-3.5 w-3.5" />
                    {singleJob?.position} Positions
                  </Badge>

                  <Badge
                    variant="outline"
                    className="rounded-lg border-0 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600"
                  >
                    {singleJob?.jobType}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="rounded-lg border-0 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600"
                  >
                    <IndianRupee className="mr-1 h-3.5 w-3.5" />
                    {singleJob?.salary}
                  </Badge>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-[1fr_320px]">

          {/* Left Content */}
          <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            {/* About Job */}
            <section>
              <h2 className="text-lg font-bold text-slate-900">
                About the Job
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {singleJob?.description}
              </p>
            </section>

            {/* Job Details */}
            <section className="mt-6">

              <h2 className="text-lg font-bold text-slate-900">
                Job Details
              </h2>

              <div className="mt-3 divide-y divide-slate-100">

                {/* Role */}
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center">
                  <span className="w-36 text-sm font-semibold text-slate-500">
                    Role
                  </span>

                  <span className="text-sm font-medium text-slate-800">
                    {singleJob?.title}
                  </span>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center">
                  <span className="w-36 text-sm font-semibold text-slate-500">
                    Location
                  </span>

                  <span className="text-sm font-medium text-slate-800">
                    {singleJob?.location}
                  </span>
                </div>

                {/* Experience */}
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center">
                  <span className="w-36 text-sm font-semibold text-slate-500">
                    Experience
                  </span>

                  <span className="text-sm font-medium text-slate-800">
                    {singleJob?.experience}
                  </span>
                </div>

                {/* Salary */}
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center">
                  <span className="w-36 text-sm font-semibold text-slate-500">
                    Salary
                  </span>

                  <span className="text-sm font-medium text-slate-800">
                    {singleJob?.salary}
                  </span>
                </div>

                {/* Job Type */}
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center">
                  <span className="w-36 text-sm font-semibold text-slate-500">
                    Job Type
                  </span>

                  <span className="text-sm font-medium text-slate-800">
                    {singleJob?.jobType}
                  </span>
                </div>

              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-slate-900">
              Job Overview
            </h2>

            <div className="mt-5 space-y-5">

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-400">
                    Location
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {singleJob?.location}
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Clock3 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Experience
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {singleJob?.experience}
                  </p>
                </div>
              </div>

              {/* Applicants */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Users className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Total Applicants
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {singleJob?.applications?.length || 0}
                  </p>
                </div>
              </div>

              {/* Posted Date */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Posted Date
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {singleJob?.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Single Apply Button */}
            <div className="mt-auto border-t border-slate-100 pt-6">
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`w-full rounded-xl font-semibold transition-all ${
                  isApplied
                    ? "cursor-not-allowed bg-slate-200 text-slate-500 hover:bg-slate-200"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;