import React from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import useStyles from './styles.js';

const ContactUs = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography className={classes.title}>Contact Us</Typography>
      <img src="https://www.shutterstock.com/shutterstock/photos/2475999141/display_1500/stock-photo-hand-show-icon-address-phone-email-mobile-call-contact-customer-support-help-from-mail-2475999141.jpg" alt="Contact Us" className={classes.image} />
      <TextField className={classes.input} label="Name" variant="outlined" fullWidth />
      <TextField className={classes.input} label="Email" variant="outlined" fullWidth />
      <TextField className={classes.input} label="Message" variant="outlined" multiline rows={4} fullWidth />
      <Button className={classes.button} variant="contained" fullWidth>
        Submit
      </Button>
    </Container>
  );
};

export default ContactUs;
