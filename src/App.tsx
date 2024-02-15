import Layout from "./components/Layout/Layout";
import AddPostForm from "./pages/Posts/AddPostForm";
import PostList from "./pages/Posts/PostList";
import { Routes, Route, Navigate } from "react-router-dom";
import SinglePostPage from "./pages/Posts/SinglePostPage";
import EditPostForm from "./pages/Posts/EditPostForm";
import UsersList from "./pages/Users/UsersList";
import UserPage from "./pages/Users/UserPage";

function App() {
  return (
    <>
      {/* LESSON 05 */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />

          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>

          <Route path="user">
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
