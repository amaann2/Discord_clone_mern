import { styled } from '@mui/system';
import AddFriendButton from './AddFriendButton';
import FriendTitle from './FriendTitle';
import FriendsList from './FriendsList/FriendsList';
import PendingInvitationList from './PendingInvitationList/PendingInvitationList';
const MainContainer = styled('div')({
    width: '224px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2F3136'
})
const FriendsSideBar = () => {
    return (
        <MainContainer>
            <AddFriendButton />
            <FriendTitle title='private messages' />

            <FriendsList />
            <FriendTitle title='Invitations' />
            <PendingInvitationList />


        </MainContainer>
    )
}

export default FriendsSideBar