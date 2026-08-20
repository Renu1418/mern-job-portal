import React, {  useState } from 'react'    
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'


const filterData = [
  {
    filterType: "Location",
    array: ["Delhi","Noida","Gurgoan", "Bengaluru", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer","Software Engineer","Cloud Developer"]
  },
  {
    filterType: "Salary",
    array: ["Below ₹5 LPA", "₹5 - ₹10 LPA", "Above ₹10 LPA"]
  },
]

const FilterCard = ({ onFilterChange }) => {

    const [selectedValue, setSelectedValue] = useState('');
    const changeHandler = (value) => {
        setSelectedValue(value);
        onFilterChange(value);  
    }

  return (

    <div className='w-full bg-white p-3 rounded-md'>

      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className="mt-3" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler} >
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1 className="font-bold text-lg">
                {data.filterType}
              </h1>

              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 my-2"
                    >
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
