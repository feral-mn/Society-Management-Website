import React from 'react'
import Navbar from '../../components/Navbar'
import { userLinks } from '../../src/assets/constants'
import Complaint from '../../components/Complaint'

function ComplaintPage() {
  return (
    <>
    <Navbar links={userLinks}/>
    <Complaint />
    </> 
  )
}

export default ComplaintPage
