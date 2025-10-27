import { useParams, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
  const deletePost=useStoreActions((actions)=>actions.deletePost);
  const {id}=useParams();
  const getPostById = useStoreState((state)=>state.getPostById);
  const post = getPostById(id);
  const usenav = useNavigate();

  const handleDelete = (id) => {
    deletePost(id);
    usenav("/");
  };
  
  return (
    <main className="PostPage">
        <article className='post'>
          {post&&<>
              <h1>{post.title}</h1>
              <p className='postDate'>{post.datetime}</p>
              <p className='postBodu'>{post.body}</p>
              <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
              <button className='deleteButton' onClick={()=>{handleDelete(post.id)}}>Delete Post</button>
          </>}
          {!post&&<>
              <h1 style={{color:"red"}}>Error! :</h1>
              <p>Post not found</p>
              <p><Link to="/">Back to HomePage</Link></p>
          </>}
        </article>
    </main>
  )
}

export default PostPage