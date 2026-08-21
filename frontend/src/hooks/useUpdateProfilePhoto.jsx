import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "@/components/ui/toast";

const useUpdateProfilePhoto = () => {
    const fileInputRef = useRef(null);

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const profilePhotoHandler = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.put(
                `${USER_API_END_POINT}/profile/photo/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(
                    setUser({
                        ...user,
                        profile: {
                            ...user.profile,
                            profilePhoto: res.data.profilePhoto,
                        },
                    })
                );

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

    return {
        fileInputRef,
        profilePhotoHandler
    };
};

export default useUpdateProfilePhoto;