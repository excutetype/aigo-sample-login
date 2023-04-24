const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

router.get("/register", registerController.showPage);
router.post("/api/register", registerController.register);

module.exports = router;
