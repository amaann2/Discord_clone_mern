import React, { useEffect, useState } from 'react'
import { validateMail } from '../../shared/utils/validator'
import { Dialog, DialogTitle, Typography } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import InputLabel from '../../shared/components/InputLabel'
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton'
import { connect } from 'react-redux'
import { getActions } from '../../store/actions/friendsAction'


const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler,
    sendFriendsInvitation = () => { }
}) => {
    const [mail, setMail] = useState('')
    const [isFormValid, setIsFormValid] = useState('')
    const handleSendInvitation = () => {
        sendFriendsInvitation({ targetMailAddress: mail }, closeDialogHandler)
    }
    const handleCloseDialog = () => {
        closeDialogHandler()
        setMail('')
    }
    useEffect(() => {
        setIsFormValid(validateMail(mail))
    }, [mail, setIsFormValid])
    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} >
                <DialogTitle>
                    <Typography>Invite a Friend</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Enter e-mail address of friend which you would like to invite</Typography>
                    </DialogContentText>
                    <br />
                    <InputLabel
                        label='Mail'
                        type='text'
                        value={mail}
                        setValue={setMail}
                        placeholder='Enter mail address'
                    />
                </DialogContent>
                <DialogActions>
                    <CustomPrimaryButton
                        onClick={handleSendInvitation}
                        disabled={!isFormValid}
                        label='Send'
                        additionalStyles={{
                            marginLeft: '15px',
                            marginRight: '15px',
                            marginBottom: '10px',
                        }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch)
    }
}

export default connect(null, mapActionsToProps)(AddFriendDialog)