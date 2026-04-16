import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'

import ConnectionBackground from './components/ConnectionBackground'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/portfolio/`, {
      signal: controller.signal
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok')
        return response.json()
      })
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        if (error.name === 'AbortError') return
        console.error('Error fetching data:', error)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  if (loading) {
    return (
      <>
        <ConnectionBackground />
        <Navbar />
        <div className="flex flex-col justify-center items-center h-screen text-white">
          <div className="w-12 h-12 border-2 border-primary-accent border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-primary-accent/80 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Initializing Layout...</p>
        </div>
      </>
    )
  }

  if (!data) {
    return <div className="flex justify-center items-center h-screen text-white">Error loading data</div>
  }

  return (
    <>
      <ConnectionBackground />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/about" element={<About data={data} />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer data={data} />
    </>
  )
}

export default App
