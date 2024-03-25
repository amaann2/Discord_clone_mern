import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import CloseFullScreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const MainContainer = styled("div")({
  position: "absolute",
  right: "10px",
  bottom: "5px",
});
const ResizeRoomButton = ({ isRoomMinimized, handleRoomResize }) => {
  return (
    <MainContainer>
      <IconButton style={{ color: "white" }} onClick={handleRoomResize}>
        {isRoomMinimized ? <OpenInFullIcon /> : <CloseFullScreenIcon />}
      </IconButton>
    </MainContainer>
  );
};

export default ResizeRoomButton;
