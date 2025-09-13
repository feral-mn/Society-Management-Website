import React from 'react'
import Navbar from '../../components/Navbar'
import { adminLinks } from '../../src/assets/constants'
import Announcment from '../../components/Announcment'
function AnnouncmentPage() {
  return (
    <>
    Hello
    <Navbar links={adminLinks}/>
    <Announcment />
    </> 
  )
}

export default AnnouncmentPage
