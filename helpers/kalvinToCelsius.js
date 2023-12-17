const distinctKelvinCelsius = 273.15

const kelvinToCelsius = (value) => {
  return (value - distinctKelvinCelsius).toFixed(1)
}

export default kelvinToCelsius