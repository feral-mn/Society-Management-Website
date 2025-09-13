import React from 'react'
import Navbar from '../../components/Navbar'
import { adminLinks } from '../../src/assets/constants'
import InfoCard from '../../components/InfoCard'
function Home() {
  return (
    <div>
      <Navbar links={adminLinks}/>
      <InfoCard />
    </div>
  )
}

export default Home
