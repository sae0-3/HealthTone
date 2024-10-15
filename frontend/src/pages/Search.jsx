import { LayoutContent } from '@/layouts/LayoutContent'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


export const Search = () => {
  const location = useLocation()
  const [search, setSearch] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const searchQuery = params.get('input')
    setSearch(searchQuery)
  }, [location.search])

  return (
    <LayoutContent title='Resultados' search={search} />
  )
}
