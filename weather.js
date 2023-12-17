#!/usr/bin/env node
import getArgs from "./helpers/args.js"
import { getData } from "./services/api.service.js"
import { logError, logHelp, logSucces } from "./services/log.service.js"
import { getKeyValue, setKeyValue } from './services/store.service.js'
import kelvinToCelsius from "./helpers/kalvinToCelsius.js"
import chalk from "chalk"


const saveToken = async (key, value) => {
  if (!value.length) {
    logError("Значение не передано")
    return
  }
  try {
    await setKeyValue(key, value)
    logSucces("Значение сохранено!")
  } catch (err) {
    logError("Не удалось сохранить значение")
  }
}

const showToken = async (key) => {
  const value = await getKeyValue(key)
  if (!value) {
    logError("Вы еще не задали значение")
    return
  }
  console.log(`🔑 Ваш ${key}: ${value}`)
}

const showData = async () => {
  const data = await getData()
  if (!data) {
    return
  }
  const message = `${chalk.bold('⛅ Weather in ' + data.name)}

📖 Description ${data.weather[0].description}
🌡️  Temperature ${kelvinToCelsius(data.main.temp)}°
🤒 Feels like  ${kelvinToCelsius(data.main.feels_like)}°
🤏 Preassure   ${data.main.pressure} hPa
💦 Humidity    ${data.main.humidity}%
💨 Wind speed  ${data.wind.speed} m/s
🧭 Wind deg    ${data.wind.deg}°
`

  console.log(message)
}


const initCli = async () => {
  const args = getArgs(process.argv)


  if (!Object.keys(args).length) {
    showData()
  }

  if (args.t && typeof args.t == "boolean") {
    showToken("token")
  } else if (args.t) {
    saveToken("token", args.t)
  }

  if (args.c && typeof args.c == "boolean") {
    showToken("city")
  } else if (args.c) {
    saveToken("city", args.c)
  }

  if (args.h) {
    logHelp()
  }
}

initCli()