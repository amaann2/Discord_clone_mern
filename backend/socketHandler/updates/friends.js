const FriendInvitation = require("../../models/freindsInvitation");
const User = require("../../models/userModel");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitation = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username mail");

    // find all active connection for specific userId
    const receiverList = serverStore.getActiveUsers(userId);

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

const updateFriends = async (userId) => {
  try {
    // find all active connection for specific userId
    let receiverList = serverStore.getActiveUsers(userId);

    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username mail"
      );
      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
          };
        });
        // get Io instance
        const io = serverStore.getSocketServerInstance();

        receiverList.forEach((receiversocketid) => {
          io.to(receiversocketid).emit("friends-list", {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateFriendsPendingInvitation, updateFriends };
