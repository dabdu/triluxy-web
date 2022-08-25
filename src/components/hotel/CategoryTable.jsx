import React from 'react'
import { Link } from 'react-router-dom'
import {  RiDeleteBinFill } from "react-icons/ri";
import {  GrView } from "react-icons/gr";


const CategoryTable = ({data}) => {
  // const {categoryName, hotel, maxPersons, price, } = data;
  return (
    <div>
        <table>
  <caption>LIST OF aLL Categories Available In Your Hotel</caption>
  <thead>
    <tr style={{backgroundColor: "#f8f8f8"}}>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Rooms</th>
      <th scope="col">Max Persons</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {
data.map((item, index) => (
  <tr key={index}>
  <td data-label="Name">{item.categoryName}</td>
  <td data-label="Price">{item.price}</td>
  <td data-label="Rooms">3</td>
  <td data-label="Max Persons">{item.maxPersons}</td>
  <td data-label="Actions" className='flex space-x-5'>
  <Link to={`/hotel/category/${item._id}`} className="btn text-white">
      <GrView color='white' size={20}/>
  </Link>
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

export default CategoryTable