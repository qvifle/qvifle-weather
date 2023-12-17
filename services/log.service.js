import chalk from "chalk"

const logError = (error) => {
  console.log(`❌ ${chalk.red(error)}`)
}

const logSucces = (text) => {
  console.log(`✅ ${chalk.green(text)}`)
}

const logHelp = () => {
  console.log(`📝 ${chalk.cyan("Docs")}
Empty: Forecast output
-s [City] select city
-h documentation
-t [API_KEY] select token`)
}

export { logError, logSucces, logHelp }
