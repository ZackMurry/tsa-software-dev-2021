import { useCallback, useState } from 'react'
import fs from 'fs'
import getStorage from './getStorage'
import { StorageContext } from './storageContext'
import { StorageData } from './types'
import setup, { storagePath } from './setup'

const useStorage = (): StorageContext => {
  const [storage, setStorage] = useState<StorageData | null>(getStorage)

  const updateStorage = useCallback((data: StorageData): void => {
    setStorage(data)
    if (!fs.existsSync(storagePath)) {
      setup().then(() => fs.writeFileSync(storagePath, JSON.stringify(data)))
      return
    }
    fs.writeFileSync(storagePath, JSON.stringify(data))
  }, [])

  return {
    storage,
    updateStorage
  }
}

export default useStorage
