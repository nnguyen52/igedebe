import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Auth from "./components/Auth";
import AuthContextProvider from "./contexts/authContext";
import GamesContextProvider from "./contexts/gamesContext";
import CheckoutContextProvider from "./contexts/checkoutContext";
import UserContextProvider from "./contexts/userContext";
import NavBar from "../src/components/NavBar";
import SingleGame from "./components/SingleGame";
import Checkout from "./components/Checkout";
import SearchGameResults from "./components/SearchGameResults";
import UserProfile from "./components/UserProfile";
import RecentGames from "./components//HomeComponents/RecentGames";
import ComingSoon from "./components/HomeComponents/ComingSoon";
import MostAnticipated from "./components/MostAnticipated/MostAnticipated";
import AgeRatingDetails from "./components/SingleGame/AgeRatingDetails";
function App() {
  return (
    <AuthContextProvider>
      <GamesContextProvider>
        <CheckoutContextProvider>
          <UserContextProvider>
            <Router basename={process.env.PUBLIC_URL}>
              <NavBar />
              <Switch>
                <Landing exact path="/" component={Home} />
                <Route
                  exact
                  path="/login"
                  render={(props) => <Auth {...props} authRoute="login" />}
                />
                {/* <Route path="/testing" component={Testing} /> */}
                <Route
                  exact
                  path="/register"
                  render={(props) => <Auth {...props} authRoute="register" />}
                />
                <Route exact path="/user" component={UserProfile} />
                <Route
                  exact
                  path="/singleGame/:id"
                  render={(props) => <SingleGame {...props} />}
                />
                <Route path="/checkout" component={Checkout} />
                <Route path="/query" component={SearchGameResults} />
                <Route exact path="/recentGames" component={RecentGames} />
                <Route
                  path="/comingSoon/:page?/:name?"
                  component={ComingSoon}
                />
                <Route
                  path="/mostAnticipated/:type?"
                  component={MostAnticipated}
                />
                <Route path="/ageRating/:id" component={AgeRatingDetails} />
                <Route path="/*" component={Home} />
              </Switch>
            </Router>
          </UserContextProvider>
        </CheckoutContextProvider>
      </GamesContextProvider>
    </AuthContextProvider>
  );
}

export default App;
