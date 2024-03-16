const FriendInvitation = require("../models/freindsInvitation");
const User = require("../models/userModel");
const {
  updateFriendsPendingInvitation,
} = require("../socketHandler/updates/friends");

exports.inviteFriends = async (req, res) => {
  const { targetMailAddress } = req.body;
  const { userId, mail } = req.user;

  // check if friend that we would like to invite is not user
  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(400)
      .send("Sorry, You cannot become friend with yourself");
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });
  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. Please check mail address`
      );
  }

  // check if invitation has been already sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });
  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent");
  }

  // check if the user which we would like to invite is alreayd our friends
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );
  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Friend Already added.Please check friends list");
  }

  // create new invitaion and save into database
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // if invitation has been successfully created we would like to update friends invitaion if other user is online

  // send pending invitaion update to specific user
  updateFriendsPendingInvitation(targetUser._id.toString());

  return res.status(201).send("Invitation has been sent!");
};
