import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/portfolio/')
      .then(response => response.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Loading...</div>
  }

  if (!data) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Error loading data</div>
  }

  return (
    <>
      <nav className="glass-nav animate-enter">
        <div className="logo">Saad.</div>
        <ul className="nav-links">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Let's Talk</a>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero container animate-enter">
        <h1 className="gradient-text">
          Building the <br />
          <span className="highlight">Digital Future</span>
        </h1>
        <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          {data.hero.subtitle}. Crafting exceptional digital experiences with code and creativity.
        </p>
        <div className="cta-buttons">
          <a href="#work" className="btn btn-primary">{data.hero.cta_primary}</a>
          <a href="#contact" className="btn btn-secondary">{data.hero.cta_secondary}</a>
        </div>
      </section>

      {/* Bento Grid Section (Work & Skills) */}
      <section id="work" className="section container">
        <h2 className="animate-enter">Selected Work</h2>

        <div className="bento-grid">
          {/* Main Project - Large */}
          {data.projects[0] && (
            <div className="bento-item bento-item-lg project-card">
              <div style={{ height: '250px', background: 'linear-gradient(45deg, #111, #222)', borderRadius: '1rem', marginBottom: '1.5rem' }}></div>
              <div className="project-content">
                <h3>{data.projects[0].title}</h3>
                <p>{data.projects[0].description}</p>
                <a href={data.projects[0].link} className="project-link">View Case Study &rarr;</a>
              </div>
            </div>
          )}

          {/* About/Bio Block - Medium */}
          <div className="bento-item bento-item-md" style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(112,0,255,0.1))' }}>
            <h3>About Me</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.6' }}>
              {data.about.description}
            </p>
          </div>

          {/* Second Project - Medium */}
          {data.projects[1] && (
            <div className="bento-item bento-item-md project-card">
              <div style={{ height: '200px', background: 'linear-gradient(45deg, #1a1a1a, #333)', borderRadius: '1rem', marginBottom: '1.5rem' }}></div>
              <div className="project-content">
                <h3>{data.projects[1].title}</h3>
                <p>{data.projects[1].description}</p>
                <a href={data.projects[1].link} className="project-link">View Project &rarr;</a>
              </div>
            </div>
          )}

          {/* Skills Block - Small/Medium */}
          <div className="bento-item bento-item-lg">
            <h3 style={{ marginBottom: '1.5rem' }}>Tech Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {data.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  <i className={skill.icon} style={{ marginRight: '8px' }}></i>
                  {skill.name}
                </div>
              ))}
              <div className="skill-tag">React</div>
              <div className="skill-tag">Next.js</div>
              <div className="skill-tag">Tailwind</div>
              <div className="skill-tag">Node.js</div>
            </div>
          </div>

          {/* Contact Callout - Small */}
          <div className="bento-item bento-item-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'var(--primary-accent)' }}>
            <div>
              <h3 style={{ color: 'black', marginBottom: '0.5rem' }}>Have an idea?</h3>
              <a href="#contact" className="btn" style={{ background: 'black', color: 'white', marginTop: '1rem' }}>Get in touch</a>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section container">
        <h2 style={{ textAlign: 'center' }}>Start a Project</h2>
        <div className="contact-form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <input type="text" placeholder="What's your name?" className="input-field" />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Your email address" className="input-field" />
            </div>
            <div className="input-group">
              <textarea placeholder="Tell me about your project..." rows="5" className="input-field"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Saad. Designed & Built with ❤️</p>
      </footer>
    </>
  )
}

export default App
