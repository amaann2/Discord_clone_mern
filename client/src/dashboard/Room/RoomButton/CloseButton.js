import { IconButton } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { leaveRoom } from '../../../realTimeCommunication/roomHandler'
const CloseButton = () => {

    const handleLeaveRoom = () => {
        leaveRoom()
    }
    return (
        <IconButton onClick={handleLeaveRoom} style={{ color: 'white' }}>
            <CloseIcon />
        </IconButton>
    )
}

export default CloseButton