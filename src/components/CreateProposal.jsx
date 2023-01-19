import { useState } from 'react'
import { setGlobalState, useGlobalState } from '../store'
import { raiseProposal } from '../Blockchain.services'
import { toast } from 'react-toastify'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const CreateProposal = () => {
  const [createModal] = useGlobalState('createModal')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [beneficiary, setBeneficiary] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !beneficiary || !amount) return
    const proposal = { title, description, beneficiary, amount }

    await raiseProposal(proposal)
    toast.success('Proposal created, reloading in progress...')
    closeModal()
  }

  const closeModal = () => {
    setGlobalState('createModal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setTitle('')
    setAmount('')
    setBeneficiary('')
    setDescription('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black bg-opacity-50 transform z-50
      transition-transform duration-300 ${createModal}`}
    >
      <div className="w-11/12 md:w-4/12 h-7/12 p-4  bg-gray-700 shadow-lg rounded-xl text-gray-50 ">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="text-gray-50 font-semibold text-lg">Raise Proposal that lasts 2 minutes</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent"
            >
              <AiOutlineCloseCircle className='font-bold text-2xl text-gray-50'/>
            </button>
          </div>
            <input
              className="bg-transparent  border py-2.5 px-3 rounded-md my-1 w-full outline-none "
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />

            <input
              className="bg-transparent outline-none border py-2.5 px-3 rounded-md my-1 w-full"
              type="text"
              name="amount"
              placeholder="5 Eth"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
            />

            <input
              className="bg-transparent outline-none border py-2.5 px-3 rounded-md my-1 w-full focus:ring-0"
              type="text"
              name="beneficiary"
              placeholder="Beneficiary Address"
              onChange={(e) => setBeneficiary(e.target.value)}
              value={beneficiary}
              required
            />

            <textarea
              className="block w-full text-sm resize-none
              bg-transparent outline-none border py-2.5 border-gray-500 px-3 rounded-md
              focus:outline-none"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>

          <button
            className="bg-gray-600 hover:bg-gray-500  py-3.5 px-3 rounded-md shadow-md w-full mt-2"
            onClick={handleSubmit}
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProposal
