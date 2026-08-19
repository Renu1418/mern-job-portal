import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { setCompanies } from '@/redux/companySlice'
import { toast } from '../ui/toast'

const CompaniesTable = () => {

    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompnay, setFilterCompany] = useState();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

 // delete company handler and Dialog handle
    const handleDeleteClick = (company) => {
        setSelectedCompany(company);
        setOpenDeleteDialog(true);
    };

    const deleteCompanyHandler = async () => {
        if (!selectedCompany) return;

        try {
            const res = await axios.delete(
                `${COMPANY_API_END_POINT}/delete/${selectedCompany._id}`,
                {
                    withCredentials: true
                }
            );

            if (res.data.success) {
                const updatedCompanies = companies.filter(
                    (company) => company._id !== selectedCompany._id
                );

                dispatch(setCompanies(updatedCompanies));

                toast.add({
                    title: "Success",
                    description: res.data.message,
                    type: "success",
                });

                setOpenDeleteDialog(false);
                setSelectedCompany(null);
            }

        } catch (error) {
            console.log(error);

            toast.add({
                title: "Error",
                description:
                    error.response?.data?.message ||
                    "Something went wrong",
                type: "error",
            });
        }
    };

    return (
        <div>
            <Table>

                <TableCaption>
                    A list of your recent registered companies
                </TableCaption>

                {/* Table Header */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>


                {/* Table Body */}
                <TableBody>

                    {
                        filterCompnay?.length <= 0 ? (

                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center"
                                >
                                    You haven't registered any company yet.
                                </TableCell>
                            </TableRow>

                        ) : (

                            filterCompnay?.map((company) => {

                                return (

                                    <TableRow key={company._id}>

                                        {/* Logo */}
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage
                                                    src={company.logo}
                                                />
                                            </Avatar>
                                        </TableCell>


                                        {/* Company Name */}
                                        <TableCell>
                                            {company.name}
                                        </TableCell>


                                        {/* Date */}
                                        <TableCell>
                                            {company.createdAt?.split("T")[0]}
                                        </TableCell>


                                        {/* Action */}
                                        <TableCell className="text-right">

                                            <Popover>

                                                <PopoverTrigger className="cursor-pointer">
                                                    <MoreHorizontal />
                                                </PopoverTrigger>

                                                <PopoverContent className="w-32">

                                                    <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">

                                                        <Edit2 className="w-4 h-4" />

                                                        <span>
                                                            Edit
                                                        </span>

                                                    </div>

                                                    <div
                                                        onClick={() => handleDeleteClick(company)}
                                                        className="flex items-center gap-2 w-fit cursor-pointer mt-2 text-red-500"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
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
                        <DialogTitle>Delete Company?</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-black">
                                {selectedCompany?.name}
                            </span>
                            ? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpenDeleteDialog(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={deleteCompanyHandler}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CompaniesTable