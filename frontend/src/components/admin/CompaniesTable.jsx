import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Building2,
  CalendarDays,
  Edit2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setCompanies } from "@/redux/companySlice";
import { toast } from "../ui/toast";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filterCompany, setFilterCompany] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }

      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  // Delete company dialog
  const handleDeleteClick = (company) => {
    setSelectedCompany(company);
    setOpenDeleteDialog(true);
  };

  // Delete company
  const deleteCompanyHandler = async () => {
    if (!selectedCompany) return;

    try {
      const res = await axios.delete(
        `${COMPANY_API_END_POINT}/delete/${selectedCompany._id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCompanies = companies.filter(
          (company) => company._id !== selectedCompany._id
        );

        dispatch(setCompanies(updatedCompanies));

        toast.add({
          title: "Company Deleted",
          description: res.data.message,
          type: "success",
        });

        setOpenDeleteDialog(false);
        setSelectedCompany(null);
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
    <>
      <div className="overflow-x-auto">

        <Table>

          {/* Header */}
          <TableHeader>
            <TableRow className="border-slate-100 hover:bg-transparent">

              <TableHead className="h-12 px-4 text-xs font-semibold text-slate-400">
                Company
              </TableHead>

              <TableHead className="h-12 px-4 text-xs font-semibold text-slate-400">
                Registered On
              </TableHead>

              <TableHead className="h-12 px-4 text-right text-xs font-semibold text-slate-400">
                Actions
              </TableHead>

            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>

            {filterCompany?.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={3}
                  className="h-64 text-center"
                >

                  <div className="flex flex-col items-center justify-center">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                      <Building2 className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-700">
                      No companies found
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Register a company to start posting jobs.
                    </p>

                  </div>

                </TableCell>

              </TableRow>

            ) : (

              filterCompany?.map((company) => (

                <TableRow
                  key={company._id}
                  className="
                    border-slate-100
                    transition-colors
                    hover:bg-slate-50/70
                  "
                >

                  {/* Company */}
                  <TableCell className="px-4 py-4">

                    <div className="flex items-center gap-3">

                      <Avatar className="h-10 w-10 rounded-xl border border-slate-100">

                        <AvatarImage
                          src={company.logo}
                          alt={company.name}
                          className="object-cover"
                        />

                        <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-50 to-violet-100 text-sm font-bold text-violet-600">
                          {company?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "C"}
                        </AvatarFallback>

                      </Avatar>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-slate-800">
                          {company.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Registered company
                        </p>

                      </div>

                    </div>

                  </TableCell>

                  {/* Date */}
                  <TableCell className="px-4 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                      <CalendarDays className="h-4 w-4 text-blue-500" />

                      <span>
                        {company.createdAt?.split("T")[0]}
                      </span>

                    </div>

                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-4 text-right">

                    <Popover>

                      <PopoverTrigger asChild>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="
                            h-9 w-9 rounded-lg
                            text-slate-400
                            hover:bg-blue-50
                            hover:text-blue-600
                          "
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>

                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="
                          w-36 rounded-xl
                          border-slate-200
                          p-1.5
                          shadow-lg
                        "
                      >

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/companies/${company._id}`
                            )
                          }
                          className="
                            flex w-full items-center gap-2
                            rounded-lg px-3 py-2
                            text-left text-sm text-slate-600
                            transition-colors
                            hover:bg-blue-50
                            hover:text-blue-600
                          "
                        >
                          <Edit2 className="h-4 w-4" />

                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteClick(company)
                          }
                          className="
                            mt-1 flex w-full items-center gap-2
                            rounded-lg px-3 py-2
                            text-left text-sm text-red-500
                            transition-colors
                            hover:bg-red-50
                          "
                        >
                          <Trash2 className="h-4 w-4" />

                          Delete
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

        <DialogContent
          className="
            w-[calc(100%-2rem)]
            max-w-md
            overflow-hidden
            rounded-3xl
            border border-slate-200
            bg-white
            p-0
            shadow-2xl
          "
        >

          {/* Accent */}
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-orange-400" />

          <div className="p-6 sm:p-7">

            <DialogHeader>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <Trash2 className="h-5 w-5" />
              </div>

              <DialogTitle className="mt-4 text-xl font-bold text-slate-900">
                Delete Company?
              </DialogTitle>

              <DialogDescription className="pt-1 text-sm leading-6 text-slate-500">

                Are you sure you want to delete{" "}

                <span className="font-semibold text-slate-800">
                  {selectedCompany?.name}
                </span>

                ? This action cannot be undone.

              </DialogDescription>

            </DialogHeader>

            <DialogFooter className="mt-6 gap-2 sm:gap-3">

              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDeleteDialog(false)}
                className="
                  rounded-xl
                  border-slate-200
                  px-5
                  text-slate-600
                  hover:bg-slate-50
                "
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={deleteCompanyHandler}
                className="
                  rounded-xl
                  bg-red-500
                  px-5
                  font-semibold text-white
                  hover:bg-red-600
                "
              >
                <Trash2 className="mr-2 h-4 w-4" />

                Delete Company
              </Button>

            </DialogFooter>

          </div>

        </DialogContent>

      </Dialog>
    </>
  );
};

export default CompaniesTable;