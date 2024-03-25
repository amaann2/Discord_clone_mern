import {
  setActiveRooms,
  setLocalStream,
  setOpenRoom,
  setRoomDetails,
} from "../store/actions/roomActions";
import store from "../store/store";
import { createNewwRoom, joinRoomm, leaveRoomm } from "./socketConnection";
import { getLocalStreamPreview } from "./webRTCHandler";

export const createNewRoom = () => {
  const successCalbackFUnc = () => {
    store.dispatch(setOpenRoom(true, true));
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
  activeRooms.forEach((room) => {
    friends.forEach((f) => {
      if (f.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUsername: f.username });
      }
    });
  });
  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  const successCalbackFUnc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
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
  leaveRoomm({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
