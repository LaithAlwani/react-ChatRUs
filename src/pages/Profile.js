import { useContext, useEffect } from "react";
import UserContext from "../utils/UserContext";
import { Avatar, Container, Grid } from "@mui/material";
import moment from "moment"

export default function Profile() {
  const { user } = useContext(UserContext);

  const getDate = dateCreated => {
    // return (moment.unix(dateCreated/1000).format("MMM DD YYYY"));
    return (moment.unix(dateCreated/1000, "YYYYMMDD").fromNow());
  }

  useEffect(() => {
    
  },[user])
  console.log(user);
  return (
    <div>
      {user && (
        <Container sx={{marginTop:"2rem"}}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} sx={{
              display: "flex", justifyContent:"center", alignItems:"felxStart"
            }}>
              <Avatar
                src={user.photoURL}
                alt={user.displayName}
                sx={{width:"150px", height:"150px", fontSize:"7rem" }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <h1>{user.displayName}</h1>
              <p>Email: {user.email}</p>
              <p>Verified User: {user.emailVerified ? "yes": "no"}</p>
              <p>Joined: {getDate(user.createdAt)}</p>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
}
