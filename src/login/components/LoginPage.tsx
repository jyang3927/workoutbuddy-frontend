import { FormControl, OutlinedInput, Button } from '@mui/material'


export function LoginPage () {
    return (
        <div>
            <form className="loginSection">
                <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput className="username" placeholder="Enter Username" />
                <OutlinedInput className="password" placeholder="Enter Password" />
                <Button variant="contained">Sign In</Button>
                <Button href="#text-buttons">Create Account</Button>
                </FormControl>
            </form>
        </div>
    )
}