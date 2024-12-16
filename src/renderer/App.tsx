import { useCallback, useEffect, useRef } from 'react'

import styles from './App.module.css'
import './global-styles.css'
import packageConfig from '../../package.json' with { type: 'json' }

const services = [
  { name: 'Chrome', logoSrc: '/chrome.svg', version: window.electronAPI.chrome },
  { name: 'Electron', logoSrc: '/electron.svg', version: window.electronAPI.electron },
  { name: 'NodeJS', logoSrc: '/nodejs.svg', version: window.electronAPI.nodejs },
  { name: 'React', logoSrc: '/react.svg', version: packageConfig.dependencies.react },
  { name: 'TypeScript', logoSrc: '/typescript.svg', version: packageConfig.devDependencies.typescript },
  { name: 'Vite', logoSrc: '/vite.svg', version: packageConfig.devDependencies.vite },
]

const App = () => {
  const isReadyCalled = useRef(false)
  const responseElement = useRef<HTMLPreElement>(null)

  const printResponse = useCallback(
    (message: string) => {
      const pre = responseElement.current
      if (!pre) return

      const span = document.createElement('span')
      span.textContent = `\n${new Date().toISOString()} `
      span.className = styles.comment

      const messageText = document.createTextNode(message)

      pre.appendChild(span)
      pre.appendChild(messageText)
      pre.scrollTop = pre.scrollHeight
    },
    [responseElement],
  )

  const handleShowDialog = async () => {
    const dialogOptions: Electron.MessageBoxSyncOptions = {
      type: 'question',
      message: 'Send a message back to the renderer process',
      detail: 'Which do you prefer?',
      buttons: ['Cancel', 'I like cats', 'I like dogs'],
    }
    const response = await window.electronAPI.showDialog(dialogOptions)
    if (response) printResponse(dialogOptions.buttons[response])
  }

  useEffect(() => {
    if (!isReadyCalled.current) {
      window.electronAPI.rendererReady()
      isReadyCalled.current = true
    }

    const listener = window.electronAPI.sendMessage((message) => {
      printResponse(message)
    })

    return () => {
      // Cleanup listener on component unmount
      window.electronAPI.removeMessageListener(listener)
    }
  }, [printResponse])

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
              <p>{service.version}</p>
            </span>
          </div>
        ))}
      </section>
      <hr />
      <h3>Interact with Electron&apos;s main process</h3>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button onClick={handleShowDialog}>Open Dialog</button>
      <pre ref={responseElement}>
        <span className={styles.comment}># Inter-process communication (IPC) messages will appear here</span>
      </pre>
    </>
  )
}

export default App
