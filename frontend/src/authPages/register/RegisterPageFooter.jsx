import { Tooltip } from "@mui/material"
import CustomPrimaryButton from "../../shared/components/customPrimaryButton"
import RedirectInfo from "../../shared/components/RedirectInfo"
import { useNavigate } from "react-router-dom"

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
    const navigate = useNavigate()
    const handlepushtoLoginPage = () => {
        navigate('/login')
    }
    const getFormNotValidMessage = () => {
        return 'Username should contains between 3 and 12 characters and password should contains between 6 and 12 character . Also correct e-mail address should be provide'
    }
    const getFormValidMessage = () => {
        return 'press to register!'
    }
    return (
        <>
            <Tooltip
                title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
            >
                <div>
                    <CustomPrimaryButton
                        label='Log in'
                        additionalStyles={{ marginTop: '30px' }}
                        disabled={!isFormValid}
                        onClick={handleRegister}
                    />
                </div>
                <RedirectInfo
                    text=''
                    redirectText='Already have an account ?'
                    additionalStyles={{ marginTop: '5px' }}
                    redirectHandler={handlepushtoLoginPage}
                />
            </Tooltip>
        </>
    )
}

export default RegisterPageFooter