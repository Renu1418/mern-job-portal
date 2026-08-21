import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Building2,
  FileText,
  Globe,
  MapPin,
  Upload,
  Save,
} from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "../ui/toast";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();

  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];

    setInput({
      ...input,
      file,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.add({
          title: "Company Updated",
          description: res.data.message,
          type: "success",
        });

        navigate("/admin/companies");
      }
    } catch (error) {

      toast.add({
        title: "Update Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/admin/companies")}
          className="
            group mb-6 inline-flex items-center gap-2
            text-sm font-semibold text-slate-500
            transition-colors hover:text-blue-600
          "
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Companies
        </button>

        {/* Main Card */}
        <div
          className="
            overflow-hidden rounded-3xl
            border border-slate-200
            bg-white
            shadow-sm
          "
        >
          {/* Top Gradient */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500" />

          {/* Header */}
          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
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
                <Building2 className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Company Setup
                </h1>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Complete your company profile to help candidates learn more
                  about your organization.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler}>
            <div className="px-6 py-7 sm:px-8">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Company Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Company Name
                  </Label>

                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={changeEventHandler}
                      placeholder="Enter company name"
                      className="
                        h-11 rounded-xl
                        border-slate-200
                        bg-slate-50/50
                        pl-10
                        text-sm
                        focus:border-blue-300
                        focus:ring-blue-100
                      "
                    />
                  </div>
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label
                    htmlFor="website"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Website
                  </Label>

                  <div className="relative">
                    <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="website"
                      type="text"
                      name="website"
                      value={input.website}
                      onChange={changeEventHandler}
                      placeholder="www.company.com"
                      className="
                        h-11 rounded-xl
                        border-slate-200
                        bg-slate-50/50
                        pl-10
                        text-sm
                        focus:border-blue-300
                        focus:ring-blue-100
                      "
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Location
                  </Label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="location"
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      placeholder="e.g. Delhi, India"
                      className="
                        h-11 rounded-xl
                        border-slate-200
                        bg-slate-50/50
                        pl-10
                        text-sm
                        focus:border-blue-300
                        focus:ring-blue-100
                      "
                    />
                  </div>
                </div>

                {/* Logo */}
                <div className="space-y-2">
                  <Label
                    htmlFor="file"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Company Logo
                  </Label>

                  <label
                    htmlFor="file"
                    className="
                      flex h-11 cursor-pointer items-center gap-3
                      rounded-xl
                      border border-dashed border-slate-300
                      bg-slate-50/50
                      px-3
                      transition-all
                      hover:border-blue-300
                      hover:bg-blue-50/50
                    "
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Upload className="h-3.5 w-3.5" />
                    </div>

                    <span className="truncate text-xs font-medium text-slate-500">
                      {input.file instanceof File
                        ? input.file.name
                        : "Upload company logo"}
                    </span>
                  </label>

                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="hidden"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="description"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Company Description
                  </Label>

                  <div className="relative">
                    <FileText className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <textarea
                      id="description"
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      rows={5}
                      placeholder="Tell candidates about your company, culture, and what you do..."
                      className="
                        w-full resize-none
                        rounded-xl
                        border border-slate-200
                        bg-slate-50/50
                        py-3 pl-10 pr-4
                        text-sm text-slate-700
                        outline-none
                        placeholder:text-slate-400
                        focus:border-blue-300
                        focus:ring-2 focus:ring-blue-100
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="
                flex flex-col-reverse gap-3
                border-t border-slate-100
                bg-slate-50/50
                px-6 py-4
                sm:flex-row sm:items-center sm:justify-between
                sm:px-8
              "
            >
              <p className="text-xs text-slate-400">
                You can update these details anytime.
              </p>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/companies")}
                  disabled={loading}
                  className="
                    rounded-xl
                    border-slate-200
                    px-5
                    text-slate-600
                    hover:bg-white
                  "
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="
                    rounded-xl
                    bg-blue-600
                    px-6
                    font-semibold text-white
                    shadow-sm
                    hover:bg-blue-700
                    hover:shadow-md
                  "
                >
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CompanySetup;