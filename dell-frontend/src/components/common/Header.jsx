import React, { useRef, useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import dellLogo from "../../assets/images/logo.svg"
import Register from '../register/Register';
import Login from '../Login/Login';
import { Link, useNavigate } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const isAuthenticated = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"))
  const searchListRef = useRef(null);
  const [showSearchItems, setShowSearchItems] = useState(false);
  const [searchItems, setSearchItems] = useState([]);
  const id = useRef(null);
  const [query, setQuery] = useState("")
 
  const handleChangeWithDebounce = async (e) => {
    setQuery(e.target.value);

    if (id.current) {
      clearInterval(id.current);
    }
    id.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://json-server-six-psi.vercel.app/parts?q=${query}`
        );
        const data= await res.json()
        console.log(data);
        setSearchItems(data);
        if (data.length > 0) {
          setShowSearchItems(true);
        }
      } catch (error) {
        console.log(error);
      }
    }, 500);
  };
  const handleRegisterOpenModal = () => {
    setOpenRegisterModal(true)
    handleMenuClose()
  };
  const handleRegisterCloseModal = () => {
    setOpenRegisterModal(false)
  }
  const handleLoginOpenModal = () => {
    setOpenLoginModal(true)
    handleMenuClose()
  };
  const handleLoginCloseModal = () => {
    setOpenLoginModal(false)
  }
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleMenuClose()
  }
  const handleOutsideClick = (e) => {

    if (searchListRef.current && !searchListRef.current.contains(e.target)) {
      setShowSearchItems(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // const handleSearchResults=()=>{
  //   getSearchResults(query)
  //   // if(query){
  //   //   navigate("/search-results")
  //   // }
  // }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated ?

        [
          <MenuItem key="username" onClick={handleMenuClose}>{user.username}</MenuItem>,
          <MenuItem key="parts" onClick={handleMenuClose}>Parts</MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>,
        ]
        :
        [
          <MenuItem key="register" onClick={handleRegisterOpenModal}>Register</MenuItem>,
          <MenuItem key="parts" onClick={handleMenuClose}>
            <Link to="/parts">Parts</Link>
          </MenuItem>,
          <MenuItem key="login" onClick={handleLoginOpenModal}>Login</MenuItem>
        ]
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>


    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>

      <Register open={openRegisterModal} handleCloseModal={handleRegisterCloseModal} />
      <Login open={openLoginModal} handleCloseModal={handleLoginCloseModal} />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box  >
            <Link to="/"><img src={dellLogo} alt="dell-logo" width={150}  /></Link>
          </Box>
         
          <FormControl sx={{ m: 1, display: { xs: 'none', sm: 'block' } }} size="small" variant="outlined">
            <OutlinedInput
              type="text"
              value={query}
              onChange={handleChangeWithDebounce}
              placeholder='Search'
              />

          </FormControl>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' },alignItems:"center",gap:"10px" }}>
          <Link to="/parts">Parts</Link>
          <Link to="/parts/add">Add New Part</Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >

              {isAuthenticated ? <AccountCircle /> : <PersonIcon />}
            </IconButton>
          
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <FormControl sx={{ m: 1, display: { xs: 'flex', sm: 'none' }, width: "90%", margin: "20px auto" }} size="small" variant="outlined">
          <OutlinedInput
            type="text"
            value={query}
              onChange={handleChangeWithDebounce}
              placeholder='Search'
          />
        </FormControl>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {showSearchItems ? (
        <Box
          sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", height: "auto", maxHeight: "250px", backgroundColor: "#fff", overflowY: "scroll", padding: "20px 30px" }}
          ref={searchListRef}
        >
          {searchItems?.map((item) => {
            const id = item.id.match(/\d+/)
            return (
              <Typography key={id[0]} variant='body1' component='p' gutterBottom mb="10px" ><Link to={`/parts/${id[0]}`} onClick={() => setHide(true)}>{item.name}</Link></Typography>
            );
          })}
        </Box>
      ) : null}


    </Box>
  );
}


export default Header