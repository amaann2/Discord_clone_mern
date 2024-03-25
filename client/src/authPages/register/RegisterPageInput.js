import InputLabel from "../../shared/components/InputLabel"

const RegisterPageInput = ({ mail, username, password, setPassword, setMail, setUsername }) => {
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
                value={username}
                setValue={setUsername}
                label='usernmae'
                placeholder='enter username'
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

export default RegisterPageInput