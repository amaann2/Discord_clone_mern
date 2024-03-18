import { styled } from '@mui/system';
import { useSelector } from 'react-redux'
import WelcomeMessage from './WelcomeMessage'
import MessangerContent from './MessangerContent'
const MainContainer = styled('div')({
    flexGrow: 1,
    backgroundColor: '#36393f',
    display: 'flex',
    marginTop: '48px'
})
const Messanger = () => {
    const { chosenChatDetails } = useSelector(state => state.chat)


    return (
        <MainContainer>
            {!chosenChatDetails ? <WelcomeMessage /> : <MessangerContent />}
        </MainContainer>
    )
}

export default Messanger