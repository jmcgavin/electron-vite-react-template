import styles from './App.module.css'
import './global-styles.css'
import packageConfig from '../../package.json' with { type: 'json' }

const services = [
  { name: 'Chrome', logoSrc: '/chrome.svg', version: window.electronAPI.chrome() },
  { name: 'Electron', logoSrc: '/electron.svg', version: window.electronAPI.electron() },
  { name: 'NodeJS', logoSrc: '/nodejs.svg', version: window.electronAPI.nodejs() },
  { name: 'React', logoSrc: '/react.svg', version: packageConfig.dependencies.react },
  { name: 'TypeScript', logoSrc: '/typescript.svg', version: packageConfig.devDependencies.typescript },
  { name: 'Vite', logoSrc: '/vite.svg', version: packageConfig.devDependencies.vite },
]

const App = () => {
  return (
    <>
      <h1>Electron Boilerplate</h1>
      <h2>{packageConfig.version}</h2>
      <hr />
      <h3>Electron desktop application with React, Vite & TypeScript</h3>
      <section className={styles.services}>
        {services.map((service) => (
          <div key={service.name} className={styles.service}>
            <img src={service.logoSrc} alt={service.name} />
            <p>{service.name}</p>
            <span className={styles.version}>
              <p>{service.version.replace(/^\^/, '')}</p>
            </span>
          </div>
        ))}
      </section>
    </>
  )
}

export default App
