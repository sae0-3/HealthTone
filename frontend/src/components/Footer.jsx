import { useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../styles/footer.css'

export const Footer = () => {
    const [isPlay, setIsPlay] = useState(false)
    const [barVisible, setBarVisible] = useState(false)

    const handlePlay = () => {
        setIsPlay(!isPlay?true:false)
    }

    const handleVolumeClick = () => {
        setBarVisible(barVisible?false:true)
    }

    return (
        <>


            <footer className="text-white text-center">
                <p className="mb-0">

                    <div className='content-footer d-flex justify-content-between align-items-center'>

                        <div className='d-flex justify-content-start align-items-center'>
                            <img src="foto" alt="poster-img" style={{ width: '100%', height: '6rem', maxWidth: '6rem', background: 'blue' }} />
                            <div className='d-flex flex-column justify-content-center ms-3'>
                                <h3>Title</h3>
                                <p>Autor</p>
                            </div>
                        </div>

                        <div className='d-flex flex-column align-items-center' style={{ width: '100%', maxWidth: '50rem' }}>
                            <div className='d-flex justify-content-center'>
                                <button className="large-icon mx-2">
                                    <i className="bi bi-skip-backward" style={{ fontSize: '3rem' }}></i>
                                </button>
                                <button className="large-icon mx-2">
                                    <i className="bi bi-skip-start-fill" style={{ fontSize: '3rem' }}></i>
                                </button>
                                <button className="large-icon mx-2">
                                    <i
                                        className={isPlay ? "bi bi-pause-fill" : "bi bi-play-fill"}
                                        style={{ fontSize: '3rem' }}
                                        onClick={handlePlay}>
                                    </i>
                                </button>
                                <button className="large-icon mx-2">
                                    <i className="bi bi-skip-end-fill" style={{ fontSize: '3rem' }}></i>
                                </button>
                                <button className="large-icon mx-2">
                                    <i className="bi bi-skip-forward" style={{ fontSize: '3rem' }}></i>
                                </button>
                            </div>
                            <div className='d-flex justify-content-center align-items-center flex-row mt-2' style={{ width: '100%', maxWidth: '50rem' }}>
                                <p className='me-2' style={{ margin: '0' }}>Time Left</p>
                                <ProgressBar now={60} style={{ width: '100%', maxWidth: '30rem' }} />
                                <p className='ms-2' style={{ margin: '0' }}>Time Right</p>
                            </div>
                        </div>

                        <div className='d-flex align-items-center'>
                            <button className="large-icon mx-2">
                                <i className="bi bi-arrow-counterclockwise" style={{ fontSize: '3rem' }}></i>
                            </button>

                            <div className='volume-settings d-flex align-items-center mx-2' style={{ position: 'relative' }}>
                                <button className="large-icon ms-2" onClick={handleVolumeClick}>
                                    <i className="bi bi-volume-up" style={{ fontSize: '3rem' }}></i>
                                </button>
                                {barVisible &&
                                    <div className='volume-bar'>
                                        <ProgressBar now={60} style={{ height: '1.5rem' }} />
                                    </div>}
                            </div>
                            <button
                                className="large-icon mx-2"
                                style={{ border: 'none', borderRadius: '.7rem', fontSize: '2.5rem', margin: '0', padding: '0', lineHeight: '1' }}
                            >
                                <i className="bi bi-chevron-up" style={{ fontSize: '3rem', display: 'block', margin: '0' }}></i>
                            </button>
                        </div>
                    </div>


                </p>
            </footer>
        </>
    )
}

