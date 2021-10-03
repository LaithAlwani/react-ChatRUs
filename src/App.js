import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserContext from "./utils/UserContext";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      setUser(JSON.parse(sessionStorage.getItem("currentUser")))
    } else {
      setUser(null);
    }
  },[])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <Layout>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/chat" component={Chat} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </Layout>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
