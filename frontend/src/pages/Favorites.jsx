import { LayoutContent } from '@/layouts/LayoutContent'


export const Favorites = () => {
  return (
    <LayoutContent
      title='Favoritos'
      section='favoritos'
      url='http://localhost:4000/api/book/favorites' />
  )
}
