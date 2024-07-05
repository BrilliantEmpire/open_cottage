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

  return (
    <div className="mt-6">
      {comments?.slice(0, visibleComments)?.map((comment) => (
        <CommentsCard key={comment?._id} comment={comment} />
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
  );
}

export default CommentsList;
