import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { JOB_API_END_POINT } from '@/utils/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'
import { toast } from '../ui/toast'
import { Button } from '../ui/button'
import axios from 'axios'

const AdminJobsTable = () => {

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [selectedJob, setSelectedJob] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase() || job?.company?.name.toLowerCase().includes(searchJobByText).toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    // to delete job -handler, dialog handler
    const handleDeleteClick = (job) => {
        setSelectedJob(job);
        setOpenDeleteDialog(true);
    };

    const deleteJobHandler = async () => {
        if (!selectedJob) return;

        try {
            const res = await axios.delete(
                `${JOB_API_END_POINT}/delete/${selectedJob._id}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                const updatedJobs = allAdminJobs.filter(
                    (job) => job._id !== selectedJob._id
                );

                dispatch(setAllAdminJobs(updatedJobs));

                toast.add({
                    title: "Success",
                    description: res.data.message,
                    type: "success",
                });

                setOpenDeleteDialog(false);
                setSelectedJob(null);
            }

        } catch (error) {
            console.log(error);

            toast.add({
                title: "Error",
                description:
                    error.response?.data?.message || "Something went wrong",
                type: "error",
            });
        }
    };

    return (
        <div>
            <Table>

                <TableCaption>
                    A list of your recent posted jobs
                </TableCaption>

                {/* Table Header */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>


                {/* Table Body */}
                <TableBody>

                    {
                        filterJobs?.length <= 0 ? (

                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center"
                                >
                                    You haven't registered any company yet.
                                </TableCell>
                            </TableRow>

                        ) : (

                            filterJobs?.map((job) => {

                                return (

                                    <TableRow key={job._id}>

                                        {/* Company Name */}
                                        <TableCell>
                                            {job?.company?.name}
                                        </TableCell>

                                        {/* job title */}
                                        <TableCell>
                                            {job?.title}
                                        </TableCell>


                                        {/* Date */}
                                        <TableCell>
                                            {job?.createdAt?.split("T")[0]}
                                        </TableCell>


                                        {/* Action */}
                                        <TableCell className="text-right">

                                            <Popover>

                                                <PopoverTrigger className="cursor-pointer">
                                                    <MoreHorizontal />
                                                </PopoverTrigger>

                                                <PopoverContent className="w-32">

                                                    <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                                        <Edit2 className="w-4 h-4" />
                                                        <span> Edit </span>
                                                    </div>

                                                    <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                        <Eye className='w-4' />
                                                        <span>Applicants</span>
                                                    </div>

                                                    <div
                                                        onClick={() => handleDeleteClick(job)}
                                                        className='flex items-center w-fit gap-2 cursor-pointer mt-2 text-red-500 hover:text-red-600'
                                                    >
                                                        <Trash2 className='w-4 h-4' />
                                                        <span>Delete</span>
                                                    </div>

                                                </PopoverContent>

                                            </Popover>

                                        </TableCell>

                                    </TableRow>

                                )
                            })
                        )
                    }

                </TableBody>

            </Table>

            <Dialog
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Job?</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-black">
                                {selectedJob?.title}
                            </span>
                            ? This action cannot be undone. Deleting this job will also
                            delete all applications submitted for this job.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setOpenDeleteDialog(false);
                                setSelectedJob(null);
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={deleteJobHandler}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AdminJobsTable