import React from "react";
import { Avatar, Card, Typography } from "@mui/material";
import { auth } from "../firebase/config";

export default function Message({ msg }) {
  const { text, photoURL, uid } = msg;

  const messageClass = auth.currentUser.uid === uid ? "sent" : "received";
  return (
    <>
      <Card className={`chat-card ${messageClass}`}>
              <Avatar src={photoURL} alt="" />
        {console.log(msg)}
        <Typography>{text}</Typography>
      </Card>
    </>
  );
}
