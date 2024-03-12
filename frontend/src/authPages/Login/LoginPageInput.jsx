import InputLabel from "../../shared/components/InputLabel"

const LoginPageInput = ({ mail, setMail, password, setPassword }) => {
    return (
        <>
            <InputLabel
                value={mail}
                setValue={setMail}
                label='E-Mail'
                placeholder='enter email address'
                type='text'
            />
            <InputLabel
                value={password}
                setValue={setPassword}
                label='Password'
                placeholder='enter password'
                type='password'
            />
        </>
    )
}

export default LoginPageInput