import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/electron-vite.animate.svg'

const App = () => {
  const handleElectronViteClick = () => {
    window.open('https://electron-vite.github.io', '_blank')
  }

  const handleReactClick = () => {
    window.open('https://react.dev', '_blank')
  }

  return (
    <>
      <h1>
        Electron Vite
        <br />+<br />
        React
      </h1>
      <section className="container">
        <img src={viteLogo} alt="Vite logo" onClick={handleElectronViteClick} />
        +
        <img src={reactLogo} className="react" alt="React logo" onClick={handleReactClick} />
      </section>
    </>
  )
}

export default App
