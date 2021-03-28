import { dataPath } from './setup'
import path from 'path'
import fs from 'fs'
import { cwd } from 'process'

export interface ConfigData {
  serverPath: string
  clientPath: string
}

const configPath = path.join(dataPath, 'config.json')

export const getConfig = (): ConfigData | string => {
  if (!fs.existsSync(configPath)) {
    console.log('No configuration found: creating file with defaults')
    console.log(cwd())
    const defaultConfig: ConfigData = {
      serverPath: path.join(cwd(), '../backend', 'server', 'target', 'backend-server-1.0-SNAPSHOT.jar'),
      clientPath: path.join(cwd(), '../backend', 'client', 'target', 'backend-1.0-SNAPSHOT.jar')
    }
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig))
    return defaultConfig
  }
  return JSON.parse(fs.readFileSync(configPath).toString())
}
