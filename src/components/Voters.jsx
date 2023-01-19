import Identicon from 'react-identicons'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { truncate } from '../store'
import { listVoters } from '../Blockchain.services'

const Voters = () => {
  const [voters, setVoters] = useState([])
  const [data, setData] = useState([])
  const { id } = useParams()
  const [active, setActive] = useState(1)
  const timeAgo = (timestamp) => moment(Number(timestamp + '000')).fromNow()

  const proposals = [
    {name:'All',
    display:() => setVoters(data)
  },
    {name:'Accepted',
    display:() => setVoters(data.filter((vote) => vote.choosen))
  },
    {name:'Rejected',
    display:()=>setVoters(data.filter((vote) => !vote.choosen))
  }
  ]

  const proposalsData = [
    {
      title:'Building Homes for reffegees',
      exprires: "OX2jj30...kbe0p35",
      owerAddress: "OX2l...be0d"
    },
    {
      title:'Giving put food and clothes to orphans',
      exprires: "OX2jj30...kbe0p35",
      owerAddress: "OX2jj...e0p35"
    },
    ,
    {
      title:'Visiting People in hopsitals',
      exprires: "OX2jj30...kbe0p35",
      owerAddress: "OXalvj...e0p35"
    },
  ]

  useEffect(async () => {
        await listVoters(id).then((res) => {
          setVoters(res)
          setData(res)
        })
      }, [id])
    
  return (
    <div className='max-w-6xl mx-auto text-gray-100 mb-8'>
      <div className='mx-4'>

          <div className='flex justify-center items-center'>
          {proposals.map((el,i)=>(
            <button key={i+1}
              className={`${active === i+1?'bg-gray-600':null}  py-2 px-3 text-lg
              my-8 font-normal rounded-lt-md rounded-lb-md text-gray-100`}
              type='button' 
              onClick={()=>{setActive(i+1); el.display()}}
              >
              {el.name}
              </button>
              ))}
          </div>    
          <h1 className='font-bold text-xl mb-2'>Voters</h1>
          <div className='grid gid-cols-1 sm:grid-cols-2  gap-4'>
          {voters.length?voters.map( (el,slug)=>(
            <div className='py-1 px-4 shadow-md   rounded-md bg-gray-600' key={slug}>
              <div  className='flex flex-col sm:flex-row justify-between items-center'>
                <div className='flex justify-between items-center w-full sm:w-4/6'>
                    <div className='flex justify-start items-center gap-2 mb-1'>
                        <Identicon
                          string={el.voter}
                          size={30}
                          className="rounded-full"
                        />
                        <p className='text-xs font-medium text-gray-200'>{truncate(el.voter, 4, 4, 11)}</p>
                    </div>
                    <h1 className=' text-xs font-medium text-gray-200 rounded-lt-md rounded-lmd'>
                      <span className=''>
                      {timeAgo(el.timestamp)}
                        </span>
                    </h1>
                </div>
                {el.choosen ? (
                  <button 
                    disabled
                    className='bg-[#22c44b] py-2 px-3 text-base rounded-md my-1 w-[6rem] text-center
                    font-normal rounded-lt-md rounded-lb-md text-gray-100'
                    type='button' >
                    Accepted
                  </button>
                  ):(
                    <button 
                    disabled
                    className='bg-[#dc2626] py-2 px-3 text-base rounded-md my-1 w-[6rem] text-center
                    font-normal rounded-lt-md rounded-lb-md text-gray-100'
                    type='button' >
                    Rejected
                  </button>
                  )}
              </div>
                
            </div>
        )):<p className='text-center font-bold text-lg'>None yet!</p>}
          </div>
      </div>
    </div>
  )
}


export default Voters