const logDev = (message) => {
  if (process.env.DEV === 'true') {
    console.log(message)
  }
}

module.exports = logDev