const displayComment = (comment) => {
  return (
    <div className="comments__container" key={comment.comment_id}>
      <p>Comment ID: {comment.comment_id}</p>
      <p>Author: {comment.author}</p>
      <p>Comment: {comment.body}</p>
      <p>Created at: {comment.created_at}</p>
      <p>Votes: {comment.votes}</p>
    </div>
  );
};

export default displayComment;
