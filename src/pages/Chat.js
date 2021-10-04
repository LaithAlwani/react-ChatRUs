import { Avatar } from "@mui/material";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

export default function Chat() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div>{!user && <h1>please login ... </h1>}</div>
      <div>{user && <h1>Welcome to the Chat, {user.displayName} ... </h1>}</div>
    </>
  );
}
