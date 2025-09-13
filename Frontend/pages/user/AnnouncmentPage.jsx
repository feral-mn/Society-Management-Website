import React from 'react'
import Navbar from '../../components/Navbar'
import { userLinks } from '../../src/assets/constants'
import Announcment from '../../components/Announcment'
function AnnouncmentPage() {
  return (
    <>
    Hello
    <Navbar links={userLinks}/>
    <Announcment />
    </> 
  )
}

export default AnnouncmentPage
