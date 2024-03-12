import { Typography } from "@mui/material"
import AuthBox from "../../shared/components/AuthBox"
import { useEffect, useState } from "react"
import RegisterPageInput from "./RegisterPageInput"
import RegisterPageFooter from './RegisterPageFooter'
import { vaidateRegisterForm } from "../../shared/utils/validator"



const RegisterPage = () => {
    const [mail, setMail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        setIsFormValid(vaidateRegisterForm({ mail, username, password }))
    }, [mail, password, username, isFormValid])


    const handleRegister = () => {
        console.log(mail)
        console.log(username)
        console.log(password)
    }
    return (
        <AuthBox>
            <Typography variant="h5" sx={{ color: 'white' }}>create an account</Typography>
            <RegisterPageInput mail={mail} username={username} password={password} setUsername={setUsername} setMail={setMail} setPassword={setPassword} />
            <RegisterPageFooter handleRegister={handleRegister}
                isFormValid={isFormValid} />
                
        </AuthBox>
    )
}

export default RegisterPage