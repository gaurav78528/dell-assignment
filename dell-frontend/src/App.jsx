import React from 'react'
import Header from './components/common/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { Button, Grid } from "@mui/material"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import Footer from './components/common/Footer';
import Parts from './components/parts/Parts';
import SinglePart from './components/parts/SinglePart';
import AddPart from './components/parts/AddPart';
import { Toaster } from 'react-hot-toast';
const App = () => {


  const theme = createTheme({
    palette: {
      primary: {
        main: "#0672cb",
      }
    },
    components: {
      // Name of the component
      MuiAppBar: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: "#fff",
            color: "#000",
            fontSize: '1rem',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#0672cb",
            color: "#fff",
            // fontSize:"0.8rem"
          }
        }

      }
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 300,
        // this is to be used in complex animations
        complex: 375,
        // recommended when something is entering screen
        enteringScreen: 225,
        // recommended when something is leaving screen
        leavingScreen: 195,
      },
    },
  });
  return (
  <>
    <ThemeProvider theme={theme}>
      <BrowserRouter>

        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>

          <Grid item xs={12}>

            {/* <Header/> */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/parts" element={<Parts />} />
              <Route path="/parts/:id" element={<SinglePart />} />
              <Route path="/parts/add" element={<AddPart />} />
            </Routes>
            <Footer />
          </Grid>
        </Grid>
       
      </BrowserRouter>
      {/* <Button variant="contained">Contained</Button> */}
    </ThemeProvider>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
  </>

  )
}

export default App;