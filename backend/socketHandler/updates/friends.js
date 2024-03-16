const FriendInvitation = require("../../models/freindsInvitation");
const User = require("../../models/userModel");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitation = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username mail");

    // find all active connection for specific userId
    const receiverList = serverStore.getOnlineUsers(userId);
    
    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiversocketid) => {
      io.to(receiversocketid).emit("friends-invitations", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateFriendsPendingInvitation };
