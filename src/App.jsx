import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const About = lazy(() => import('./pages/About'))
const Resume = lazy(() => import('./pages/Resume'))

const Spinner = ({ label }) => (
  <div className="flex flex-col justify-center items-center h-screen bg-cream">
    <div className="w-10 h-10 border-2 border-primary-accent border-t-transparent rounded-full" style={{ animation: 'spin 1s linear infinite' }}></div>
    <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-soft">{label}</p>
  </div>
)

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const location = useLocation()
  const [shown, setShown] = useState(location)
  const [phase, setPhase] = useState('idle') // idle | cover | reveal
  const timers = useRef([])

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/portfolio/`, { signal: controller.signal })
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

  // Route change: curtain rises, page swaps underneath, curtain leaves.
  useEffect(() => {
    if (location.pathname === shown.pathname) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timers.current.forEach(clearTimeout)
    if (reduced) {
      setShown(location)
      window.scrollTo(0, 0)
      return undefined
    }
    setPhase('cover')
    timers.current = [
      setTimeout(() => {
        setShown(location)
        window.scrollTo({ top: 0, behavior: 'instant' })
        setPhase('reveal')
      }, 460),
      setTimeout(() => setPhase('idle'), 1060),
    ]
    return () => timers.current.forEach(clearTimeout)
  }, [location, shown.pathname])

  if (loading) return <Spinner label="Loading" />

  if (!data) {
    return <div className="flex justify-center items-center h-screen text-ink">Error loading data</div>
  }

  return (
    <>
      <div className="curtain" data-phase={phase} aria-hidden="true"></div>
      <Navbar />
      <Suspense fallback={<Spinner label="Loading" />}>
        <div key={shown.pathname} className="page-in">
          <Routes location={shown}>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/about" element={<About data={data} />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </Suspense>
      <Footer data={data} />
    </>
  )
}

export default App
