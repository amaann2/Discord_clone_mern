import { styled } from "@mui/system"
import PendingInvitaionsListItem from "./PendingInvitaionsListItem"
const DUMMY_INVITATION = [
    {
        _id: '1',
        senderId: {
            username: 'Mark',
            mail: 'dummy@gmail.com'
        }
    },
    {
        _id: '2',
        senderId: {
            username: 'John',
            mail: 'john@gmail.com'
        }
    }
]
const MainContainer = styled('div')({
    width: '100%',
    height: '22%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
})

const PendingInvitationList = () => {
    return (
        <MainContainer>
            {DUMMY_INVITATION.map((invitaion) => (
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

export default PendingInvitationList