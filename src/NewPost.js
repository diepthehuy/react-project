import { useStoreState, useStoreActions } from 'easy-peasy';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';


const NewPost = () => {
  const posts=useStoreState((state)=>state.posts);
  const postTitle = useStoreState((state)=>state.postTitle);
  const postBody = useStoreState((state)=>state.postBody);

  const savePost=useStoreActions((actions)=>actions.savePost);
  const setPostTitle = useStoreActions((actions)=>actions.setPostTitle);
  const setPostBody = useStoreActions((actions)=>actions.setPostBody);
  const usenav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length
      ? String(Number(posts[posts.length - 1].id) + 1)
      : 1;
    const datetime = format(new Date(), "dd MMMM, yyyy pp");
    const newPost = { id, title: postTitle, datetime: datetime, body: postBody };
    savePost(newPost);
    usenav("/");
  };

  return (
    <main className='NewPost'>
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title:</label>
            <input type="text" id="postTitle" required value={postTitle} onChange={(e)=>{setPostTitle(e.target.value)}} />
            <label htmlFor="postBody">Post:</label>
            <textarea id="postBody" required value={postBody} onChange={(e)=>{setPostBody(e.target.value)}}/>
            <button type='submit'>Submit</button>
       </form>
    </main>
  )
}

export default NewPost