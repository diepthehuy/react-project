import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContent = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { data,isLoading,fetchError } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filtersearch = posts.filter(
      (post) =>
        post.body.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    setSearchResult(filtersearch.reverse());
  }, [posts, search]);

  
  return (
    <DataContent.Provider
      value={{
        posts,
        setPosts,
        searchResult,
        search,
        setSearch,isLoading,fetchError
      }}
    >
      {children}
    </DataContent.Provider>
  );
};
export default DataContent;
