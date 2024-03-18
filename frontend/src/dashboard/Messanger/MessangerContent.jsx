import { useEffect } from 'react'
import { styled } from '@mui/system'
import Messages from './Messages/Messages'
import NewMessageInput from './NewMessageInput'
import { useSelector } from 'react-redux'
const Wrapper = styled('div')({
    flexGrow: 1,

})
const MessangerContent = () => {
    const { chosenChatDetails } = useSelector(state => state.chat)
    console.log(chosenChatDetails)
    useEffect(() => {
        // fetching chat history from specific user id
    }, [chosenChatDetails])
    return (
        <Wrapper>
            <Messages />
            <NewMessageInput />
        </Wrapper>
    )
}

export default MessangerContent