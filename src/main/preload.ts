import { contextBridge } from 'electron'

declare global {
  interface Window {
    [electronAPIKey]: typeof electronAPI
  }
}

export const electronAPIKey = 'electronAPI'

const electronAPI = {
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  nodejs: () => process.versions.node,

  // You can expose other APIs you need here...
}

contextBridge.exposeInMainWorld(electronAPIKey, electronAPI)
