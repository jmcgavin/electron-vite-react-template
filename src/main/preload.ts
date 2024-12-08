import { contextBridge, ipcRenderer } from 'electron'

declare global {
  interface Window {
    // [electronAPIKey]: typeof electronAPI
    [electronAPIKey]: import('electron').IpcRenderer
  }
}

export const electronAPIKey = 'electronAPI'

// --------- Expose some APIs to the Renderer process ---------
const electronAPI = {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APIs you need here...
}

contextBridge.exposeInMainWorld(electronAPIKey, electronAPI)
