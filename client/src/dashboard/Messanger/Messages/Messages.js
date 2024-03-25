import { useEffect, useRef } from 'react'
import { styled } from '@mui/system'
import { useSelector } from 'react-redux'
import MessagesHeader from './MessagesHeader'
import DateSeperator from './DateSeperator'
import Message from './Message'

const MainContainer = styled('div')({
    height: 'calc(100% - 60px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})
const converDateToHumanReadable = (date, format) => {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }
    return format.replace(/mm|dd|yy|yyyy/gi, (matched) => map[matched])
}
const Messages = () => {
    const { chosenChatDetails, messages } = useSelector(state => state.chat)

    return (
        <MainContainer>
            <MessagesHeader name={chosenChatDetails?.name} />
            {messages.map((message, index) => {

                const sameAuthor =
                    index > 0 &&
                    messages[index].author._id === messages[index - 1].author._id
                const sameDay = index > 0 && converDateToHumanReadable(new Date(message.date), 'dd/mm/yy') === converDateToHumanReadable(new Date(messages[index - 1].date), 'dd/mm/yy')
                return (

                    <div key={message._id} style={{ width: '97%' }}>
                        {(!sameDay || index === 0) && (
                            <DateSeperator
                                date={converDateToHumanReadable(new Date(message.date), 'dd/mm/yy')}
                            />
                        )
                        }
                        <Message
                            key={message._id}
                            content={message.content}
                            username={message.author.username}
                            sameAuthor={sameAuthor}
                            date={converDateToHumanReadable(new Date(message.date), 'dd/mm/yy')}
                            sameDay={sameDay}

                        />
                    </div>
                )
            })}
        </MainContainer>
    )
}

export default Messages