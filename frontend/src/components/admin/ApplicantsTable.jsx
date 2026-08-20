import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Check,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "../ui/toast";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = [
  {
    label: "Accepted",
    icon: Check,
  },
  {
    label: "Rejected",
    icon: X,
  },
];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.add({
          title: "Success",
          description: res.data.message,
          type: "success",
        });
      }
    } catch (error) {
      toast.add({
        title: "Error",
        description:
          error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const applications = applicants?.applications || [];

  return (
    <div
      className="
        overflow-hidden rounded-2xl
        border border-slate-200
        bg-white shadow-sm
      "
    >
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="pb-4 text-sm text-slate-500">
            A list of users who recently applied for this job.
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="whitespace-nowrap font-semibold text-slate-700">
                Name
              </TableHead>

              <TableHead className="whitespace-nowrap font-semibold text-slate-700">
                Email
              </TableHead>

              <TableHead className="whitespace-nowrap font-semibold text-slate-700">
                Contact
              </TableHead>

              <TableHead className="whitespace-nowrap font-semibold text-slate-700">
                Resume
              </TableHead>

              <TableHead className="whitespace-nowrap font-semibold text-slate-700">
                Date
              </TableHead>

              <TableHead className="whitespace-nowrap text-right font-semibold text-slate-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.length > 0 ? (
              applications.map((item) => (
                <TableRow
                  key={item._id}
                  className="transition-colors hover:bg-slate-50/70"
                >
                  {/* Name */}
                  <TableCell className="whitespace-nowrap font-medium text-slate-800">
                    {item?.applicant?.name || "N/A"}
                  </TableCell>

                  {/* Email */}
                  <TableCell className="whitespace-nowrap text-slate-600">
                    {item?.applicant?.email || "N/A"}
                  </TableCell>

                  {/* Contact */}
                  <TableCell className="whitespace-nowrap text-slate-600">
                    {item?.applicant?.phone || "N/A"}
                  </TableCell>

                  {/* Resume */}
                  <TableCell className="max-w-[220px]">
                    {item?.applicant?.profile?.resume ? (
                      <a
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          block max-w-[200px] truncate
                          font-medium text-blue-600
                          transition-colors
                          hover:text-blue-700 hover:underline
                        "
                        title={
                          item?.applicant?.profile?.resumeOriginalName
                        }
                      >
                        {item?.applicant?.profile?.resumeOriginalName ||
                          "View Resume"}
                      </a>
                    ) : (
                      <span className="text-slate-400">NA</span>
                    )}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="whitespace-nowrap text-slate-600">
                    {item?.applicant?.createdAt
                      ? item.applicant.createdAt.split("T")[0]
                      : "N/A"}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="
                            inline-flex h-9 w-9 items-center
                            justify-center rounded-lg
                            text-slate-500
                            transition-colors
                            hover:bg-slate-100
                            hover:text-slate-800
                          "
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="w-36 rounded-xl p-2"
                      >
                        {shortlistingStatus.map(
                          ({ label, icon: Icon }) => (
                            <button
                              type="button"
                              key={label}
                              onClick={() =>
                                statusHandler(label, item?._id)
                              }
                              className="
                                flex w-full items-center gap-2
                                rounded-lg px-3 py-2
                                text-sm font-medium
                                text-slate-600
                                transition-colors
                                hover:bg-slate-100
                                hover:text-slate-900
                              "
                            >
                              <Icon className="h-4 w-4" />
                              {label}
                            </button>
                          )
                        )}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-sm text-slate-500"
                >
                  No applicants found for this job.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;