import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { toast } from "../ui/toast";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import {
  Building2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));

        toast.add({
          title: "Company Created",
          description: res.data.message,
          type: "success",
        });

        const companyId = res?.data?.company?._id;

        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {

      toast.add({
        title: "Unable to Create Company",
        description:
          error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute left-10 top-10 h-40 w-40 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="pointer-events-none absolute bottom-10 right-10 h-48 w-48 rounded-full bg-violet-100/40 blur-3xl" />

        <div className="relative mx-auto w-full max-w-xl">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/admin/companies")}
            className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all group-hover:border-blue-200 group-hover:bg-blue-50">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </span>

            Back to Companies
          </button>

          {/* Main Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            {/* Gradient Accent */}
            <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500" />

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 text-blue-600 ring-1 ring-slate-100">
                  <Building2 className="h-6 w-6" />
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Create a Company
                    </h1>

                    <Sparkles className="h-5 w-5 text-violet-500" />
                  </div>

                  <p className="max-w-md text-sm leading-6 text-slate-500">
                    Start by adding your company name. You can update the
                    company details, website, location, and logo in the next
                    step.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-slate-100" />

              {/* Company Name Input */}
              <div className="space-y-3">
                <Label
                  htmlFor="companyName"
                  className="text-sm font-semibold text-slate-700"
                >
                  Company Name
                </Label>

                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="companyName"
                    type="text"
                    value={companyName}
                    placeholder="e.g. Microsoft, Google, JobStack"
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 pl-12 text-sm shadow-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <p className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  You can edit your company information anytime later.
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/companies")}
                  className="h-11 rounded-xl border-slate-200 px-5 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900"
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={registerNewCompany}
                  disabled={!companyName.trim()}
                  className="h-11 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 font-semibold text-white shadow-md shadow-blue-100 transition-all hover:from-blue-700 hover:to-violet-700 hover:shadow-lg hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-blue-600">Step 1</span>
            <span>of</span>
            <span>2</span>

            <span className="mx-1 h-1 w-12 overflow-hidden rounded-full bg-slate-200">
              <span className="block h-full w-1/2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
            </span>

            <span>Company Setup</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyCreate;