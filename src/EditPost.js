import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useStoreActions,useStoreState } from "easy-peasy";

const EditPost = () => {
  const editBody = useStoreState((state)=>state.editBody);
  const setEditBody = useStoreActions((actions)=>actions.setEditBody);
  const editTitle = useStoreState((state)=>state.editTitle);
  const setEditTitle = useStoreActions((actions)=>actions.setEditTitle);
  const { id } = useParams();
  const getPostById = useStoreState((state)=>state.getPostById);
  const editPost = useStoreActions((actions)=>actions.editPost);
  const post = getPostById(id)
  const usenav= useNavigate();

  useEffect(() => {
    if (post) {
      setEditBody(post.body);
      setEditTitle(post.title);
    }
  }, [post, setEditBody, setEditTitle]);


  const handleEdit = (id) => {
    const datetime = format(new Date(), "dd MMMM, yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime: datetime,
      body: editBody,
    };
    editPost(updatedPost);
    usenav("/");
  };

  return (
    <main className="NewPost">
      <h2>Edit Post</h2>
      {editTitle && (
        <>
          <form
            className="newPostForm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              required
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => {
                setEditBody(e.target.value);
              }}
            />
            <button
              type="submit"
              onClick={() => {
                handleEdit(post.id);
              }}
            >
              Submit
            </button>
          </form>
        </>
      )}
    </main>
  );
};

export default EditPost;
