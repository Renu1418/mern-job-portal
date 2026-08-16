import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Pen, Mail, Contact } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const skills = ["Html", "CSS", "React", "C++"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const[open,setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />

            <div className='max-w-4xl mx-auto bg-white rounded-2xl my-10 p-8'>

                <div className='flex justify-between'>

                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" />
                        </Avatar>

                        <div>
                            <h1 className='font-medium text-xl text-gray-800'>
                                {user?.name}
                            </h1>

                            <p className='text-gray-500 text-sm mt-1'>
                                {user?.profile?.bio}
                            </p>
                        </div>
                    </div>

                    <Button onClick={()=> setOpen(true)} className='text-right' variant="outline"><Pen /></Button>

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
                                )) :<span>NA</span>
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
                            ):(<span>NA</span>)
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