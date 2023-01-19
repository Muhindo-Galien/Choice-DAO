import { useState } from 'react'
import { useGlobalState, setGlobalState } from '../store'


const Banner = () => {

  const [isStakeholder] = useGlobalState('isStakeholder')
  const [balance] = useGlobalState('balance')
  const [mybalance] = useGlobalState('mybalance')
  const [connectedAccount] = useGlobalState('connectedAccount')
    const onPropose = () => {
      if (!isStakeholder) return
      setGlobalState('createModal', 'scale-100')
    }
  
    const onContribute =  () => {
      setGlobalState('contributeModal', 'scale-100')
    }

  return (
    
    <div className='max-w-6xl mx-auto pt-32 overflow-hidden w-full'>
      <div className='felx flex-col justify-center sm:justify-start items-center w-full sm:h-full sm:w-4/5 mx-4'>
        <h1 className='text-3xl md:text-6xl font-bold text-gray-40 text-gray-50 overflow-hidden'>
        Give your proposal a chance to be voted!
        </h1>
        <h4 className='mt-2 text-sm sm:text-base w-5/6  text-gray-100'>
        {isStakeholder
          ? 'You can now raise proposals on this platform 😆'
          :`when you contribute upto 1 ether you become a stakeholder`}</h4>
        <div className='flex text-sm sm:text-base gap-3 sm:gap-4 text-gray-100'>
          <p className='flex flex-col sm:flex-row '><span className='pr-2'>Current DAO Balance </span><span className='text-lg font-semibold'>{balance} ETH</span></p>
          <p className='flex flex-col sm:flex-row'><span className='pr-2'>Your  contributions</span> <span className='text-lg font-semibold'>{mybalance} ETH</span></p>
          <p className='flex flex-col sm:flex-row'>  {isStakeholder ? ', You are a stakeholder 😊' : null}</p>
        </div>
        <div className='flex gap-4'>
          <button 
          className='bg-gray-600 hover:bg-gray-400  py-2 px-3 text-base  sm:text-xl mt-6 font-normal rounded-md  text-gray-100'
          type='button' 
          onClick={onContribute}>Contribute</button>
          {
            isStakeholder?(
              <button 
                className='bg-gray-100 hover:bg-gray-200 py-2 px-3 text-base  sm:text-xl mt-6 font-normal rounded-md  text-gray-800'
                type='button' 
                onClick={onPropose}>Propose</button>
            ):null
          }
        </div>
      </div>
    </div>
  )
}

export default Banner
