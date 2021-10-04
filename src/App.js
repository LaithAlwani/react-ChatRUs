import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserContext from "./utils/UserContext";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";

function App() {
  const [user, setUser] = useState();

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
              <Route path="/profile" component={Profile} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </Layout>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
