import { LayoutContent } from '@/layouts/LayoutContent'
import { useLocation } from 'react-router-dom'


export const Home = () => {
  const { search } = useLocation()
  const query = search.split('=')[1]

  return !search ? (
    <LayoutContent
      title='Sugerencias'
      url='http://localhost:4000/api/book/?section=sugerencias'
    />
  ) : (
    <LayoutContent
      title='Resultados'
      url={`http://localhost:4000/api/book?search=${query}`}
    />
  )
}
