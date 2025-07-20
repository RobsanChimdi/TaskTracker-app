import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Mine = ({tasknum, tasknum2, tasknum3}) => {
    const data = [
  { name: 'Completed', value: tasknum },
  { name: 'In Progress', value: tasknum2 },
  { name: 'Not Started', value: tasknum3 },
];
  return (
    <div>
        
    <BarChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
 
    </div>
  )
}

export default Mine