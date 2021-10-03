import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    setUser(null);
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
                Login
              </Button>
            )}
            {user && (
              <>
                <Button component={Link} to="/chat" color="inherit">
                  Chat
                </Button>
                <Button component={Link} to="/profile">
                  <Avatar src={user.photoURL} alt={user.displayName} />
                </Button>
                <Button
                  component={Link}
                  to="/"
                  color="inherit"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
