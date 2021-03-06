import path from 'path'
import os from 'os'
import fs from 'fs'
import randomstring from 'randomstring'
import { StorageData } from './types'

export const dataPath = path.join(os.homedir(), '.sft')
export const storagePath = path.join(dataPath, 'storage.json')
export const contactsPath = path.join(dataPath, 'contacts.json')

const setup = async () => {
  if (fs.existsSync(storagePath)) {
    return false
  }
  // Else create storage file with info
  const ipResponse = await fetch('https://checkip.amazonaws.com')
  if (!ipResponse.ok) {
    // todo alert user of error
    return false
  }
  const ip = (await ipResponse.text())?.replace('\n', '')
  const password = randomstring.generate(10)
  const userId = btoa(`${password}@${ip}`)
  const data: StorageData = { userId }
  console.log(data)
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true })
  }
  fs.writeFileSync(storagePath, JSON.stringify(data), {})
  if (!fs.existsSync(contactsPath)) {
    fs.writeFileSync(contactsPath, JSON.stringify([]), {})
  }
  return true
}

export default setup
