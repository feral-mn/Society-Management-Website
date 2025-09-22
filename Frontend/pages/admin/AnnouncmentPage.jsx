import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { adminLinks } from '../../src/assets/constants'
import Announcment from '../../components/Announcment'
import AnnouncmentForm from '../../components/AnnouncmentForm'
function AnnouncmentPage() {
  const [refresh, setRefresh] = useState(false)
  return (
    <>
    <Navbar links={adminLinks}/>
    <AnnouncmentForm onAnnouncmentAdded={()=>setRefresh(!refresh)}/>
    <Announcment refresh={refresh} />
    </> 
  )
}

export default AnnouncmentPage
