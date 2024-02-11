import Layout from "./components/Layout/Layout";
import AddPostForm from "./pages/Posts/AddPostForm";
import PostList from "./pages/Posts/PostList";
import { Routes, Route } from "react-router-dom";
import SinglePostPage from "./pages/Posts/SinglePostPage";
import EditPostForm from "./pages/Posts/EditPostForm";

function App() {
  return (
    <>
      {/* LESSON 04 */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />
          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
