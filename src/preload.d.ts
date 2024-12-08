import { type ElectronAPI, electronAPIKey } from './main/preload'

declare global {
  interface Window {
    [electronAPIKey]: ElectronAPI
  }
}
