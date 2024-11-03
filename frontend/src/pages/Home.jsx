import { LayoutContent } from '@/layouts/LayoutContent'
import { useGetBooks, useGetBooksSearch } from '@/hooks/useBooks'
import { useLocation } from 'react-router-dom'


export const Home = () => {
  const { search } = useLocation()
  const query = search.split('=')[1]
  const books = !search ? useGetBooks() : null
  const booksSearch = search ? useGetBooksSearch(query) : null

  return !search
    ? <LayoutContent title='Sugerencias' content={books} />
    : <LayoutContent title='Resultados' content={booksSearch} />
}
