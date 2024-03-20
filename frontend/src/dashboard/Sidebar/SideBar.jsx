import { styled } from '@mui/system';
import React from 'react'
import MainPageButton from './MainPageButton';
import CreateRoomButton from './CreateRoomButton';
import { useSelector } from 'react-redux'
import ActiveRoomButton from './ActiveRoomButton';
const MainContainer = styled('div')({
    width: '72px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#202225'

})
const SideBar = () => {
    const { activeRooms, isUserInRoom } = useSelector(state => state.room)

    return (
        <MainContainer>
            <MainPageButton />
            <CreateRoomButton />
            {activeRooms.map(room => (
                <ActiveRoomButton
                    roomId={room.roomId}
                    creatorUsername={room.creatorUsername}
                    amountOfParticipants={room.participants.length}
                    key={room.roomId}
                    isUserInRoom={isUserInRoom}
                />
            ))}

        </MainContainer>
    )
}

export default SideBar