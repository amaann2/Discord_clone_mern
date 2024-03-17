const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const {
  inviteFriends,
  acceptInvitation,
  rejectInvitation,
} = require("../controllers/friendInvitationController");

const friendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});
const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.post(
  "/invite",
  auth,
  validator.body(friendInvitationSchema),
  inviteFriends
);

router.post(
  "/accept",
  auth,
  validator.body(inviteDecisionSchema),
  acceptInvitation
);
router.post(
  "/reject",
  auth,
  validator.body(inviteDecisionSchema),
  rejectInvitation
);

module.exports = router;
