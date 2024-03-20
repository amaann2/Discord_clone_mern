import ScreenShareIcon from '@mui/icons-material/ScreenShare'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import { IconButton } from '@mui/material'
import { useState } from 'react'

const ScreenShareButton = () => {
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false)

    const handleToggleScreenShare = () => {
        setIsScreenSharingActive(!isScreenSharingActive)
    }
    return (
        <IconButton onClick={handleToggleScreenShare} style={{ color: 'white' }}>
            {isScreenSharingActive ? <ScreenShareIcon /> : <StopScreenShareIcon />}
        </IconButton>
    )
}

export default ScreenShareButton