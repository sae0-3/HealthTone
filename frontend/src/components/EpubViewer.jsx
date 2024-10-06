import { useRef, useEffect } from 'react'
import Epub from 'epubjs'


export const EpubViewer = ({ url }) => {
  const viewerRef = useRef(null)
  const bookRef = useRef(null)
  console.log(url);
  

  useEffect(() => {
    if (url) {
      bookRef.current = Epub(url)
      bookRef.current.renderTo(viewerRef.current)
    }

    return () => {
      if (bookRef.current) {
        bookRef.current.destroy()
      }
    }
  }, [url])

  return (
    <div>
      <div ref={viewerRef} style={{ height: '600px', overflow: 'auto' }}></div>
    </div>
  )
}
