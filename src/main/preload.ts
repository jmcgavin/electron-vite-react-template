import { contextBridge, ipcRenderer } from 'electron'

// Declare preloaded API as a global for TS autocomplete in renderer process
declare global {
  interface Window {
    [electronAPIKey]: typeof electronAPI
  }
}

// The name of your preloaded API
export const electronAPIKey = 'electronAPI'

const electronAPI = {
  /**
   * Version of Chrome included in Electron process
   */
  chrome: process.versions.chrome,
  /**
   * Version of Electron
   */
  electron: process.versions.electron,
  /**
   * Version of NodeJs included in Electron process
   */
  nodejs: process.versions.node,
  /**
   * Send a message to the main process to open a dilog
   */
  showDialog: (options: Electron.MessageBoxOptions): Promise<number> => ipcRenderer.invoke('dialog:open', options),
  /**
   * Send a message to the main process when the DOM is ready to receive communications
   */
  rendererReady: (): void => ipcRenderer.send('renderer:ready'),
  /**
   *
   */
  sendMessage: (
    callback: (message: string) => void,
  ): ((_event: Electron.IpcRendererEvent, message: string) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, message: string) => callback(message)
    ipcRenderer.on('main:message', listener)
    // Return the listener so it may be removed later with removeMessageListener
    return listener
  },
  /**
   * Remove sendMessage listener
   */
  removeMessageListener: (listener: (_event: Electron.IpcRendererEvent, message: string) => void) =>
    ipcRenderer.off('main:message', listener),

  // You can expose other APIs you need here...
}

contextBridge.exposeInMainWorld(electronAPIKey, electronAPI)
