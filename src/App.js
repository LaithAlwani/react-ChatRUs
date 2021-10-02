import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/chat" component={Chat} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
