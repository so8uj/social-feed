import { useState } from "react";
import { Link } from "react-router-dom";
import txt_img from "@assets/images/txt_img.png";
import comment_img from "@assets/images/comment_img.png";
import { useFeedContext } from "../../context/FeedContext";
import FeedCommentForm from "./FeedCommentForm";

export default function FeedCommentBox({ feedId, comment, depth = 0 }) {
  const { toggleCommentLike } = useFeedContext();

  const [showReplayComment, setShowReplayComment] = useState(false);

  return (
    <div className="_comment_main">
      <div className="_comment_image">
        <Link to="#" className="_comment_image_link">
          <img src={txt_img} alt="" className="_comment_img1" />
        </Link>
      </div>
      <div className="_comment_area">
        <div className="_comment_details" style={{ maxWidth: "100%" }}>
          <div className="_comment_details_top">
            <div className="_comment_name">
              <Link to="#">
                <h4 className="_comment_name_title">
                  {comment.user?.first_name} {comment.user?.last_name}
                </h4>
              </Link>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{comment.body} </span>
            </p>
          </div>
          <div className="_total_reactions">
            <div className="_total_react">
              <span className="_reaction_like">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-thumbs-up"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </span>
              <span className="_reaction_heart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-heart"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </span>
            </div>
            <span className="_total">{comment?.likes_count}</span>
          </div>
          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li onClick={() => toggleCommentLike(comment.id)}>
                  <span>{comment.user_liked ? "Unlike" : "Like"}</span>
                </li>

                {depth < 1 && (
                  <>
                    <li
                      onClick={() => setShowReplayComment(!showReplayComment)}
                    >
                      <span>Reply.</span>
                    </li>
                    <li>
                      <span>Share</span>
                    </li>
                  </>
                )}

                <li>
                  <span className="_time_link">
                    . {comment.created_at_human}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div style={{ marginLeft: `${depth * 20}px` }}>
            {comment.replies.map((reply) => (
              <FeedCommentBox
                key={reply.id}
                feedId={feedId}
                comment={reply}
                depth={depth + 1}
              />
            ))}
          </div>
        )}

        {showReplayComment && (
          <FeedCommentForm feedId={feedId} parentId={comment.id} />
        )}

        <br />
      </div>
    </div>
  );
}
