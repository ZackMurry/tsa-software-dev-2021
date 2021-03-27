import fs from 'fs'
import { storagePath } from './setup'
import { StorageData } from './types'

const getStorage = (): StorageData | null => {
  if (!fs.existsSync(storagePath)) {
    return null
  }
  return JSON.parse(fs.readFileSync(storagePath).toString()) as StorageData
}

export default getStorage
