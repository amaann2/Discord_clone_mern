import { useState } from 'react'
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton'
import AddFriendDialog from './AddFriendDialog'

const additionalStyles = {
    marginTop: '10px',
    marginLeft: '5px',
    width: '100%',
    height: '30px',
    background: '#3ba55d'
}

const AddFriendButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const handleOpenAddFriendDialog = () => {
        setIsDialogOpen(true)
    }
    const closeAddFriendDialogHandler = () => {
        setIsDialogOpen(false)
    }
    return (
        <div>
            <CustomPrimaryButton
                additionalStyles={additionalStyles} label='Add Friend '
                onClick={handleOpenAddFriendDialog}
            />
            <AddFriendDialog
                isDialogOpen={isDialogOpen}
                closeDialogHandler={closeAddFriendDialogHandler}
            />
        </div>
    )
}

export default AddFriendButton