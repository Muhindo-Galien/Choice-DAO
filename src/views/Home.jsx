import Banner from '../components/Banner'
import Contribute from '../components/Contribute'
import CreateProposal from '../components/CreateProposal'
import Proposals from '../components/Proposals'

const Home = () => {
  return (
    <>
      <Banner />
      <Proposals />
      <CreateProposal />
      <Contribute />
    </>
  )
}

export default Home
