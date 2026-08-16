import React from 'react'
import{Badge} from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100  cursor-pointer'>
      
      <div>
         <h1 className='text-lg font-medium '>{job?.company?.name}</h1>
         <p className='text-sm text-gray-600'>{job?.location}</p>
      </div>

      <div>
        <h1 className='text-lg font-bold my-2 '>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>

      <div className ='flex items-center gap-2 mt-4'>
        <Badge variant="outline" className="bg-[#F3EEFF] text-[#6A38C2] border-0 font-medium" >{job?.position} Positions</Badge>
        <Badge variant="outline" className="bg-[#ECFDF5] text-[#16A34A] border-0 font-medium" >{job?.jobType}</Badge>
        <Badge variant="outline" className="bg-[#FFF7ED] text-[#EA580C] border-0 font-medium" >{job?.salary}</Badge>
      </div>
    
    </div>
  )
}

export default LatestJobCards
