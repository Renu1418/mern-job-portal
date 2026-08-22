import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { toast } from "../components/ui/toast";

const useGetAllAdminJobs = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                toast.add({
                    title: "Error",
                    description:
                        error.response?.data?.message || "Something went wrong",
                    type: "error",
                });
            }
        }
        fetchAllAdminJobs();
    }, [])
}

export default useGetAllAdminJobs