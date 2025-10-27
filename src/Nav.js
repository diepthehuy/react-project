import { Link } from 'react-router-dom'
import { useStoreActions,useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

const Nav = () => {
  const posts = useStoreState((state)=>state.posts);
  const search = useStoreState((state)=> state.search);
  const setSearch= useStoreActions((actions)=>actions.setSearch);
  const setSearchResults = useStoreActions((action)=>action.setSearchResults);

  useEffect(() => {
      
      const filtersearch = posts.filter(
        (post) =>
          post.body.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      
      setSearchResults(filtersearch.reverse());
    }, [posts, search,setSearchResults]);

  return (
    <nav className='Nav'>
        <form className='searchForm' onChange={(e)=>{e.preventDefault()}}>
            <label htmlFor="search">Search Posts</label>
            <input type="text"
                    id='search'
                    placeholder='Search Posts'
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}} />
        </form>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav