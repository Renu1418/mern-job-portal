import React, { useRef, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Pen, Mail, Contact } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useDispatch, useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'

const skills = ["Html", "CSS", "React", "C++"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    // for profile photo
    const fileInputRef = useRef(null);

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
                dispatch(setUser({ ...user, profile: { ...user.profile, profilePhoto: res.data.profilePhoto } }));
            }
            toast.add({
                title: "Success",
                description: res.data.message,
                type: "success",
            });

        } catch (error) {
            console.log(error);
            toast.add({
                title: "Error",
                description: error.response?.data?.message || "Something went wrong",
                type: "error",
            });
        }
    };






    return (
        <div>
            <Navbar />

            <div className='max-w-4xl mx-auto bg-white rounded-2xl my-10 p-8'>

                <div className='flex justify-between'>

                    <div className='flex items-center gap-4'>

                        <div className='relative'>
                            <Avatar className='h-24 w-24'>
                                <AvatarImage src={user?.profile?.profilePhoto} />
                            </Avatar>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={profilePhotoHandler}
                                className="hidden"
                            />

                            <Button onClick={() => fileInputRef.current.click()} variant='secondary' type="button" size="icon" className='absolute bottom-1 right-1 h-7 w-7 rounded-full p-0'>
                                <Pen size={12} />
                            </Button>
                        </div>

                        <div>
                            <h1 className='font-medium text-xl text-gray-800'>
                                {user?.name}
                            </h1>

                            <p className='text-gray-500 text-sm mt-1'>
                                {user?.profile?.bio}
                            </p>
                        </div>
                    </div>

                    <Button onClick={() => setOpen(true)} className='text-right' variant="outline"><Pen /></Button>

                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phone}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1>Skills</h1>

                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills?.length > 0
                                ?
                                user.profile.skills.map((item, index) => (
                                    <Badge key={index}>
                                        {item}
                                    </Badge>
                                )) : <span>NA</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">
                        Resume
                    </Label>

                    {
                        user?.profile?.resume
                            ?
                            (
                                <a
                                    target='_blank'
                                    rel="noopener noreferrer"
                                    href={user?.profile?.resume}
                                    className='text-blue-500'
                                >
                                    {user?.profile?.resumeOriginalName}
                                </a>
                            ) : (<span>NA</span>)
                    }
                </div>

            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-8'>
                <h1 className='font-bold text-lg my-5'>
                    Applied Jobs
                </h1>

                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />

        </div>
    )
}

export default Profile