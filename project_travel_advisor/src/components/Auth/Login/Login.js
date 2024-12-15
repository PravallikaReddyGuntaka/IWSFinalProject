import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import useStyles from './styles.js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';

const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Store the token in localStorage
                localStorage.setItem('authToken', data.token); // Assuming 'data.token' contains the auth token from the server

                alert('Login Success!');
                history.push('/home');
            } else {
                const errorData = await response.json();
                alert('Login Failed: ' + (errorData.message || 'Invalid credentials.'));
            }
        } catch (err) {
            console.error('An error occurred:', err);
            alert('An error occurred. Please try again later.');
        }
    };

    const redirectToForgotPassword = () => {
        history.push('/forgot-password');
    };

    return (
        <Container className={classes.container}>
            <Typography className={classes.title}>Login</Typography>
            <TextField
                className={classes.input}
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
            />
            <TextField
                className={classes.input}
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
            />
            <Button
                className={classes.button}
                variant="contained"
                fullWidth
                onClick={handleSubmit}
            >
                Login
            </Button>
            <Button
                className={classes.button}
                variant="contained"
                fullWidth
                onClick={redirectToForgotPassword}
            >
                Forgot Password
            </Button>
            <Typography>
                Don't have an account? <a href="/register">Register here</a>
            </Typography>
        </Container>
    );
};

export default Login;
