import './styles.css'
import styles from './App.module.css'

const App = () => {
  return (
    <>
      <h1>Electron Boilerplate</h1>
      <h2>Desktop application with Electron, React, Vite & TypeScript</h2>
      <section className={styles.container}>
        <img src="/chrome.svg" alt="Chrome logo" />
        <img src="/electron.svg" alt="Electron logo" />
        <img src="/nodejs.svg" alt="Node.js logo" />
        <img src="/react.svg" alt="React logo" />
        <img src="/typescript.svg" alt="TypeScript logo" />
        <img src="/vite.svg" alt="Vite logo" />
      </section>
    </>
  )
}

export default App
