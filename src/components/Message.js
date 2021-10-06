import React from "react";
import { Avatar, Card, Typography } from "@mui/material";
import { auth } from "../firebase/config";

export default function Message({ msg }) {
  const { text, photoURL, uid, username } = msg;

  const messageClass = auth.currentUser.uid === uid ? "sent" : "received";
  return (
    <>
      <Card className={`chat-card ${messageClass}`}>
        {console.log(msg)}
              <Avatar src={photoURL} alt={username} sx={{float:"right"}} />
        <Typography>{text}</Typography>
      </Card>
    </>
  );
}
