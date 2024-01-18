import Counter from "./components/Counter";
import AddPostForm from "./components/Posts/AddPostForm";
import PostList from "./components/Posts/PostList";

function App() {
  return (
    <main className="App">
      {/* <Counter /> */}
      <AddPostForm />
      <PostList />
    </main>
  );
}

export default App;
