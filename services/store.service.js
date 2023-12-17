import { homedir } from 'os'
import { join, basename } from 'path'
import { promises } from 'fs'
// import { logError } from './log.service'

const filePath = join(homedir(), "weatherData.json")

const isExist = async (path) => {
  try {
    await promises.stat(path)
    return true
  } catch (err) {
    return false
  }
}

const getKeyValue = async (key) => {
  try {
    if (await isExist(filePath)) {
      const file = await promises.readFile(filePath)
      const data = JSON.parse(file)
      return data[key]
    }
  } catch (err) {
    throw new Error(`${key} не задан`)
  }

}

const setKeyValue = async (key, value) => {
  try {
    let data = {}
    if (await isExist(filePath)) {
      const file = await promises.readFile(filePath)
      data = JSON.parse(file)
    }

    data[key] = value
    await promises.writeFile(filePath, JSON.stringify(data))
  } catch (err) {
    // logError("can't set value")
    console.log(err)
  }
}

export { setKeyValue, getKeyValue }