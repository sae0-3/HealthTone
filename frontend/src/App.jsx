import { ContentBook } from '@components/ContentBook'
import { Header } from '@components/Header'
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'


const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book/:id' element={<ContentBook />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
