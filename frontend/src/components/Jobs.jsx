
// new ui
import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SearchX, SlidersHorizontal } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const salary = parseInt(job.salary.match(/\d+/)?.[0]);

        if (searchedQuery === "Below ₹5 LPA") {
          return salary < 5;
        } else if (searchedQuery === "₹5 - ₹10 LPA") {
          return salary >= 5 && salary <= 10;
        } else if (searchedQuery === "Above ₹10 LPA") {
          return salary > 10;
        }

        return (
          job.title
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job.description
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job.location
            .toLowerCase()
            .includes(searchedQuery.toLowerCase())
        );
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* Filter Sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Filter Jobs
                  </h2>

                  <p className="text-xs text-slate-400">
                    Find the right opportunity
                  </p>
                </div>
              </div>

              <div className="p-4">
                <FilterCard />
              </div>
            </div>
          </aside>

          {/* Job Cards */}
          <section className="min-w-0 flex-1">
            {filterJobs.length <= 0 ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 text-center shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <SearchX className="h-8 w-8" />
                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  No jobs found
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Try adjusting your filters or search for a different
                  position.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                    className="h-full"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Jobs;