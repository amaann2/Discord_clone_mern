import { useState } from "react"
import { useSelector } from "react-redux"
import { styled } from '@mui/system'
import { sendDirectMessage } from "../../realTimeCommunication/socketConnection"

const MainContainer = styled('div')({
    height: '60px',
    width: '100%,',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})
const Input = styled('input')({
    backgroundColor: '#2f3136',
    width: '98%',
    height: '44px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    padding: '0 10px'
})
const NewMessageInput = () => {
    const { chosenChatDetails } = useSelector(state => state.chat)
    const [message, setMessage] = useState('')
    const handleOnchange = (e) => {
        setMessage(e.target.value)
    }
    const handleKeyPressed = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }
    const handleSendMessage = () => {
        if (message.length > 0) {
            sendDirectMessage({
                receiverUserId: chosenChatDetails.id,
                content: message
            })
            setMessage('')
        }
    }
    return (
        <MainContainer>
            <Input placeholder={`Write a message to ${chosenChatDetails?.name}`} value={message} onChange={handleOnchange} onKeyDown={handleKeyPressed} />
        </MainContainer>
    )
}

export default NewMessageInput