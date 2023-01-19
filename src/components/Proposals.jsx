import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Identicon from "react-identicons";
import { daysRemaining, truncate, useGlobalState } from '../store';
import { payoutBeneficiary } from '../Blockchain.services';
const Proposals = () => {
  const [active, setActive] = useState(1)
  const [data] = useGlobalState('proposals')
  const [proposals1, setProposals] = useState(data)
  // ===========================================
  
  const proposals = [
    {name:'All',
    display:function(){
      setProposals(data)
    }},
    {name:'Opened',
    display:function(){
      setProposals(
        data.filter(
          (proposal) => new Date().getTime() < Number(proposal.duration + '000')
        )
      )
    }},
    {name:'Closed',
    display:function(){
      setProposals(
        data.filter(
          (proposal) => new Date().getTime() > Number(proposal.duration + '000')
        )
      )  
    }}
  ]

  return (
    <div className='max-w-6xl mx-auto mb-10'>
        <div className='flex justify-center items-center'>
        {proposals.map((el,i)=>(
           <button key={i+1}
             className={`${active === i+1?'bg-gray-600':null}  py-2 px-3 text-xl
             my-8 font-normal rounded-lt-md rounded-lb-md text-gray-100`}
             type='button' 
            onClick={()=>{setActive(i+1); el.display()}}
            >
            {el.name}
            </button>
            ))}
        </div>    
        <div className='grid gid-cols-1 sm:grid-cols-2 mx-4  gap-4  text-gray-100'>
        {proposals1?.map((el,slug)=>(
          <div className='py-2 px-4 shadow-md   rounded-md bg-gray-600' key={slug}>
            <div className='flex justify-between'>
              <h1 className='font-medium text-base sm:text-xl'>{el.title.slice(0, 20) + '...'}</h1>
              <h1 className=' text-base sm:text-xl font-normal rounded-lt-md rounded-lmd text-gray-100'>
                Exp: <span className='text-[#22c44b] font-normal text-lg'>
                {new Date().getTime() > Number(el.duration + '000')
                        ? 'Expired'
                        : daysRemaining(el.duration)}
                  </span> 
              </h1>
            </div>
            <div  className='flex justify-between items-center'>
              <div className='flex justify-start items-center gap-2 mb-1 '>
                  <Identicon
                    string={el?.proposer}
                    size={36}
                    className="rounded-full bg-slate-50 shadow-xl"
                  />
                  <p className='font-medium text-gray-300'>{truncate(el?.proposer,6,6,15)}</p>
              </div>
                <div className='flex gap-2'>
                        <Link  to={'/proposal/' + el.id}> 
                          <button 
                            className='bg-gray-700 hover:bg-gray-900 py-1 px-3 text-xl rounded-md my-1
                            font-normal rounded-lt-md rounded-lb-md text-gray-100'
                            type='button' >
                            View
                          </button>
                        </Link>
                </div>
            </div>
              
          </div>
))}
        </div>
    </div>
  )
}

export default Proposals