import VideoCamIcon from '@mui/icons-material/Videocam'
import VideoCamOffIcon from '@mui/icons-material/VideocamOff'
import { IconButton } from '@mui/material'
import { useState } from 'react'
const CameraButton = () => {
    const [cameraEnabled, setCameraEnabled] = useState(true)

    const handleToggleCamera = () => {
        setCameraEnabled(!cameraEnabled)
    }
    return (
        <IconButton onClick={handleToggleCamera} style={{ color: 'white' }}>
            {cameraEnabled ? <VideoCamIcon /> : <VideoCamOffIcon />}
        </IconButton>
    )
}

export default CameraButton