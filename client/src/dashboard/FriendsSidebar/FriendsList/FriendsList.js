import { styled } from "@mui/system"
import FriendListItem from "./FriendListItem"
import { connect } from 'react-redux'

const MainContainer = styled('div')({
    flexGrow: 1,
    width: '100%'
})
const FriendsList = ({ friendsList, onlineUsers }) => {
    const checkOnlineUsers = (friendsList = [], onlineUsers = []) => {
        friendsList.forEach(f => {
            const isUserOnline = onlineUsers.find(user => user.userId === f.id)
            f.isOnline = isUserOnline ? true : false
        })

        return friendsList
    }
    return (
        <MainContainer>
            {checkOnlineUsers(friendsList, onlineUsers)?.map((f) => (
                <FriendListItem
                    username={f.username}
                    id={f.id}
                    key={f.id}
                    isOnline={f.isOnline}
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
export default connect(mapActionsToProps)(FriendsList)