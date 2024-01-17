const ControllersRegistry = {
  loginWithPassword: (req, res) => {
    return res.status(200).json({ message: "Login with password API called." });
  },
  checkLoginOrRegister: (req, res) => {
    return res.status(200).json({ message: "checkLoginOrRegister." });
  },
};

module.exports = ControllersRegistry;
