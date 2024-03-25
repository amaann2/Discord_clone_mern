import React from "react";
import { styled } from "@mui/system";
import CameraButton from "./CameraButton";
import CloseButton from "./CloseButton";
import MicButton from "./MicButton";
import ScreenShareButton from "./ScreenShareButton";
import { useSelector } from "react-redux";
const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const RoomButton = () => {
  const { localStream, isUserJoinedWithOnlyAudio } = useSelector(
    (state) => state.room
  );

  return (
    <MainContainer>
      {!isUserJoinedWithOnlyAudio && <ScreenShareButton />}
      <MicButton localStream={localStream} />
      <CloseButton />
      {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} />}
    </MainContainer>
  );
};

export default RoomButton;
