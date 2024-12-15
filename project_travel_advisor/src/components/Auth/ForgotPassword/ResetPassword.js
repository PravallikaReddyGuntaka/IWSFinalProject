import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const ResetPassword = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    resetCode,
                    newPassword,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                alert('Password reset successfully! Please log in.');
                history.push('/login'); 
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (err) {
            console.error('Reset Password Error:', err);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <Container className={classes.container}>
            <Typography className={classes.title}>Reset Password</Typography>
            <form onSubmit={handleResetPassword}>
                <TextField
                    className={classes.input}
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    className={classes.input}
                    label="Reset Code"
                    variant="outlined"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    className={classes.input}
                    label="New Password"
                    variant="outlined"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    className={classes.input}
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    required
                />
                <Button className={classes.button} variant="contained" fullWidth type="submit">
                    Reset Password
                </Button>
            </form>
        </Container>
    );
};

export default ResetPassword;
