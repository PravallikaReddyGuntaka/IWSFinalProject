import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const ForgotPassword = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // State to track loading
    const history = useHistory();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (response.ok) {
                alert('Reset code sent to your email!');
                history.push('/reset-password');
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (err) {
            console.error('Forgot Password Error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <Container className={classes.container}>
            <Typography className={classes.title}>Forgot Password</Typography>
            <form onSubmit={handleForgotPassword}>
                <TextField
                    className={classes.input}
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    disabled={loading} // Disable input while loading
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
                </Button>
            </form>
        </Container>
    );
};

export default ForgotPassword;
