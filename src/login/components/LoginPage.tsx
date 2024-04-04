import { FormControl, OutlinedInput, Button, Container } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { AuthBar } from './AuthBar'


export function LoginPage () {
    const {signIn} = useAuth()
    return (
        <div>
            <Container>
            <form className="loginSection">
                <FormControl sx={{ width: '25ch' }}>
                <Button onClick={signIn} variant="contained">Sign In With Google</Button>
                </FormControl>
            </form>
            </Container>
        </div>
    )
}