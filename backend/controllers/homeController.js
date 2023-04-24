const homeController = {
  showPage: (req, res) => {
    res.render("home/index.ejs");
  },
};

module.exports = homeController;
