import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts'
import { getProposal, payoutBeneficiary, voteOnProposal } from '../Blockchain.services'
import { useGlobalState, daysRemaining } from '../store'

const ProposalDetails = () => {
  const { id } = useParams()
  const [proposal, setProposal] = useState(null)
  const [data, setData] = useState([])
  const [isStakeholder] = useGlobalState('isStakeholder')

  const retrieveProposal = async () => {
    await getProposal(id).then((res) => {
      setProposal(res)
      setData([
        {
          name: 'Voters',
          Acceptees: res?.upvotes,
          Rejectees: res?.downvotes,
        },
      ])
    })
  }
  useEffect(() => {
    retrieveProposal()
 }, [id])

  const onVote = async (choice) => {
    if (new Date().getTime() > Number(proposal.duration + '000')) {
      toast.warning('Proposal expired!')
      return
    }

    await voteOnProposal(id, choice)
    toast.success('Voted successfully!')
  }

  const handlePayout = async (id) => {
    await payoutBeneficiary(id)
    toast.success("Beneficiary successfully Paid Out!");
  }
  return (
    <div className='max-w-6xl mx-auto pt-12 text-gray-100'>
      <div className='mx-4'>
      <div className='flex flex-col sm:flex-row justify-between gap-4 w-full sm:w-4/5 pt-20'>
        <div className='w-full sm:w-4/5'>
          <h1 className='font-bold text-3xl mb-1 overflow-hidden'>{proposal?.title}</h1>
          <h3 className='text-gray-200'>This proposal is to payout <strong>{proposal?.amount} Eth</strong> and
          currently have{' '} 
          <strong>{proposal?.upvotes + proposal?.downvotes} votes</strong> and
        will expire in <strong>{daysRemaining(proposal?.duration)}</strong>
        </h3>
          <div className='mt-4'>
            <h1 className='font-bold text-xl mb-1'>Description</h1>
            <p className='text-gray-200'>{proposal?.description}</p>
          </div>
        <div className='flex gap-4 mt-1'>
        {isStakeholder ? (
          <>
            <button 
              className='bg-[#22c44b] hover:bg-[#1ead42] py-2 px-3 text-xl rounded-md my-1
              font-normal rounded-lt-md rounded-lb-md text-gray-100'
              type='button' onClick={() => onVote(true)}>
              Accept
            </button>  
            <button 
              className='bg-[#dc2626] hover:bg-[#f43d3d]  py-2 px-3 text-xl rounded-md my-1
              font-normal rounded-lt-md rounded-lb-md text-gray-100'
              type='button'
              onClick={() => onVote(false)}
               >
              Reject
            </button>  
          </>
          ) : null} <span></span>
          {new Date().getTime() >
          Number(Number(proposal?.duration)) ? (
            proposal?.upvotes > proposal.downvotes ? (
              !proposal?.paid ?(
                <button
                  className="bg-[#dc2626] hover:bg-[#f43d3d]  py-2 px-3 text-xl rounded-md my-1
                  font-normal rounded-lt-md rounded-lb-md text-gray-100 "
                  onClick={() => handlePayout(proposal.id)}
                >
                  Payout
                </button>
              ) : (
                <button
                disabled
                  className="py-2 px-3 text-xl rounded-md my-1
                  font-normal rounded-lt-md rounded-lb-md border border-green-400 text-green-400"
                >
                  Paid
                </button>
              )
            ):(
              <button
              className="py-2 px-3 text-xl rounded-md my-1
              font-normal rounded-lt-md rounded-lb-md text-red-400 border border-red-400"
            >
              Rejected
            </button>
            )
          ):null}
          </div>     
        </div>
          <div className='bg-gray-100 pr-6 py-3 rounded-lg'>
            <BarChart width={200} height={250} data={data} className="text-gray-100 flex justify-center">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend className='w-32'/>
                <Bar dataKey="Acceptees" fill="#0fe344" />
                <Bar dataKey="Rejectees" fill="#dc2626" />
              </BarChart>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProposalDetails




