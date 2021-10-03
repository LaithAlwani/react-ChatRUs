import { Avatar } from "@mui/material";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

export default function Chat() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      {user && (
        <>
          <Avatar src={user.photoURL} alt={user.displayName} />
          <h1>Hello, {user.displayName} !</h1>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
}
