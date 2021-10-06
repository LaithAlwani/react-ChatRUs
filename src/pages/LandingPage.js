import {Link, useHistory} from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Container, Grid, Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import UserContext from "../utils/UserContext";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  width: "100%",
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
}));

export default function LandingPage() {
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (sessionStorage.getItem("currentUser") || user) {
      setUser(JSON.parse(sessionStorage.getItem("currentUser")))
      history.push("/chat");
    } else {
      setUser(null);
    }
  }, [history, user, setUser])
  
  return (
    <>
      <Box
        sx={{
          position: "relative",
          zIndex: "-1",
          height: "250px",
          backgroundImage: `url("/images/backgorund-min.png")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          transform: "skewY(-11deg)",
        }}
      ></Box>
      <Container
        sx={{ textAlign: "center", margin: "5rem auto", width: "300px" }}
      >
        <h1>Chats 'R'Us</h1>
        <p>Work communication made easy</p>
        <Button fullWidth component={Link}  to="/login" className="btn">
          Get Started
        </Button>
      </Container>
      <Container sx={{ textAlign: "center", marginBottom:"5rem" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Item>
              <div>
                <img src="/images/chat-min.png" alt="" className="imagesLP" />
                <h3 className="card-title">Real Time Chat</h3>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <div>
                <img src="/images/password.jpg" alt="" className="imagesLP" />
                <h3 className="card-title">Protected Password</h3>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <div>
                <img
                  src="/images/coming-soon.jpg"
                  alt=""
                  className="imagesLP"
                />
                <h3 className="card-title">More feactures coming soon</h3>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
