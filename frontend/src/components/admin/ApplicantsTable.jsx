import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from '../ui/toast';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';


const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {

    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true
            });
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
                description: error.response?.data?.message || "Something went wrong",
                type: "error",
            });
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        applicants && applicants?.applications?.map((item) => {
                            return (
                                <tr key={item._id} >
                                    <TableCell>{item?.applicant?.name}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>{item?.applicant?.phone}</TableCell>
                                    <TableCell className='text-blue-600 cursor-pointer'>
                                        {
                                            item.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                        }
                                    </TableCell>
                                    <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {
                                                    shortlistingStatus.map((status, index) => {
                                                        return (
                                                            <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            )
                        })
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable