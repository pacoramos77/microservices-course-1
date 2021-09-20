import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{getContent(comment)}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

function getContent({ content, status }) {
  switch (status) {
    case 'approved': return content;
    case 'rejected': return 'This comment has been rejected';
    case 'pending':
    default:
      return 'This comment is awaiting moderation';
  
  }
}

export default CommentList;
