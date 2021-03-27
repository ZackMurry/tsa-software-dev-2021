import { createContext } from 'react'
import { StorageData } from './types'

export interface StorageContext {
  storage: StorageData | null
  updateStorage: (data: StorageData) => void
}

export const storageContext = createContext<StorageContext | null>(null)
