import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import { Link } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from "react";
import UserContext from "../utils/UserContext";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    setUser(null);
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "#f0f0f0", color: "black" }}
      >
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            <TextsmsRoundedIcon />
            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
              Chats 'R' Us
            </Typography>
          </Button>
          <Box sx={{ marginLeft: "auto" }}>
            {!user && (
              <Button component={Link} to="/login" color="inherit">
               <PersonIcon /> Login
              </Button>
            )}
            {user && (
              <>
                <IconButton onClick={handleMenu}>
                  <Avatar src={user.photoURL} alt={user.displayName[0]} />
                </IconButton>
                <Menu
                  // id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/chat" onClick={handleClose}>
                    Chat
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
