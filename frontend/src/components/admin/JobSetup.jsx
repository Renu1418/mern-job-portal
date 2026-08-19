import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from '../ui/toast'
import { JOB_API_END_POINT } from '@/utils/constant'

const JobSetup = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        experience: "",
        jobType: "",
        position: ""
    })

    const [loading, setLoading] = useState(false)

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // Get existing job
    useEffect(() => {

        const getJob = async () => {

            try {

                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${params.id}`,
                    {
                        withCredentials: true
                    }
                )

                if (res.data.success) {

                    const job = res.data.job

                    setInput({
                        title: job.title || "",
                        description: job.description || "",
                        requirements: job.requirements?.join(", ") || "",
                        salary: job.salary || "",
                        location: job.location || "",
                        experience: job.experience || "",
                        jobType: job.jobType || "",
                        position: job.position || ""
                    })
                }

            } catch (error) {

                console.log(error)

                toast.add({
                    title: "Error",
                    description:
                        error.response?.data?.message ||
                        "Failed to fetch job",
                    type: "error",
                })
            }
        }

        getJob()

    }, [params.id])


    // Update job
    const submitHandler = async (e) => {

        e.preventDefault()

        try {

            setLoading(true)

            const res = await axios.put(
                `${JOB_API_END_POINT}/update/${params.id}`,
                input,
                {
                    withCredentials: true
                }
            )

            if (res.data.success) {

                toast.add({
                    title: "Success",
                    description: res.data.message,
                    type: "success",
                })

                navigate("/admin/jobs")
            }

        } catch (error) {

            console.log(error)

            toast.add({
                title: "Error",
                description:
                    error.response?.data?.message ||
                    "Something went wrong",
                type: "error",
            })

        } finally {

            setLoading(false)

        }
    }


    return (
        <div>

            <Navbar />

            <div className='max-w-xl mx-auto my-10'>

                <form onSubmit={submitHandler}>

                    <div className='flex items-center gap-5 p-8'>

                        <Button
                            type="button"
                            onClick={() => navigate("/admin/jobs")}
                            variant="outline"
                            className="flex items-center gap-2 text-gray-500 font-semibold"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>

                        <h1 className='font-bold text-xl'>
                            Job Setup
                        </h1>

                    </div>


                    <div className='grid grid-cols-2 gap-4'>

                        {/* Job Title */}
                        <div>
                            <Label>Job Title</Label>

                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>


                        {/* Description */}
                        <div>
                            <Label>Description</Label>

                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>


                        {/* Requirements */}
                        <div>
                            <Label>Requirements</Label>

                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>


                        {/* Salary */}
                        <div>
                            <Label>Salary</Label>

                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>


                        {/* Location */}
                        <div>
                            <Label>Location</Label>

                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>


                        {/* Experience */}
                        <div>
                            <Label>Experience</Label>

                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>


                        {/* Job Type */}
                        <div>
                            <Label>Job Type</Label>

                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>


                        {/* Position */}
                        <div>
                            <Label>Number of Positions</Label>

                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>

                    </div>


                    {
                        loading
                            ?
                            <Button
                                disabled
                                className="w-full my-4"
                            >
                                Updating...
                            </Button>
                            :
                            <Button
                                type="submit"
                                className="w-full my-4"
                            >
                                Update
                            </Button>
                    }

                </form>

            </div>

        </div>
    )
}

export default JobSetup