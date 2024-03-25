import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
const ChosenOptionLabel = () => {
    const { chosenChatDetails } = useSelector(state => state.chat)

    return (
        <Typography
            sx={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}
        >
            {`${chosenChatDetails ? chosenChatDetails?.name : ""}`}
        </Typography>
    )
}

export default ChosenOptionLabel