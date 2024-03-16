const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const { inviteFriends } = require("../controllers/friendInvitationController");

const friendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});

router.post(
  "/invite",
  auth,
  validator.body(friendInvitationSchema),
  inviteFriends
);
module.exports = router;
