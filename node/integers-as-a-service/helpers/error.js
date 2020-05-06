const formatError = (statusCode, detail, err = null) => {
  if (err) {
    console.error(err)
  }

  const error = {
    statusCode,
    detail
  }

  return error
}

module.exports = {
  formatError
}
