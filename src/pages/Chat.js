import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../utils/UserContext";
import SendIcon from "@mui/icons-material/Send";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "@firebase/firestore";
import { db, auth } from "../firebase/config";

import "../styles/chat.css";
import Message from "../components/Message";

export default function Chat() {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessges] = useState([]);

  const scrollBottom = useRef();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { uid, displayName,photoURL } = auth.currentUser;
    addDoc(collection(db, "messages"), {
      text: message,
      createdAt: serverTimestamp(),
      uid,
      username:displayName,
      photoURL,
    }).then((docRef) => {
      console.log("messages sent with id: " + docRef.id);
      setMessage("");
      scrollBottom.current.scrollIntoView();
    });
  };

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    onSnapshot(q, (querySnapshot) => {
      const msgArr = [];
      querySnapshot.forEach((doc) => {
        msgArr.push(doc.data());
      });
      setMessges(msgArr);
      scrollBottom.current.scrollIntoView();
    });
  }, []);
  return (
    <Container>
      <div>{!user && <h1>please login ... </h1>}</div>
      <Box className="chat-window">
        {messages.length > 0 &&
          messages.map((msg) => <Message key={msg.id} msg={msg} />)}
        <div ref={scrollBottom} className="scrolAnch"></div>
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
