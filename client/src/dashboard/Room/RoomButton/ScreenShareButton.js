import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setScreenSharingStream } from "../../../store/actions/roomActions";
import { switchOutgoingTracks } from "../../../realTimeCommunication/webRTCHandler";
const constraints = {
  audio: false,
  video: true,
};
const ScreenShareButton = () => {
  const dispatch = useDispatch();
  const { isScreenSharingActive, screenSharingStream, localStream } =
    useSelector((state) => state.room);

  const handleToggleScreenShare = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (error) {
        console.log(
          "error occured when trying to get access to screen share stream"
        );
        console.log(error);
      }

      if (stream) {
        dispatch(setScreenSharingStream(stream));
        switchOutgoingTracks(stream);
      }
    } else {
      switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((t) => t.stop());
      dispatch(setScreenSharingStream(null));
    }
  };
  return (
    <IconButton onClick={handleToggleScreenShare} style={{ color: "white" }}>
      {isScreenSharingActive ? <ScreenShareIcon /> : <StopScreenShareIcon />}
    </IconButton>
  );
};

export default ScreenShareButton;
