// job cards
import React from "react";
import {
  MapPin,
  BriefcaseBusiness,
  ArrowUpRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;

    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div
      className="
        group relative flex h-full flex-col overflow-hidden
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

      {/* Decorative Glow */}
      <div
        className="
          absolute -right-10 -top-10 h-24 w-24
          rounded-full bg-blue-50
          opacity-0 blur-2xl
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      <div
        className="
          absolute -bottom-10 -left-10 h-24 w-24
          rounded-full bg-violet-50
          opacity-0 blur-2xl
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      {/* Posted Time */}
      <div className="relative flex items-center">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

          <span className="text-[11px] font-medium text-slate-400">
            {daysAgo === 0
              ? "Posted today"
              : daysAgo === 1
              ? "Posted 1 day ago"
              : `Posted ${daysAgo} days ago`}
          </span>
        </div>
      </div>

      {/* Company */}
      <div className="relative mt-4 flex items-center gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-gradient-to-br from-blue-50 via-white to-violet-50
            ring-1 ring-slate-100
          "
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="rounded-lg object-cover"
            />

            <AvatarFallback
              className="
                rounded-lg
                bg-gradient-to-br from-blue-100 to-violet-100
                text-xs font-bold text-violet-600
              "
            >
              {job?.company?.name?.charAt(0)?.toUpperCase() || "C"}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-slate-800">
            {job?.company?.name}
          </h2>

          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
            <MapPin className="h-3 w-3 text-blue-500" />

            <span className="truncate">
              {job?.location}
            </span>
          </div>
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

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
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
        <span className="text-[11px] font-medium text-slate-400">
          View job details
        </span>

        {/* View Details */}
        <button
          type="button"
          onClick={() => navigate(`/description/${job?._id}`)}
          className="
            group/btn flex items-center gap-1.5
            rounded-lg
            bg-gradient-to-r from-blue-600 to-violet-600
            px-3.5 py-2
            text-[11px] font-semibold text-white
            shadow-sm shadow-blue-200
            transition-all duration-200
            hover:from-blue-700
            hover:to-violet-700
            hover:shadow-md hover:shadow-blue-200
          "
        >
          View Details

          <ArrowUpRight
            className="
              h-3 w-3
              transition-transform duration-200
              group-hover/btn:-translate-y-0.5
              group-hover/btn:translate-x-0.5
            "
          />
        </button>
      </div>
    </div>
  );
};

export default Job;