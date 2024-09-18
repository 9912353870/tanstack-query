import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostTraditional from "./components/PostTraditional";
import PostRQ from "./components/PostRQ";
import PostDetailsRQ from "./components/PostDetailsRQ";
import PaginatedQueries from "./components/PaginatedQueries";

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
          <Route exact path="/postsrq" element={<PostRQ />} />{" "}
          <Route exact path="/postsrq/:postId" element={<PostDetailsRQ />} />
          <Route exact path="/paginated-queries" element={<PaginatedQueries />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
