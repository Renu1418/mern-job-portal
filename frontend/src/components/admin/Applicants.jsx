import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { ArrowLeft, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Applicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        toast.add({
          title: "Error",
          description:
            error.response?.data?.message || "Something went wrong",
          type: "error",
        });
      }
    };

    fetchAllApplicants();
  }, [params.id, dispatch]);

  const applicantCount = applicants?.applications?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

        {/* Header */}
        <div
          className="
            mb-6 flex flex-col gap-4
            rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl bg-blue-50 text-blue-600
              "
            >
              <Users className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Applicants
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Review and manage candidates who applied for this job.
              </p>
            </div>
          </div>

          <div
            className="
              w-fit rounded-full bg-blue-50
              px-4 py-2 text-sm font-semibold text-blue-600
            "
          >
            {applicantCount}{" "}
            {applicantCount === 1 ? "Applicant" : "Applicants"}
          </div>
        </div>

        {/* Applicants Table */}
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;