import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/`, { signal: controller.signal })
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
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>
  }

  if (!data) {
    return <div className="flex justify-center items-center h-screen text-white">Error loading data</div>
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/about" element={<About data={data} />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  )
}

export default App
