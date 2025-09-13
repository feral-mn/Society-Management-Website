import React from 'react'
import Navbar from '../../components/Navbar'
import { adminLinks } from '../../src/assets/constants'
import Complaint from '../../components/Complaint'

function ComplaintPage() {
  return (
    <>
    <Navbar links={adminLinks}/>
    <Complaint />
    </> 
  )
}

export default ComplaintPage
