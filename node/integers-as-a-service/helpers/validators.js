const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  return regex.test(email);
}

const validatePassword = (password) => {
  /*
    Password requirements:
    At least one lowercase letter
    At least one uppercase letter
    At least one number
    At least one special character
    Minimum 6 characters in length
  */
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!_@#$%^&*])(?=.{8,})/

  return regex.test(password)
}

const validateInteger = (int) => {
  return parseInt(int) > -1;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateInteger
}
