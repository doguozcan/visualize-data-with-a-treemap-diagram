import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoGame from "./pages/videogame";
import Movie from "./pages/movie";
import Kickstarter from "./pages/kickstarter";
import Header from "./Header";

function App() {
  return (
    <Router basename="/visualize-data-with-a-treemap-diagram">
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<VideoGame />} />
          <Route path="/videogame" element={<VideoGame />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/kickstarter" element={<Kickstarter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
