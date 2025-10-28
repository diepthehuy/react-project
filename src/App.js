import Layout from "./Layout";
import Home from "./Home";
import Missing from "./Missing";
import PostPage from "./PostPage";
import About from "./About";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";

function App() {
  const setPosts = useStoreActions((actions)=>actions.setPosts);
  const { data,isLoading,fetchError } = useAxiosFetch(
    "https://api.jsonbin.io/v3/b/6900dc2043b1c97be9877be8"
  );
  useEffect(() => {
    setPosts(data);
  }, [data,setPosts]);

  
  
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home isLoading={isLoading} fetchError={fetchError} />} />
        <Route path="post">
          <Route index element={<NewPost />} />
          <Route path=":id" element={<PostPage/>} />
        </Route >
        <Route path="edit/:id" element={<EditPost />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Missing/>}/>
      </Route>  
    </Routes>
  );
}

export default App;
