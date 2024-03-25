import Alert from "@mui/material/Alert"
import { Snackbar } from "@mui/material"
import { connect } from "react-redux"
import { getActions } from "../../store/actions/alertActions"

const AlertNotification = ({ showAlertMessage, closeAlertMessage, alertMessageContent }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'button', horizontal: 'center',

            }}
            open={showAlertMessage}
            onClose={closeAlertMessage}
            autoHideDuration={6000}
        >
            <Alert severity="info">
                {alertMessageContent}
            </Alert>
        </Snackbar>
    )
}
const mapStoreStateToProps = ({ alert }) => {
    return {
        ...alert
    }
}
const mapActiosToProps = (dispatch) => {
    return {
        ...getActions(dispatch)
    }
}
export default connect(mapStoreStateToProps, mapActiosToProps)(AlertNotification)