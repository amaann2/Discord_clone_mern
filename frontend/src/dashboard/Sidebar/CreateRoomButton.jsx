import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/add'
import { createNewRoom } from "../../realTimeCommunication/roomHandler"
const CreateRoomButton = () => {
    const createNewRoomHandler = () => {
        createNewRoom()
    }
    return (
        <Button
            onClick={createNewRoomHandler}
            style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                margin: 0,
                padding: 0,
                minWidth: 0,
                marginTop: '10px',
                color: 'white',
                backgroundColor: '#5865F2'
            }}
        >
            <AddIcon />
        </Button>
    )
}

export default CreateRoomButton