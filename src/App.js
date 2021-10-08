import { useState,useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserContext from "./utils/UserContext";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import AOS from "aos"
import "aos/dist/aos.css"

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 500,
      easing: 'linear',
      delay: 100,
    })
    if (sessionStorage.getItem("currentUser") || user) {
      setUser(JSON.parse(sessionStorage.getItem("currentUser")))
      
    } else {
      setUser(null);
    }
  }, [])

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
