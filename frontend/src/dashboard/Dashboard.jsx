import { styled } from '@mui/system'
import SideBar from './Sidebar/SIdebar'
import FriendsSideBar from './FriendsSidebar/FriendsSideBar'
import Messanger from './Messanger/Messanger'
import AppBar from './AppBar/AppBar'
import { useEffect } from 'react'
import { logout } from '../shared/utils/auth'
import { connect } from 'react-redux'
import { getActions } from '../store/actions/authActions'

const Wrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex'
})
const Dashboard = ({setUserDetails}) => {

    useEffect(() => {
        const userDetails = localStorage.getItem('user')

        if (!userDetails) {
            logout()
        } else {
            setUserDetails(JSON.parse(userDetails))
        }
    }, [])
    return (
        <Wrapper>
            <SideBar />
            <FriendsSideBar />
            <Messanger />
            <AppBar />
        </Wrapper>
    )
}
const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch)
    }
}
export default connect(null, mapActionsToProps)(Dashboard)