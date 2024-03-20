export const roomActions = {
  OPEN_ROOM: "OPEN_ROOM",
  SET_ROOM_DETAILS: "SET_ROOM_DETAILS",
  SET_ACTIVE_ROOMS: "SET_ACTIVE_ROOMS",
  SET_LOCAL_STREAM: "SET_LOCAL_STREAM",
  SET_REMOTE_STREAMS: "SET_REMOTE_STREAMS",
  SET_AUDIO_ONLY: "SET_AUDIO_ONLY",
  SET_SCREEN_SHARE_STREAM: "SET_SCREEN_SHARE_STREAM",
};

export const setOpenRoom = (
  isUserRoomCreator = false,
  isUserInRoom = false
) => {
  return {
    type: roomActions.OPEN_ROOM,
    isUserRoomCreator,
    isUserInRoom,
  };
};

export const setRoomDetails = (roomDetails) => {
  return {
    type: roomActions.SET_ROOM_DETAILS,
    roomDetails,
  };
};

export const setActiveRooms = (activeRooms) => {
  return {
    type: roomActions.SET_ACTIVE_ROOMS,
    activeRooms,
  };
};
