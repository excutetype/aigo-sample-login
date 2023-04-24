const registerService = require("../services/registerService");
const exception = require("../exceptions");

const registerController = {
  showPage: (req, res) => {
    res.render("register/index.ejs");
  },
  register: async (req, res) => {
    try {
      const registerData = req.body.registerData;
      await registerService.register(registerData);
      res.json({ status: 200 });
    } catch (e) {
      if (e instanceof exception.registerServiceException.ExistEmail) {
        res.json({ status: 400, reason: "exist email" });
      } else if (e instanceof exception.registerServiceException.ExistEmail) {
        res.json({ status: 500 });
      } else {
        res.json({ status: 500 });
      }
    }
  },
};

module.exports = registerController;
