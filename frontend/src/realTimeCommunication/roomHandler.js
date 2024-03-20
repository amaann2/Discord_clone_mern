import {
  setActiveRooms,
  setOpenRoom,
  setRoomDetails,
} from "../store/actions/roomActions";
import store from "../store/store";
import { createNewwRoom } from "./socketConnection";

export const createNewRoom = () => {
  createNewwRoom();
  store.dispatch(setOpenRoom(true, true));
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
