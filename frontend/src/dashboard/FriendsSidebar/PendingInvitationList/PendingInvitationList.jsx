import { styled } from "@mui/system"
import PendingInvitaionsListItem from "./PendingInvitaionsListItem"
import { connect } from 'react-redux'
const MainContainer = styled('div')({
    width: '100%',
    height: '22%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
})

const PendingInvitationList = ({ pendingFriendsInvitations }) => {
    return (
        <MainContainer>
            {pendingFriendsInvitations?.map((invitaion) => (
                <PendingInvitaionsListItem
                    key={invitaion._id}
                    id={invitaion._id}
                    username={invitaion.senderId.username}
                    mail={invitaion.senderId.mail}
                />
            ))}
        </MainContainer>
    )
}


const mapActionsToProps = ({ friends }) => {
    return {
        ...friends,
    }
}
export default connect(mapActionsToProps)(PendingInvitationList)