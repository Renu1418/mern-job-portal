import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { setCompanies } from '@/redux/companySlice';
import { useEffect } from 'react';

const useGetAllCompanies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
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
        fetchCompanies();
    }, [])
}

export default useGetAllCompanies