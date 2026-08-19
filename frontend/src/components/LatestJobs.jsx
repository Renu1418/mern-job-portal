// new ui 
import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { BriefcaseBusiness, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5 text-blue-600" />

              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Fresh opportunities
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Latest & Top Jobs
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Explore the latest opportunities from companies looking for
              talented people like you.
            </p>
          </div>

          {allJobs?.length > 0 && (
            <Button
              variant="outline"
              onClick={() => navigate("/browse")}
              className="w-fit rounded-xl border-slate-200 bg-white font-semibold hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              View all jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Jobs */}
        {allJobs?.length <= 0 ? (
          <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <BriefcaseBusiness className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                No jobs available
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Check back soon for new opportunities.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allJobs?.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;