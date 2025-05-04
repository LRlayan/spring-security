import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Typography from "@mui/material/Typography";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Button } from '@mui/material';
import {loginUser, registerUser} from "../service/userSlice.ts";
import {UserModel} from "../model/userModel.ts";
import MenuItem from '@mui/material/MenuItem';

const SignInAndSignUp = () => {
    const [isSignIn, setSignIn] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    const roles = ['ADMIN', 'USER', 'MANAGER'];

    const handleSignIn = () => {
        setSignIn(true);
        const user = new UserModel(username, email,  password, role)

        dispatch(loginUser(user));
    }

    const handleSignUp = () => {
        setSignIn(false);
        const user = new UserModel(username, email, password, role);
        if (password !== "" && username !== "" && email !== "" && role !== "") {
            dispatch(registerUser(user));
        }else {
            console.log("Please Fill the form");
        }
    }

    return(
        <>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Box sx={{
                    '& > :not(style)': { m: 1 },
                    padding: 4,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Sign In
                    </Typography>

                    {!isSignIn &&
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                        }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                label="Username"
                                variant="standard"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Box>
                    }

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                    }}>
                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            label="Email"
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>

                    {!isSignIn &&
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    select
                                    label="Role"
                                    variant="standard"
                                    fullWidth
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    {roles.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </>
                    }

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                    }}>
                        <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            label="Password"
                            type="password"
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Box style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: 10
                    }}>
                        <Button color={"primary"} style={{
                            background: "lightblue",
                            paddingRight: 25,
                            paddingLeft: 25
                        }}
                        onClick={handleSignIn}
                        >
                            Sign In
                        </Button>

                        <Button color={"primary"} style={{
                            background: "lightblue",
                            paddingRight: 25,
                            paddingLeft: 25
                        }}
                        onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Box>
            );
        </>
    )
}

export default SignInAndSignUp;