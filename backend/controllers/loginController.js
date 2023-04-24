const loginService = require("../services/loginService");
const exception = require("../exceptions");

const loginController = {
  showPage: (req, res) => {
    res.render("login/index.ejs");
  },
  login: async (req, res) => {
    try {
      const loginData = req.body.loginData;
      await loginService.login(loginData);
      res.json({ status: 200 });
    } catch (e) {
      if (e instanceof exception.loginServiceException.NotExistEmail) {
        res.json({ status: 400, reason: "not exist email" });
      } else if (e instanceof exception.loginServiceException.WrongPassword) {
        res.json({ status: 400, reason: "wrong password" });
      } else {
        console.log(e);
        res.json({ status: 500 });
      }
    }
  },
};

module.exports = loginController;
