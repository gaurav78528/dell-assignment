import { Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography, CircularProgress, Modal, Divider, InputLabel, Box } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { toast } from 'react-hot-toast';
import "../../styles/register.css"



const initialUserInput = {
  username: "",
  email: "",
  password: "",
}

const Login = ({ open, handleCloseModal }) => {
  const [userInput, setUserInput] = useState(initialUserInput)
  const [loader, setLoader] = useState(false)
  const [errors, setErrors] = useState({})

  console.log(userInput)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    const newErrors = { ...errors };

    switch (name) {
      case 'username':
        newErrors.username = value.trim() === '' ? 'Username is required' : '';
        break;
      case 'email':
        newErrors.email = /\S+@\S+\.\S+/.test(value) ? '' : 'Email is invalid';
        break;
      case 'password':
        if (value.length < 8 && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
          newErrors.password = 'Password must be at least 8 characters long and must include at least one uppercase letter, one lowercase letter, one number, and one special character';
        } else {
          newErrors.password = '';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  }

  const handleLoginUser = async () => {
    try {
      setLoader(true)
      const res = await fetch("https://jsonserver-database-production.up.railway.app/users")
      const actualRes = await res.json();
      const isUserExist = actualRes.filter((item) => {
        return item.email === userInput.email && item.username === userInput.username
      });
      if (isUserExist.length === 1) {
        let token = generateToken(userInput.email)
        if (atob(isUserExist[0].password) === userInput.password && isUserExist[0].username === userInput.username) {
          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify({ username: userInput.username }))

          toast.success("User Logged In.", {
            duration: 4000,
            position: 'bottom-right'
          });
          handleCloseModal()
          setLoader(false)
        } else {
          toast.error("Wrong Credentials.", {
            duration: 4000,
            position: 'bottom-right'
          });
         
          setLoader(false)
        }

      } else {
        toast.error("User Does not Exist. Please Register.", {
          duration: 4000,
          position: 'bottom-right'
        });
        
        setLoader(false)
      }


    } catch (error) {
      setLoader(false)
      toast.error("Something Went Wrong !!", {
        duration: 4000,
        position: 'bottom-right'
      });
    }

  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="register-modal"
      >
        <Grid item xs={12}  >
          <Button className='close-btn'>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleCloseModal} />
          </Button>

        </Grid>



        <Grid item xs={12}>
          <Grid container className='register-container'>
            <Grid item md={6} display={{ xs: "none", sm: "none", md: "block" }} className='register-bg'>
              {/* <img src={loginBackground}  alt="image" style={{height:"100vh",width:"100%"}}   /> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container className="form-container">
                <Grid item xs={12}>
                  <Typography variant="h2" component="h2" className="register-heading">
                    Login
                  </Typography>

                </Grid>
                <Grid item xs={12}>
                  <Grid container className="form" spacing={3}>
                    <Grid item xs={12}>
                      <TextField type="text" size='small' variant="outlined" fullWidth label='Username' name="username" value={userInput.username} onChange={handleInputChange} error={!!errors.username} helperText={errors.username} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField type="email" size='small' variant="outlined" fullWidth label='Email' name="email" value={userInput.email} onChange={handleInputChange} error={!!errors.email} helperText={errors.email} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField type="password" size='small' variant="outlined" fullWidth label='Password' name="password" value={userInput.password} onChange={handleInputChange} error={!!errors.password} helperText={errors.password} />
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Privacy Policy" />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Terms and Conditions" />
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" fullWidth

                        disabled={errors.username || errors.email || errors.password || errors.confirmPassword || loader}
                        startIcon={loader ? <CircularProgress size={20} color="inherit" /> : null} onClick={handleLoginUser}>{loader ? "loading.." : "Login"}</Button>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>

  )
}

export default Login;