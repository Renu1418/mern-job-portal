import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { toast } from "../components/ui/toast";
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
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
        fetchSingleCompany();
    }, [companyId, dispatch])
}

export default useGetCompanyById