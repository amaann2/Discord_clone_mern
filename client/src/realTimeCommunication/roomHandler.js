import {
  setActiveRooms,
  setIsUserJoinedOnlyWithAudio,
  setLocalStream,
  setOpenRoom,
  setRemoteStream,
  setRoomDetails,
  setScreenSharingStream,
} from "../store/actions/roomActions";
import store from "../store/store";
import { createNewwRoom, joinRoomm, leaveRoomm } from "./socketConnection";
import { closeAllConnections, getLocalStreamPreview } from "./webRTCHandler";

export const createNewRoom = () => {
  const successCalbackFUnc = () => {
    store.dispatch(setOpenRoom(true, true));
    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    createNewwRoom();
  };

  const audioOnly = store.getState().room.audioOnly;

  getLocalStreamPreview(audioOnly, successCalbackFUnc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;

  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;

  const friends = store.getState().friends.friendsList;

  const rooms = [];
  const userId = store.getState().auth?.userDetails?._id;

  activeRooms.forEach((room) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;
    if (isRoomCreatedByMe) {
      rooms.push({ ...room, creatorUsername: "Me" });
    } else {
      friends.forEach((f) => {
        if (f.id === room.roomCreator.userId) {
          rooms.push({ ...room, creatorUsername: f.username });
        }
      });
    }
  });
  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  const successCalbackFUnc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    joinRoomm({ roomId });
  };
  const audioOnly = store.getState().room.audioOnly;
  getLocalStreamPreview(audioOnly, successCalbackFUnc);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;

  const localstream = store.getState().room.localStream;
  if (localstream) {
    localstream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  const screenSharingStream = store.getState().room.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((t) => t.stop());
    store.dispatch(setScreenSharingStream(null));
  }
  store.dispatch(setRemoteStream([]));
  closeAllConnections();

  leaveRoomm({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
