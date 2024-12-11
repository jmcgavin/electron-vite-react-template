import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Use contextBridge
// window.electronAPI.on('main-process-message', (_event, message) => {
//   console.log(message)
// })
