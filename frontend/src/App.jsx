import { useStore } from '@/hooks/useStore'
import { Layout } from '@/layouts/Layout'
import { ContentBook } from '@/pages/ContentBook'
import { Explore } from '@/pages/Explore'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.min.css'


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
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          {/* <Route path='/book/:id' element={<ContentBook />} /> */}

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
