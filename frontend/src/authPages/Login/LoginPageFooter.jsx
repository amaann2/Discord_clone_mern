import RedirectInfo from "../../shared/components/RedirectInfo"
import CustomPrimaryButton from "../../shared/components/customPrimaryButton"
import { useNavigate } from 'react-router-dom'
import { Tooltip } from "@mui/material"

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
    const navigate = useNavigate()
    const handlepushtoRegisterPage = () => {
        navigate('/signup')
    }
    const getFormNotValidMessage = () => {
        return 'Enter correct e-mail address and password should contains between 6 and 12 characters'
    }
    const getFormValidMessage = () => {
        return 'press to log in!'
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
                        onClick={handleLogin}
                    />
                </div>
                <RedirectInfo
                    text='Need an account?'
                    redirectText='Create an account'
                    additionalStyles={{ marginTop: '5px' }}
                    redirectHandler={handlepushtoRegisterPage}
                />
            </Tooltip>
        </>
    )
}

export default LoginPageFooter