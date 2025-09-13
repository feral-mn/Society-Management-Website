import React from 'react'
import Navbar from '../../components/Navbar'
import { userLinks } from '../../src/assets/constants'
import InfoCard from '../../components/InfoCard'
function Home() {
  return (
    <div>
      <Navbar links={userLinks}/>
      <InfoCard />

    </div>
  )
}

export default Home
