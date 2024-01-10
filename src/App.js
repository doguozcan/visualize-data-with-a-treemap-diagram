import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import VideoGame from "./pages/videogame";
import Movie from "./pages/movie";
import Kickstarter from "./pages/kickstarter";
import Header from "./Header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={VideoGame} />
          <Route path="/videogame" component={VideoGame} />
          <Route path="/movie" component={Movie} />
          <Route path="/kickstarter" component={Kickstarter} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
