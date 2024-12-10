import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import './Reset.js';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function Reset() {
  
  const [data, setData] = useState({newPassword:'',confirmPassword:''}) 
  const location = useLocation();
  const {sendEmailToResetPassword} = location.state || {};
  const navigate = useNavigate();
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setConfirmPassword]= useState(false);
  
  const setInput = (e)=>{
    setData({
      ...data,
      [e.target.name] : e.target.value,
    })
    console.log(e.target.value);
  }

const tooglePassword=()=>{
  setShowPassword(!showPassword);
}
const toogleConfirmPassword=()=>{
    setConfirmPassword(!showConfirmPassword);
}

const  resetPassword = async ()=>{


  if(data.newPassword !==data.confirmPassword){
      alert("New password and confirm do not match");
      return;
  }

try {
  const response =  await axios.post("http://localhost:3000/user/updatePassword", {email:sendEmailToResetPassword,newPassword:data.newPassword});
  
  if (response.status === 200) {
    console.log(response,"response");
    alert("Password change sucessfully");
    setData({newPassword: '',confirmPassword:''});
   
  }

} catch (err) {
      console.log("err",err); 
      alert("something went wrong with password change");
 }
}

const redirect = ()=>{
  navigate('/forgot-password');
}


return (
  <div className="forgot-password-container">
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
        <img src='forgot-password.png' alt='img not found' width={150} height={150}/>
        <Typography variant="h5" component="h1" gutterBottom>
          Forgot Password
        </Typography>

        <Typography variant="body1" gutterBottom>
          Enter your new password below.
        </Typography>

        <TextField
          name='newPassword'
          label="New Password"
          variant="outlined"
          type={showPassword?'password':'type'}
          fullWidth
          sx={{ marginBottom: '20px' }}
          onChange={setInput}
          InputProps={{
            endAdornment:(
              <InputAdornment position='end'>
                <IconButton onClick={tooglePassword}>
                {showPassword?<Visibility/>:<VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            )
          }}
          />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type={showConfirmPassword?'password':'type'}
          fullWidth
          sx={{ marginBottom: '20px' }}
          onChange={setInput}
          InputProps={{
            endAdornment:(
              <InputAdornment position='end'>
                <IconButton onClick={toogleConfirmPassword}>
                  {showConfirmPassword?<Visibility/>:<VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            )
          }}
          />

        <Button
          onClick={resetPassword}
          variant="contained"
          sx={{
            backgroundColor: '#4F62FE',
            color: 'white',
            padding: '10px 20px',
            textTransform: 'none',
          }}
          fullWidth
          >
          Reset Password
        </Button>


        <Button
          onClick={redirect}
          variant="outlined"
          sx={{
            
            
            padding: '5px 20px',
            marginTop:'5px',
            textTransform: 'none',
          }}
          fullWidth
          >
          Cancel
        </Button>
      </Box>
    </div>
  );
  

}
