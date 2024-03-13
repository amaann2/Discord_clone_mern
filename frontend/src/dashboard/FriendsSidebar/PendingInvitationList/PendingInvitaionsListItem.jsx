import React, { useState } from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import Avatar from '../../../shared/components/Avatar'
import InvitationDecisionButtons from './InvitationDecisionButtons'
const PendingInvitaionsListItem = (
    {
        username,
        mail,
        id,
        acceptFriendInvitaion = () => { },
        rejectFriendInvitaion = () => { }
    }
) => {
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const handleAcceptInvitation = () => {
        acceptFriendInvitaion({ id })
        setButtonDisabled(true)
    }
    const handleRejectInvitation = () => {
        rejectFriendInvitaion({ id })
        setButtonDisabled(true)
    }
    return (
        <Tooltip title={mail}>
            <div
                style={{ width: '100%' }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '42px',
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Avatar username={username} />
                    <Typography
                        sx={{
                            marginLeft: '7px',
                            fontWeight: 700,
                            color: '#8e9297',
                            flexGrow: 1
                        }}
                        variant='subtitle1'
                    >{username}</Typography>
                    <InvitationDecisionButtons
                        disabled={buttonDisabled}
                        acceptInvitationHandler={handleAcceptInvitation}
                        rejectInvitationHandler={handleRejectInvitation}
                    />
                </Box>
            </div>
        </Tooltip>
    )
}

export default PendingInvitaionsListItem