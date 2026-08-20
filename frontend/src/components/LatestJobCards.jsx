import React from "react";
import {
  MapPin,
  BriefcaseBusiness,
  ArrowUpRight,   
} from "lucide-react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="
        group relative flex h-full cursor-pointer flex-col overflow-hidden
        rounded-2xl border border-slate-200
        bg-white p-4.5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-lg hover:shadow-slate-200/70
      "
    >
      {/* Top Gradient */}
      <div
        className="
          absolute left-0 right-0 top-0 h-1
          bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* Subtle Decorative Glow */}
      <div
        className="
          pointer-events-none absolute -right-10 -top-10 h-24 w-24
          rounded-full bg-blue-50
          opacity-0 blur-2xl
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      <div
        className="
          pointer-events-none absolute -bottom-10 -left-10 h-24 w-24
          rounded-full bg-violet-50
          opacity-0 blur-2xl
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      {/* Company Header */}
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">

          {/* Company Logo / Initial */}
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl
              bg-gradient-to-br from-blue-50 via-white to-violet-50
              text-sm font-bold text-violet-600
              ring-1 ring-slate-100
            "
          >
            {job?.company?.name?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-slate-800">
              {job?.company?.name}
            </h2>

            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
              <MapPin className="h-3 w-3 shrink-0 text-blue-500" />

              <span className="truncate">
                {job?.location}
              </span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div
          className="
            flex h-8 w-8 shrink-0 items-center justify-center
            rounded-lg
            border border-slate-200
            bg-slate-50
            text-slate-400
            transition-all duration-200
            group-hover:border-blue-200
            group-hover:bg-blue-50
            group-hover:text-blue-600
          "
        >
          <ArrowUpRight
            className="
              h-3.5 w-3.5
              transition-transform duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </div>
      </div>

      {/* Job Information */}
      <div className="relative mt-4 flex-1">

        <h1
          className="
            line-clamp-2
            text-lg font-bold leading-6
            tracking-tight text-slate-900
            transition-colors duration-200
            group-hover:text-blue-600
          "
        >
          {job?.title}
        </h1>

        <p
          className="
            mt-2
            line-clamp-2
            text-xs leading-5
            text-slate-500
          "
        >
          {job?.description}
        </p>
      </div>

      {/* Job Tags */}
      <div className="relative mt-4 flex flex-wrap gap-1.5">

        <Badge
          className="
            rounded-lg border-0
            bg-violet-50 px-2.5 py-1
            text-[11px] font-semibold text-violet-600
          "
        >
          <BriefcaseBusiness className="mr-1 h-3 w-3" />
          {job?.position} Positions
        </Badge>

        <Badge
          className="
            rounded-lg border-0
            bg-blue-50 px-2.5 py-1
            text-[11px] font-semibold text-blue-600
          "
        >
          {job?.jobType}
        </Badge>

        <Badge
          className="
            rounded-lg border-0
            bg-emerald-50 px-2.5 py-1
            text-[11px] font-semibold text-emerald-600
          "
        >
          {job?.salary}
        </Badge>
      </div>

      {/* Footer */}
      <div
        className="
          relative mt-4 flex items-center justify-between
          border-t border-slate-100 pt-3
        "
      >
        <span
          className="
            text-[11px] font-medium
            text-slate-400
            transition-colors
            group-hover:text-blue-600
          "
        >
          View job details
        </span>

        <div
          className="
            flex items-center gap-1.5
            rounded-lg
            bg-blue-50
            px-3.5 py-2
            text-[11px] font-semibold
            text-blue-600
            transition-all duration-200
            group-hover:bg-blue-600
            group-hover:text-white
            group-hover:shadow-md
            group-hover:shadow-blue-100
          "
        >
          View Details

          <ArrowUpRight
            className="
              h-3 w-3
              transition-transform duration-200
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;