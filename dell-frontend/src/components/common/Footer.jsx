import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import logo from "../../assets/images/logo.svg"
const Footer = () => {
  return (
   <Grid container bgcolor="#f6f6f6" p="3em">
    <Grid item xs={12} >
      {/* <Typography variant='h6' component="h6" textAlign="center">Dell Technologies</Typography>
       */}
       <Box className="d-flex-center">
        <img src={logo} alt="dell-logo" width={250} />
       </Box>
      <Typography variant='subtitle2' component="p" mt="20px" textAlign="center"> © Copyright {new Date().getFullYear()} Dell Technologies All Rights Reserved</Typography>
    </Grid>
   </Grid>
  )
}

export default Footer