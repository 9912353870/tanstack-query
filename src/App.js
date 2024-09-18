import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostTraditional from "./components/PostTraditional";
import PostRQ from "./components/PostRQ";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/postsrq">Query Posts</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts" element={<PostTraditional />} />
          <Route exact path="/postsrq" element={<PostRQ />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
