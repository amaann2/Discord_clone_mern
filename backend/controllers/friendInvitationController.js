const FriendInvitation = require("../models/freindsInvitation");
const User = require("../models/userModel");
const {
  updateFriendsPendingInvitation,
  updateFriends,
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

  // check if the user which we would like to invite is already our friends
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

exports.acceptInvitation = async (req, res) => {
  try {
    const { id } = req.body;

    const invitation = await FriendInvitation.findById(id);
    if (!invitation) {
      return res.status(401).send("Error occured. Please try again");
    }

    const { senderId, receiverId } = invitation;

    // add friends to both user

    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    // delete invitaion

    await FriendInvitation.findByIdAndDelete(id);

    // update list of the friends if the user are online
    updateFriends(senderId.toString());
    updateFriends(receiverId.toString());
    // update list of friends pending invitation
    updateFriendsPendingInvitation(receiverId.toString());

    return res.status(200).send("Friends successfully added");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong please try again");
  }
};
exports.rejectInvitation = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    // rmeove that invitation from friends invitaions collection db

    const invitationExists = await FriendInvitation.exists({ _id: id });
    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
    }

    // update pending invitations
    updateFriendsPendingInvitation(userId);

    return res.status(200).send("Invitation Successfully rejected");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong please try again");
  }
};
