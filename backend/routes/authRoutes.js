const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();
const Joi = require("joi");
const verifyToken = require("../middleware/auth");
const validator = require("express-joi-validation").createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});
const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

router.post("/register", validator.body(registerSchema), register);

router.post("/login", validator.body(loginSchema), login);
router.get("/test", verifyToken, (req, res) => {
  res.send("test");
});
module.exports = router;
