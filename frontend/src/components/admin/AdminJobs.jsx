import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { Plus, Search, BriefcaseBusiness } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div
              className="
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-blue-50 to-violet-50
                text-blue-600
                ring-1 ring-blue-100
              "
            >
              <BriefcaseBusiness className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Jobs
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage all your posted jobs and track applicants.
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div
          className="
            overflow-hidden rounded-3xl
            border border-slate-200
            bg-white
            shadow-sm
          "
        >
          {/* Top Accent */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500" />

          {/* Toolbar */}
          <div
            className="
              flex flex-col gap-4
              border-b border-slate-100
              px-5 py-5
              sm:flex-row sm:items-center sm:justify-between
              sm:px-6
            "
          >
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                value={input}
                placeholder="Search by job title or company..."
                onChange={(e) => setInput(e.target.value)}
                className="
                  h-11 w-full
                  rounded-xl
                  border-slate-200
                  bg-slate-50/70
                  pl-10
                  text-sm
                  focus:border-blue-300
                  focus:ring-blue-100
                "
              />
            </div>

            {/* New Job */}
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="
                h-11 rounded-xl
                bg-blue-600
                px-5
                font-semibold text-white
                shadow-sm
                hover:bg-blue-700
                hover:shadow-md
              "
            >
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </div>

          {/* Table */}
          <div className="px-2 py-2 sm:px-4">
            <AdminJobsTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminJobs;