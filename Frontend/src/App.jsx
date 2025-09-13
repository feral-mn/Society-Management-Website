import './App.css'
import { Routes, Route } from 'react-router-dom'
import UserRoute from '../routes/UserRoute'
import AdminRoute from '../routes/AdminRoute'
import HeroHome from '../pages/HeroHome'
function App() {
 return( 
    <div>
      <Routes>
        <Route path="/" element={<HeroHome />}/>
        {UserRoute()}
        {AdminRoute()}
      </Routes>
    </div>
  )
}

export default App