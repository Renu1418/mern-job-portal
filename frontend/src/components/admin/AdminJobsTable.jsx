import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

import {
  Edit2,
  Eye,
  MoreHorizontal,
  Trash2,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { toast } from "../ui/toast";
import { Button } from "../ui/button";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedJob, setSelectedJob] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }

      const searchText = searchJobByText.toLowerCase();

      return (
        job?.title?.toLowerCase().includes(searchText) ||
        job?.company?.name?.toLowerCase().includes(searchText)
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // Delete dialog open
  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setOpenDeleteDialog(true);
  };

  // Delete job
  const deleteJobHandler = async () => {
    if (!selectedJob) return;

    try {
      const res = await axios.delete(
        `${JOB_API_END_POINT}/delete/${selectedJob._id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedJobs = allAdminJobs.filter(
          (job) => job._id !== selectedJob._id
        );

        dispatch(setAllAdminJobs(updatedJobs));

        toast.add({
          title: "Job Deleted",
          description: res.data.message,
          type: "success",
        });

        setOpenDeleteDialog(false);
        setSelectedJob(null);
      }
    } catch (error) {
  
      toast.add({
        title: "Delete Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="py-4 text-xs text-slate-400">
            A list of your recently posted jobs
          </TableCaption>

          {/* Table Header */}
          <TableHeader>
            <TableRow className="border-slate-100 bg-slate-50/70 hover:bg-slate-50/70">
              <TableHead className="h-12 px-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Company
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Job Role
              </TableHead>

              <TableHead className="h-12 px-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Posted Date
              </TableHead>

              <TableHead className="h-12 px-5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {filterJobs?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-56 text-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      No jobs found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Create a new job posting to get started.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filterJobs?.map((job) => (
                <TableRow
                  key={job._id}
                  className="
                    border-slate-100
                    transition-colors
                    hover:bg-blue-50/30
                  "
                >
                  {/* Company */}
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-xl border border-slate-100">
                        <AvatarImage
                          src={job?.company?.logo}
                          alt={job?.company?.name}
                          className="object-cover"
                        />

                        <AvatarFallback className="rounded-xl bg-slate-50 text-slate-400">
                          <Building2 className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {job?.company?.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Company
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Job Role */}
                  <TableCell className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {job?.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {job?.jobType || "Job"}
                      </p>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="px-5 py-4">
                    <span className="text-sm text-slate-500">
                      {job?.createdAt
                        ? new Date(
                            job.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-5 py-4 text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="
                            inline-flex h-9 w-9
                            items-center justify-center
                            rounded-lg
                            border border-slate-200
                            bg-white
                            text-slate-500
                            transition-all
                            hover:border-blue-200
                            hover:bg-blue-50
                            hover:text-blue-600
                          "
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="
                          w-40
                          rounded-xl
                          border-slate-200
                          p-1.5
                          shadow-lg
                        "
                      >
                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}`)
                          }
                          className="
                            flex w-full items-center gap-2.5
                            rounded-lg px-3 py-2
                            text-left text-sm text-slate-600
                            transition-colors
                            hover:bg-blue-50
                            hover:text-blue-600
                          "
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit Job
                        </button>

                        {/* Applicants */}
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/jobs/${job._id}/applicants`
                            )
                          }
                          className="
                            flex w-full items-center gap-2.5
                            rounded-lg px-3 py-2
                            text-left text-sm text-slate-600
                            transition-colors
                            hover:bg-blue-50
                            hover:text-blue-600
                          "
                        >
                          <Eye className="h-4 w-4" />
                          Applicants
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteClick(job)}
                          className="
                            flex w-full items-center gap-2.5
                            rounded-lg px-3 py-2
                            text-left text-sm text-red-500
                            transition-colors
                            hover:bg-red-50
                            hover:text-red-600
                          "
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Job
                        </button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      >
        <DialogContent className="rounded-2xl border-slate-200 sm:max-w-md">
          <DialogHeader>
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <Trash2 className="h-5 w-5" />
            </div>

            <DialogTitle className="text-xl font-bold text-slate-900">
              Delete Job?
            </DialogTitle>

            <DialogDescription className="leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-800">
                {selectedJob?.title}
              </span>
              ? This action cannot be undone and all applications
              submitted for this job will also be deleted.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-3 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpenDeleteDialog(false);
                setSelectedJob(null);
              }}
              className="
                rounded-xl
                border-slate-200
                text-slate-600
              "
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={deleteJobHandler}
              className="
                rounded-xl
                bg-red-500
                text-white
                hover:bg-red-600
              "
            >
              Delete Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJobsTable;