import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Register = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                alert('Register Success: ' + data.message);
                history.push('/login');
            } else {
                alert('Register Failed: ' + (data.message || 'An error occurred'));
            }
        } catch (err) {
            console.error('Register Failed:', err);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <Container className={classes.container}>
            <Typography className={classes.title}>Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    className={classes.input}
                    label="First Name"
                    variant="outlined"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                />
                <TextField
                    className={classes.input}
                    label="Last Name"
                    variant="outlined"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                />
                <TextField
                    className={classes.input}
                    label="Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    className={classes.input}
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <Button className={classes.button} variant="contained" fullWidth type="submit">
                    Register
                </Button>
            </form>
            <Typography>
                Already have an account?{' '}
                <a href="/login">Login here</a>
            </Typography>
        </Container>
    );
};

export default Register;
