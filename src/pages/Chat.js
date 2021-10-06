import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../utils/UserContext";
import SendIcon from "@mui/icons-material/Send";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  limit,
  query,
} from "@firebase/firestore";
import { db } from "../firebase/config";

import "../styles/chat.css";

export default function Chat() {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessges] = useState([]);

  const scrollBottom = useRef()

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "messages"), {
      text: message,
      userId: user.uid,
      username: user.displayName,
      createdAt: serverTimestamp(),
    }).then((docRef) => {
      console.log("messages sent with id: " + docRef.id);
      setMessage("");
      scrollBottom.current.scrollIntoView({behavior:"smooth"})
    });
  };

  useEffect(() => {
    
    const q= query(collection(db, "messages"), orderBy("createdAt"))
    onSnapshot(q, (querySnapshot) => {
      
      const msgArr = [];
      querySnapshot.forEach((doc) => {
        console.log(doc)
        msgArr.push(doc.data());
      });
      setMessges(msgArr);
      {scrollBottom.current.scrollIntoView({behavior:"smooth"})}
    });
    
  }, []);
  return (
    <Container>
      <div>{!user && <h1>please login ... </h1>}</div>
      <Box className="chat-window">
        {messages.length > 0 &&
          
          messages.map((msg) => (
            <Card className="chat-card">
              <Typography variant="subtitle2" sx={{mb:2}}>{msg.username}</Typography>
              <Typography>{msg.text}</Typography>
            </Card>
          ))}
        <div ref={scrollBottom}></div>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          autoFocus
          label="Message"
          name="message"
          fullWidth
          value={message}
          onChange={handleChange}
          
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="send"
                  type="submit"
                  className="btn"
                  sx={{ borderRadius: "0.5rem" }}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
}
