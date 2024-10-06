import { useState, useRef, useEffect } from 'react'
import { ReactReader } from 'react-reader'


export const EpubViewer = ({ url }) => {
  const [location, setLocation] = useState(null)
  const [volume, setVolume] = useState(1)
  const [rate, setRate] = useState(1)
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState(null)
  const renditionRef = useRef(null)

  const loadVoices = () => {
    const availableVoices = window.speechSynthesis.getVoices()
    setVoices(availableVoices)
    if (availableVoices.length > 0) {
      setSelectedVoice(availableVoices[0])
    }
  }

  useEffect(() => {
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const handleLocationChanged = (newLocation) => {
    setLocation(newLocation)
  }

  const narrateCurrentPage = () => {
    if (renditionRef.current) {
      const iframe = renditionRef.current.getContents()[0].document
      const text = iframe.body.innerText
      speak(text)
    }
  }

  const speak = (text) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.volume = volume
      utterance.rate = rate
      if (selectedVoice) utterance.voice = selectedVoice
      speechSynthesis.speak(utterance)
    } else {
      console.error("API SpeechSynthesis no disponible en este navegador.")
    }
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactReader
        url={url}
        location={location}
        locationChanged={handleLocationChanged}
        getRendition={(rendition) => {
          renditionRef.current = rendition
        }}
      />
      <div className='btn-group'>
        <button onClick={narrateCurrentPage}>Narrar Página</button>
        <button onClick={() => { window.speechSynthesis.cancel() }}>Detener</button>
        <button onClick={() => { window.speechSynthesis.pause() }}>Pausar</button>
        <button onClick={() => { window.speechSynthesis.resume() }}>Continuar</button>
      </div>
      <div>
        <label>
          Volumen:
          <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(e.target.value)} />
        </label>
        <label>
          Velocidad:
          <input type="range" min="0.1" max="10" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </label>
        <label>
          Voz:
          <select onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}>
            {voices.map((v) => (
              <option key={v.name} value={v.name}>{v.name}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
