import React from 'react'
import {AiOutlineTwitter} from 'react-icons/ai'


const Footer = () => {
    const date = new Date().getFullYear();
    return (
    <div className='footer max-w-6xl my-4 mx-auto  flex flex-col md:flex-row justify-between px-4 font-globalFont text-gray-300 '>
      <h2 className='text-center sm:text-center'> &copy; {date} Choice DAO </h2>
      <h4 className='text-center sm:text-center '>Designed By Galien Dev </h4>
      
    </div>
  )
}

export default Footer