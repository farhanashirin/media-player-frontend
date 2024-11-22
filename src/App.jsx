
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import WatchHistory from './pages/WatchHistory'
import Home from './pages/Home'
import Footer from './components/Footer'




function App() {


  return (
    <>
      <Header/>
      <Routes>
<Route path='/' element={<LandingPage/>}/>
<Route path='/home' element={<Home/>}/>
<Route path='/watch-history' element={<WatchHistory/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
