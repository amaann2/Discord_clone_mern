import Button from '@mui/material/Button'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
const MainPageButton = () => {
    return (
        <Button
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
            <PeopleAltIcon />
        </Button>
    )
}

export default MainPageButton