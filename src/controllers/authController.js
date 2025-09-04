
const authController = {
  register: (req, res) => {
    const { name, email, password } = req.body
    // Implement registration logic
  },

  login: (req, res) => {
    const { email, password } = req.body
    // Implement login logic
  }
}

module.exports = authController