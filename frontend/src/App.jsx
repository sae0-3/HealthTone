import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import { Header } from './components/Header'
import { NavbarSections } from './components/NavbarSections'
import MainPage from './components/MainPage'
import { ContentBook } from './components/ContentBook'


const App = () => {
  return (
    <Router>
      <Header />
      <NavbarSections />

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/book/:id' element={<ContentBook />} />
      </Routes>
    </Router>
  )
}

export default App
