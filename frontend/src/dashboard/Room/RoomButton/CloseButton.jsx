import { IconButton } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
const CloseButton = () => {
    const [cameraEnabled, setCameraEnabled] = useState(true)

    const handleLeaveRoom = () => {
        setCameraEnabled(!cameraEnabled)
    }
    return (
        <IconButton onClick={handleLeaveRoom} style={{ color: 'white' }}>
            <CloseIcon />
        </IconButton>
    )
}

export default CloseButton