import axios from 'axios'
import dotenv from 'dotenv'
import { getKeyValue } from './store.service.js'
import { logError } from './log.service.js'
import { capitalize } from '../helpers/capitalize.js'

dotenv.config()

const apiUrl = process.env.API_URL

const getData = async () => {
  try {
    const city = await getKeyValue('city')
    // console.log("go")
    const apiKey = await getKeyValue('token')

    const res = await axios.get(`${apiUrl}/weather?q=${city}&appid=${apiKey}`)
    return res.data
  } catch (err) {
    if (!!err?.response?.data?.message) {
      logError(capitalize(err.response.data.message))
    } else {
      logError(err)
    }
  }
}

export { getData }
