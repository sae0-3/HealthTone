import { Header } from '@components/Header'
import { Player } from '@components/Player'
import { useStore } from '@hooks/useStore'
import { ContentBook } from '@pages/ContentBook'
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'


const App = () => {
  const { setCurrentAudio } = useStore()

  useEffect(() => {
    const initialAudio = {
      id: null,
      title: 'Unknow Title',
      author: 'Unknow Author',
      cover: null,
      url: null
    }

    setCurrentAudio(initialAudio)
  }, [setCurrentAudio])

  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book/:id' element={<ContentBook />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Player />
    </Router>
  )
}

export default App
