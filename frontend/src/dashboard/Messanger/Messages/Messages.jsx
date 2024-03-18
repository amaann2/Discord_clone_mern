import { useEffect, useRef } from 'react'
import { styled } from '@mui/system'
import { useSelector } from 'react-redux'
import MessagesHeader from './MessagesHeader'
import DUMMY_MESSAGES from './DummyData'
import Message from './Message'

const MainContainer = styled('div')({
    height: 'calc(100% - 60px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})
const Messages = () => {
    const { chosenChatDetails, messages } = useSelector(state => state.chat)

    return (
        <MainContainer>
            <MessagesHeader name={chosenChatDetails?.name} />
            {DUMMY_MESSAGES.map((message, index) => {
                return <Message
                    key={message._id}
                    content={message.content}
                    username={message.author.username}
                    sameAuthor={message.sameAuthor}
                    date={message.date}
                    sameDay={message.sameDay}
                />
            })}
        </MainContainer>
    )
}

export default Messages