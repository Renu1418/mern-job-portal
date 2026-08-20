import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { Building2, Plus, Search } from "lucide-react";

const Companies = () => {
  useGetAllCompanies();

  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* Page Header */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Gradient Accent */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500" />

          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-50 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-32 w-32 rounded-full bg-violet-50 blur-3xl" />

          <div className="relative p-6 sm:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* Title */}
              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Building2 className="h-6 w-6" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Companies
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage the companies registered on your JobStack account.
                  </p>
                </div>
              </div>

              {/* Add Company */}
              <Button
                onClick={() => navigate("/admin/companies/create")}
                className="
                  h-11 rounded-xl
                  bg-blue-600 px-5
                  font-semibold text-white
                  shadow-sm
                  transition-all
                  hover:bg-blue-700
                  hover:shadow-md
                "
              >
                <Plus className="mr-2 h-4 w-4" />
                New Company
              </Button>
            </div>

            {/* Search */}
            <div className="mt-7 border-t border-slate-100 pt-6">

              <div className="relative max-w-md">

                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  value={input}
                  placeholder="Search companies by name..."
                  onChange={(e) => setInput(e.target.value)}
                  className="
                    h-11 rounded-xl
                    border-slate-200
                    bg-slate-50/70
                    pl-10
                    text-sm
                    placeholder:text-slate-400
                    focus:border-blue-300
                    focus:bg-white
                    focus:ring-blue-100
                  "
                />
              </div>

            </div>
          </div>
        </section>

        {/* Companies Table */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 sm:px-7">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Registered Companies
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                View, update, or remove your companies.
              </p>
            </div>

            <div className="hidden rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 sm:block">
              Company Management
            </div>

          </div>

          <div className="p-3 sm:p-5">
            <CompaniesTable />
          </div>

        </section>
      </main>
    </div>
  );
};

export default Companies;