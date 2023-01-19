import { Link } from 'react-router-dom'
import { MdLightMode } from 'react-icons/md'
import { FaUserSecret, FaMoon } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { truncate, useGlobalState } from '../store'
import { connectWallet } from '../Blockchain.services'
import gblockcahin from "../assets/gblockchain.png"
import Identicon from 'react-identicons'


const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <div className=" sm:px-8 bg-gray-700 shadow-sm z-50 mx-auto w-full fixed">
        <div className=' flex items-center justify-between py-4 sm:mx-0 mx-4 '>
          <Link to={'/'}>
            <img src={gblockcahin} width={50} height={50} alt="logo" className='rounded-md'/> 
          </Link>
            <div className='flex gap-4'>
              <div className="rounded-full shadow-md">
                <Identicon
                string={connectedAccount}
                size={40} 
                className="rounded-full bg-gray-50"
                />
              </div>
              {connectedAccount?
               ( <button disabled type='button' className='bg-gray-500 font-medium  px-3 py-2 rounded-full text-gray-50' onClick={()=>connectWallet()}>
                    {truncate(connectedAccount,6,6,15)}
                </button> ):(
                  <button type='button' className='bg-gray-500 font-medium  px-3 py-2 rounded-full text-gray-50' onClick={()=>connectWallet()}>
                  Connect Wallet
                </button> 
                )
              }

            </div>
          </div>
        </div>
  )
}

export default Header
