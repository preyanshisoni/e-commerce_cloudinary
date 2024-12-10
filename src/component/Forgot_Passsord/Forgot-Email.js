import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Forgot-Email.css';


export default function Forgot_Passsord() {

  const [email, setEmail] = useState(''); 
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

    const ResetPasswordEmail = async () => {
        try {
          const response = await axios.post("http://localhost:3000/user/verifyEmail", { email });
        
          if (response.status === 200) {
            setSuccessMessage('Email Verified');
            setError(''); 
            const sendEmailToResetPassword = email;
            navigate('/reset-password', {state:{sendEmailToResetPassword}});
            
          }
        } catch (error) {
          setError('Something went wrong. Please try again.'); 
          setSuccessMessage(''); 
        }
      };
      const signupPage=()=>{
        navigate('/')
      }

  return (
    <div className="reset-password-container">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '400px',
          margin: '50px auto',
          padding: '30px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Forgot Password
        </Typography>

        <Typography variant="body1" gutterBottom>
          Enter your email address to reset password
        </Typography>

        <TextField
          label="Email Address"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
     {error && <Typography color="error">{error}</Typography>} 
     {successMessage && <Typography color="success">{successMessage}</Typography>}

        <Button onClick={ResetPasswordEmail}

          variant="contained"
          sx={{
            backgroundColor: '#4F62FE',
            color: 'white',
            padding: '10px 15px',
            textTransform: 'none',
          }}
          fullWidth
        >
         Verify Email
        </Button> <br />

        
        <Button  onClick={signupPage}
            variant='outlined'
          sx={{
           
            textTransform: 'none',
          }}
          fullWidth  
          > Cancel

        </Button>
        
      </Box>
    </div>
  );
}
