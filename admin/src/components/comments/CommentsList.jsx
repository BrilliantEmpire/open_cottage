import React, { useState } from "react";
import { Button } from "antd";
import CommentsCard from "./CommentsCard";

function CommentsList({ comments }) {
  const [visibleComments, setVisibleComments] = useState(3);
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setVisibleComments(comments.length);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleComments(3);
    setShowAll(false);
  };

  return comments && comments?.length > 0 ? (
    <div className="mt-6">
      {comments?.slice(0, visibleComments).map((comment) => (
        <CommentsCard key={comment.id} comment={comment} />
      ))}
      {!showAll && comments.length > 3 && (
        <Button type="link" onClick={handleShowMore} className="view-more-btn">
          View more comments
        </Button>
      )}
      {showAll && (
        <Button type="link" onClick={handleShowLess} className="view-more-btn">
          Show less comments
        </Button>
      )}
    </div>
  ) : (
    <div className="mt-6 text-gray-500">No comments found</div>
  );
}

export default CommentsList;
