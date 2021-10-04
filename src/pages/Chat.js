import {
  Avatar,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";

export default function Chat() {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState();
  const [messages,setMessges] = useState([]);
  
  const msgArr = [...messages]

  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    msgArr.push(message);
    setMessges(msgArr)
    setMessage("")
  };

  useEffect(() => {
    console.log(messages)
  },[messages])
  return (
    <Container>
      <div>{!user && <h1>please login ... </h1>}</div>
      <div>{user && <h1>Welcome to the Chat, {user.displayName} ... </h1>}</div>
      
      {messages.map(msg => <p>{msg}</p>)}
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          autoFocusdfsdf
          label="Message"
          name="message"
          value={message}
          onChange={handleChange}
          fullWidth
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
        ></TextField>
      </Box>
    </Container>
  );
}
