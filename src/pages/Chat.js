import { Avatar } from "@mui/material";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

export default function Chat() {
  const { user } = useContext(UserContext);
  console.log(user);
    return (
      
        <div>
            {user &&
     <h1>Welcome to the Chat, {user.displayName} ... </h1>
            }
    </div>
  );
}
