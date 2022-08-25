import React from 'react'
import {  RiDeleteBinFill } from "react-icons/ri";


const RoomTable = ({data}) => {
  return (
    <div>
  <table>
  <caption>List of all Rooms in this Category</caption>
  <thead>
    <tr style={{backgroundColor: "#f8f8f8"}}>
      <th scope="col">Room Name</th>
      <th scope="col">Status</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {
data.map((item, index) => (
  <tr key={index}>
  <td data-label="Room Name">{item.roomName}</td>
  <td data-label="Status">{item.status}</td>
  <td data-label="Actions" className='flex space-x-5'>
  <button className="btn bg-red-600 border-0">
    <RiDeleteBinFill size={20} />
  </button>
  </td>
</tr>
))
    }

  </tbody>
</table>
    </div>
  )
}

export default RoomTable