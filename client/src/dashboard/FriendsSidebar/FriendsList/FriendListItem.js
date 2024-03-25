
import Button from '@mui/material/Button'
import Avatar from '../../../shared/components/Avatar'
import { Typography } from '@mui/material'
import OnlineIndicator from './OnlineIndicator'
import { ChatTypes, setChosenChatDetails } from '../../../store/actions/chatActions'
import { useDispatch } from 'react-redux'

const FriendListItem = ({ username, id, isOnline }) => {
    const dispatch = useDispatch()

    const handleChooseActiveConverstaion = () => {
        dispatch(setChosenChatDetails({ id: id, name: username }, ChatTypes.DIRECT))
    }
    return (
        <Button
            onClick={handleChooseActiveConverstaion}
            style={{
                width: '100%',
                height: '42px',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                textTransform: 'none',
                color: 'black',
                position: 'relative'

            }}
        >
            <Avatar username={username} />
            <Typography
                style={{
                    marginLeft: '7px',
                    fontWeight: 700,
                    color: '#839297'
                }}
                variant='subtitle1'
                align='left'
            >
                {username}
            </Typography>
            {isOnline && <OnlineIndicator />}
        </Button>
    )
}

export default FriendListItem